import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { ArrowLeft, Upload, X, GripVertical } from 'lucide-react';

interface Props {
  productId: string | null;
  onClose: () => void;
}

const AdminProductForm = ({ productId, onClose }: Props) => {
  const isEdit = !!productId;
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    name: '', short_description: '', description: '', price: '', original_price: '',
    category: 'Electronics', stock: '100', tag: '', seller: '', features: '',
    free_delivery: true, is_visible: true, stock_tag: '',
  });
  const [images, setImages] = useState<{ id?: string; url: string; sort_order: number }[]>([]);

  useEffect(() => {
    if (!productId) return;
    const load = async () => {
      const { data: p } = await supabase.from('products').select('*').eq('id', productId).single();
      if (!p) return;
      setForm({
        name: p.name || '', short_description: p.short_description || '', description: p.description || '',
        price: String(p.price), original_price: String(p.original_price),
        category: p.category || 'Electronics', stock: String(p.stock), tag: p.tag || '',
        seller: p.seller || '', features: (p.features || []).join(', '),
        free_delivery: p.free_delivery ?? true, is_visible: p.is_visible ?? true, stock_tag: p.stock_tag || '',
      });
      const { data: imgs } = await supabase.from('product_images').select('*').eq('product_id', productId).order('sort_order');
      if (imgs) setImages(imgs.map((i: any) => ({ id: i.id, url: i.image_url, sort_order: i.sort_order })));
    };
    load();
  }, [productId]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setUploading(true);
    const newImages = [...images];
    for (const file of Array.from(files)) {
      const ext = file.name.split('.').pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from('product-images').upload(path, file);
      if (error) { toast.error('Upload failed: ' + error.message); continue; }
      const { data: urlData } = supabase.storage.from('product-images').getPublicUrl(path);
      newImages.push({ url: urlData.publicUrl, sort_order: newImages.length });
    }
    setImages(newImages);
    setUploading(false);
    e.target.value = '';
  };

  const removeImage = (idx: number) => setImages(images.filter((_, i) => i !== idx));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price) { toast.error('Name and price required'); return; }
    if (images.length === 0) { toast.error('Add at least one image'); return; }

    setLoading(true);
    const productData = {
      name: form.name, short_description: form.short_description, description: form.description,
      price: Number(form.price), original_price: Number(form.original_price) || Number(form.price),
      category: form.category, stock: Number(form.stock), tag: form.tag || null,
      seller: form.seller, features: form.features.split(',').map((f) => f.trim()).filter(Boolean),
      free_delivery: form.free_delivery, is_visible: form.is_visible, stock_tag: form.stock_tag || null,
    };

    let pid = productId;
    if (isEdit) {
      await supabase.from('products').update(productData).eq('id', productId);
    } else {
      const { data } = await supabase.from('products').insert(productData).select('id').single();
      pid = data?.id;
    }

    if (!pid) { toast.error('Failed to save product'); setLoading(false); return; }

    // Sync images
    await supabase.from('product_images').delete().eq('product_id', pid);
    const imgInserts = images.map((img, idx) => ({
      product_id: pid!, image_url: img.url, sort_order: idx,
    }));
    if (imgInserts.length > 0) await supabase.from('product_images').insert(imgInserts);

    toast.success(isEdit ? 'Product updated' : 'Product added');
    setLoading(false);
    onClose();
  };

  return (
    <div>
      <button onClick={onClose} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4" /> Back to Products
      </button>
      <h1 className="text-2xl font-bold text-foreground mb-6">{isEdit ? 'Edit Product' : 'Add Product'}</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <div>
          <Label>Product Title *</Label>
          <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Product name" />
        </div>
        <div>
          <Label>Caption / Tagline</Label>
          <Input value={form.short_description} onChange={(e) => setForm({ ...form, short_description: e.target.value })} placeholder="Short tagline" />
        </div>
        <div>
          <Label>Description</Label>
          <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Selling Price (₹) *</Label>
            <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          </div>
          <div>
            <Label>Original Price (₹)</Label>
            <Input type="number" value={form.original_price} onChange={(e) => setForm({ ...form, original_price: e.target.value })} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Category</Label>
            <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          </div>
          <div>
            <Label>Stock</Label>
            <Input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Tag</Label>
            <select value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="">None</option>
              <option value="trending">Trending</option>
              <option value="bestseller">Bestseller</option>
              <option value="new">New</option>
              <option value="limited">Limited</option>
            </select>
          </div>
          <div>
            <Label>Seller</Label>
            <Input value={form.seller} onChange={(e) => setForm({ ...form, seller: e.target.value })} />
          </div>
        </div>
        <div>
          <Label>Features (comma separated)</Label>
          <Input value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} placeholder="Feature 1, Feature 2" />
        </div>
        <div>
          <Label>Stock Tag (optional)</Label>
          <Input value={form.stock_tag} onChange={(e) => setForm({ ...form, stock_tag: e.target.value })} placeholder="e.g. Few items left" />
        </div>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.free_delivery} onChange={(e) => setForm({ ...form, free_delivery: e.target.checked })} className="rounded" />
            Free Delivery
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.is_visible} onChange={(e) => setForm({ ...form, is_visible: e.target.checked })} className="rounded" />
            Visible on site
          </label>
        </div>

        {/* Image Upload */}
        <div>
          <Label>Product Images (first = thumbnail)</Label>
          <div className="mt-2 flex flex-wrap gap-3">
            {images.map((img, idx) => (
              <div key={idx} className="relative h-20 w-20 rounded-lg border border-border overflow-hidden group">
                <img src={img.url} alt="" className="h-full w-full object-cover" />
                <button type="button" onClick={() => removeImage(idx)} className="absolute top-0.5 right-0.5 bg-destructive text-white rounded-full h-5 w-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  <X className="h-3 w-3" />
                </button>
                {idx === 0 && <span className="absolute bottom-0 left-0 right-0 bg-primary text-primary-foreground text-[8px] text-center py-0.5">Thumb</span>}
              </div>
            ))}
            <label className="h-20 w-20 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
              <Upload className="h-5 w-5 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground">{uploading ? 'Uploading...' : 'Add'}</span>
              <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" disabled={uploading} />
            </label>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={loading}>{loading ? 'Saving...' : isEdit ? 'Update Product' : 'Add Product'}</Button>
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default AdminProductForm;
