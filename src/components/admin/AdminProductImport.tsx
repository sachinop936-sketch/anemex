import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { ArrowLeft, Link2, Sparkles, Loader2, CheckCircle2, XCircle, Plus, Trash2 } from 'lucide-react';

interface ImportedProduct {
  name: string;
  short_description: string;
  description: string;
  price: number;
  original_price: number;
  discount_percent: number;
  category: string;
  rating: number;
  review_count: number;
  features: string[];
  seller: string;
  images: string[];
  free_delivery: boolean;
  is_visible: boolean;
  stock: number;
  tag: string | null;
  stock_tag: string | null;
  source_url?: string;
}

interface BulkItem {
  url: string;
  status: 'pending' | 'loading' | 'done' | 'error';
  product?: ImportedProduct;
  error?: string;
}

interface Props {
  onClose: () => void;
  onProductSaved: () => void;
}

const AdminProductImport = ({ onClose, onProductSaved }: Props) => {
  const [mode, setMode] = useState<'single' | 'bulk'>('single');
  const [url, setUrl] = useState('');
  const [bulkUrls, setBulkUrls] = useState<BulkItem[]>([{ url: '', status: 'pending' }]);
  const [scraping, setScraping] = useState(false);
  const [optimizing, setOptimizing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [product, setProduct] = useState<ImportedProduct | null>(null);
  const [bulkProgress, setBulkProgress] = useState(0);

  const scrapeProduct = async (productUrl: string): Promise<ImportedProduct> => {
    const { data, error } = await supabase.functions.invoke('scrape-product', {
      body: { url: productUrl },
    });
    if (error) throw new Error(error.message || 'Scraping failed');
    if (!data?.success) throw new Error(data?.error || 'Failed to extract product data');
    return data.product;
  };

  const handleSingleImport = async () => {
    if (!url.trim()) { toast.error('Please enter a product URL'); return; }
    setScraping(true);
    try {
      const imported = await scrapeProduct(url);
      setProduct(imported);
      toast.success('Product data imported successfully!');
    } catch (err: any) {
      toast.error(err.message || 'Failed to import product');
    } finally {
      setScraping(false);
    }
  };

  const handleBulkImport = async () => {
    const validUrls = bulkUrls.filter(b => b.url.trim());
    if (validUrls.length === 0) { toast.error('Add at least one URL'); return; }
    setScraping(true);
    setBulkProgress(0);

    const updated = [...bulkUrls];
    let completed = 0;

    for (let i = 0; i < updated.length; i++) {
      if (!updated[i].url.trim()) continue;
      updated[i].status = 'loading';
      setBulkUrls([...updated]);

      try {
        const imported = await scrapeProduct(updated[i].url);
        updated[i].status = 'done';
        updated[i].product = imported;
      } catch (err: any) {
        updated[i].status = 'error';
        updated[i].error = err.message;
      }

      completed++;
      setBulkProgress(Math.round((completed / validUrls.length) * 100));
      setBulkUrls([...updated]);
    }

    setScraping(false);
    const successCount = updated.filter(b => b.status === 'done').length;
    toast.success(`Imported ${successCount}/${validUrls.length} products`);
  };

  const handleAiOptimize = async () => {
    if (!product) return;
    setOptimizing(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-optimize-product', {
        body: { product },
      });
      if (error) throw new Error(error.message);
      if (!data?.success) throw new Error(data?.error || 'AI optimization failed');

      const o = data.optimized;
      setProduct({
        ...product,
        name: o.optimized_title || product.name,
        short_description: o.short_description || product.short_description,
        description: o.description || product.description,
        features: o.features || product.features,
        tag: o.tag || product.tag,
      });
      toast.success('Product optimized with AI!');
    } catch (err: any) {
      toast.error(err.message || 'AI optimization failed');
    } finally {
      setOptimizing(false);
    }
  };

  const saveProduct = async (p: ImportedProduct) => {
    const productData = {
      name: p.name,
      short_description: p.short_description,
      description: p.description,
      price: p.price,
      original_price: p.original_price || p.price,
      category: p.category,
      rating: p.rating,
      review_count: p.review_count,
      features: p.features,
      seller: p.seller,
      free_delivery: p.free_delivery,
      is_visible: p.is_visible,
      stock: p.stock,
      tag: p.tag,
      stock_tag: p.stock_tag,
    };

    const { data: inserted, error } = await supabase
      .from('products')
      .insert(productData)
      .select('id')
      .single();

    if (error) throw new Error(error.message);
    if (!inserted) throw new Error('Failed to insert product');

    // Save images
    if (p.images.length > 0) {
      const imgInserts = p.images.map((url, idx) => ({
        product_id: inserted.id,
        image_url: url,
        sort_order: idx,
      }));
      await supabase.from('product_images').insert(imgInserts);
    }

    return inserted.id;
  };

  const handleSaveSingle = async () => {
    if (!product) return;
    setSaving(true);
    try {
      await saveProduct(product);
      toast.success('Product saved to store!');
      onProductSaved();
      onClose();
    } catch (err: any) {
      toast.error(err.message || 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveBulk = async () => {
    const products = bulkUrls.filter(b => b.status === 'done' && b.product).map(b => b.product!);
    if (products.length === 0) { toast.error('No products to save'); return; }
    setSaving(true);
    let saved = 0;
    for (const p of products) {
      try {
        await saveProduct(p);
        saved++;
      } catch (err) {
        console.error('Failed to save:', p.name, err);
      }
    }
    toast.success(`Saved ${saved}/${products.length} products to store`);
    setSaving(false);
    onProductSaved();
    onClose();
  };

  const addBulkUrl = () => {
    if (bulkUrls.length >= 10) { toast.error('Maximum 10 URLs at once'); return; }
    setBulkUrls([...bulkUrls, { url: '', status: 'pending' }]);
  };

  const removeBulkUrl = (idx: number) => {
    setBulkUrls(bulkUrls.filter((_, i) => i !== idx));
  };

  const updateBulkUrl = (idx: number, value: string) => {
    const updated = [...bulkUrls];
    updated[idx].url = value;
    setBulkUrls(updated);
  };

  return (
    <div>
      <button onClick={onClose} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4" /> Back to Products
      </button>
      <h1 className="text-2xl font-bold text-foreground mb-2">Import Product</h1>
      <p className="text-sm text-muted-foreground mb-6">Paste any ecommerce product URL to auto-import all details.</p>

      {/* Mode Tabs */}
      <div className="flex gap-2 mb-6">
        <Button variant={mode === 'single' ? 'default' : 'outline'} size="sm" onClick={() => setMode('single')}>
          <Link2 className="h-4 w-4 mr-1" /> Single Import
        </Button>
        <Button variant={mode === 'bulk' ? 'default' : 'outline'} size="sm" onClick={() => setMode('bulk')}>
          <Plus className="h-4 w-4 mr-1" /> Bulk Import (up to 10)
        </Button>
      </div>

      {mode === 'single' && !product && (
        <div className="space-y-4 max-w-xl">
          <div>
            <Label>Product URL</Label>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.amazon.in/dp/... or https://www.flipkart.com/..."
              disabled={scraping}
            />
            <p className="text-xs text-muted-foreground mt-1">Supports Amazon, Flipkart, Meesho, and other ecommerce sites</p>
          </div>
          <Button onClick={handleSingleImport} disabled={scraping} className="gap-2">
            {scraping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Link2 className="h-4 w-4" />}
            {scraping ? 'Importing...' : 'Import Product'}
          </Button>
        </div>
      )}

      {mode === 'single' && product && (
        <div className="space-y-4 max-w-2xl">
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-start gap-4">
              {product.images[0] && (
                <img src={product.images[0]} alt="" className="h-24 w-24 rounded-lg object-cover flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground">{product.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{product.short_description}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-lg font-bold text-foreground">₹{product.price}</span>
                  {product.original_price > product.price && (
                    <span className="text-sm text-muted-foreground line-through">₹{product.original_price}</span>
                  )}
                  {product.discount_percent > 0 && (
                    <span className="text-xs font-medium text-green-600">{product.discount_percent}% off</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {product.category} • {product.images.length} images • Rating: {product.rating}⭐ ({product.review_count} reviews)
                </p>
              </div>
            </div>
          </div>

          {/* Editable fields */}
          <div>
            <Label>Product Title</Label>
            <Input value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
          </div>
          <div>
            <Label>Short Description</Label>
            <Input value={product.short_description} onChange={(e) => setProduct({ ...product, short_description: e.target.value })} />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} rows={4} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Selling Price (₹)</Label>
              <Input type="number" value={product.price} onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })} />
            </div>
            <div>
              <Label>Original Price (₹)</Label>
              <Input type="number" value={product.original_price} onChange={(e) => setProduct({ ...product, original_price: Number(e.target.value) })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Category</Label>
              <Input value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })} />
            </div>
            <div>
              <Label>Stock</Label>
              <Input type="number" value={product.stock} onChange={(e) => setProduct({ ...product, stock: Number(e.target.value) })} />
            </div>
          </div>
          <div>
            <Label>Features (comma separated)</Label>
            <Input
              value={product.features.join(', ')}
              onChange={(e) => setProduct({ ...product, features: e.target.value.split(',').map(f => f.trim()).filter(Boolean) })}
            />
          </div>
          <div>
            <Label>Seller</Label>
            <Input value={product.seller} onChange={(e) => setProduct({ ...product, seller: e.target.value })} />
          </div>

          {/* Images Preview */}
          <div>
            <Label>Images ({product.images.length})</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {product.images.slice(0, 8).map((img, i) => (
                <img key={i} src={img} alt="" className="h-16 w-16 rounded-lg object-cover border border-border" />
              ))}
              {product.images.length > 8 && (
                <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground">
                  +{product.images.length - 8}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-border">
            <Button onClick={handleAiOptimize} variant="outline" disabled={optimizing} className="gap-2">
              {optimizing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              {optimizing ? 'Optimizing...' : 'AI Optimize'}
            </Button>
            <Button onClick={handleSaveSingle} disabled={saving} className="gap-2">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
              {saving ? 'Saving...' : 'Save to Store'}
            </Button>
            <Button variant="outline" onClick={() => setProduct(null)}>Reset</Button>
          </div>
        </div>
      )}

      {mode === 'bulk' && (
        <div className="space-y-4 max-w-xl">
          {bulkUrls.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="flex-1">
                <Input
                  value={item.url}
                  onChange={(e) => updateBulkUrl(idx, e.target.value)}
                  placeholder={`Product URL ${idx + 1}`}
                  disabled={scraping}
                />
              </div>
              {item.status === 'done' && <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />}
              {item.status === 'error' && <span title={item.error}><XCircle className="h-5 w-5 text-destructive flex-shrink-0" /></span>}
              {item.status === 'loading' && <Loader2 className="h-5 w-5 animate-spin text-primary flex-shrink-0" />}
              {bulkUrls.length > 1 && (
                <Button variant="ghost" size="icon" onClick={() => removeBulkUrl(idx)} disabled={scraping}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              )}
            </div>
          ))}

          {bulkUrls.length < 10 && (
            <Button variant="outline" size="sm" onClick={addBulkUrl} disabled={scraping} className="gap-1">
              <Plus className="h-4 w-4" /> Add URL
            </Button>
          )}

          {scraping && <Progress value={bulkProgress} className="h-2" />}

          <div className="flex gap-3 pt-2">
            <Button onClick={handleBulkImport} disabled={scraping} className="gap-2">
              {scraping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Link2 className="h-4 w-4" />}
              {scraping ? `Importing... ${bulkProgress}%` : 'Import All'}
            </Button>
            {bulkUrls.some(b => b.status === 'done') && (
              <Button onClick={handleSaveBulk} disabled={saving} variant="default" className="gap-2">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                Save All to Store
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductImport;
