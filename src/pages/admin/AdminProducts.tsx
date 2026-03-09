import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Eye, EyeOff, Search, Download, Sparkles, IndianRupee, Loader2, CheckSquare, Square } from 'lucide-react';
import AdminProductForm from '@/components/admin/AdminProductForm';
import AdminProductImport from '@/components/admin/AdminProductImport';

interface DBProduct {
  id: string;
  name: string;
  price: number;
  original_price: number;
  category: string;
  stock: number;
  is_visible: boolean;
  created_at: string;
  product_images: { id: string; image_url: string; sort_order: number }[];
}

const AdminProducts = () => {
  const [products, setProducts] = useState<DBProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkOptimizing, setBulkOptimizing] = useState(false);
  const [bulkDeleting, setBulkDeleting] = useState(false);
  const [showPriceChange, setShowPriceChange] = useState(false);
  const [fixedPrice, setFixedPrice] = useState('');
  const [priceChanging, setPriceChanging] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('id, name, price, original_price, category, stock, is_visible, created_at, product_images(id, image_url, sort_order)')
      .order('created_at', { ascending: false });
    if (!error && data) setProducts(data as unknown as DBProduct[]);
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const toggleVisibility = async (id: string, visible: boolean) => {
    await supabase.from('products').update({ is_visible: !visible }).eq('id', id);
    toast.success(visible ? 'Product hidden' : 'Product visible');
    fetchProducts();
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    await supabase.from('products').delete().eq('id', id);
    toast.success('Product deleted');
    fetchProducts();
  };

  const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map(p => p.id)));
    }
  };

  const bulkDelete = async () => {
    if (selectedIds.size === 0) return;
    if (!confirm(`Delete ${selectedIds.size} product(s)?`)) return;
    setBulkDeleting(true);
    for (const id of selectedIds) {
      await supabase.from('product_images').delete().eq('product_id', id);
      await supabase.from('products').delete().eq('id', id);
    }
    toast.success(`${selectedIds.size} product(s) deleted`);
    setSelectedIds(new Set());
    setBulkDeleting(false);
    fetchProducts();
  };

  const bulkAiOptimize = async () => {
    if (selectedIds.size === 0) return;
    setBulkOptimizing(true);
    let success = 0;
    let failed = 0;
    for (const id of selectedIds) {
      const product = products.find(p => p.id === id);
      if (!product) continue;
      try {
        // Fetch full product data
        const { data: fullProduct } = await supabase.from('products').select('*').eq('id', id).single();
        if (!fullProduct) { failed++; continue; }

        const { data, error } = await supabase.functions.invoke('ai-optimize-product', {
          body: {
            product: {
              name: fullProduct.name,
              description: fullProduct.description,
              category: fullProduct.category,
              price: fullProduct.price,
              features: fullProduct.features || [],
            },
          },
        });
        if (error || !data?.success) { failed++; continue; }

        const o = data.optimized;
        await supabase.from('products').update({
          name: o.optimized_title || fullProduct.name,
          short_description: o.short_description || fullProduct.short_description,
          description: o.description || fullProduct.description,
          features: o.features || fullProduct.features,
          tag: o.tag || fullProduct.tag,
        }).eq('id', id);
        success++;
      } catch {
        failed++;
      }
    }
    toast.success(`AI optimized ${success} product(s)${failed > 0 ? `, ${failed} failed` : ''}`);
    setSelectedIds(new Set());
    setBulkOptimizing(false);
    fetchProducts();
  };

  const bulkPriceChange = async () => {
    const price = Number(fixedPrice);
    if (!price || price <= 0) { toast.error('Enter a valid price in ₹'); return; }
    if (selectedIds.size === 0) return;
    setPriceChanging(true);

    for (const id of selectedIds) {
      await supabase.from('products').update({ price }).eq('id', id);
    }

    toast.success(`Price set to ₹${price} for ${selectedIds.size} product(s)`);
    setSelectedIds(new Set());
    setShowPriceChange(false);
    setFixedPrice('');
    setPriceChanging(false);
    fetchProducts();
  };

  if (showImport) {
    return (
      <AdminProductImport
        onClose={() => { setShowImport(false); fetchProducts(); }}
        onProductSaved={fetchProducts}
      />
    );
  }

  if (showForm || editingProduct) {
    return (
      <AdminProductForm
        productId={editingProduct}
        onClose={() => { setShowForm(false); setEditingProduct(null); fetchProducts(); }}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Products</h1>
        <div className="flex gap-2">
          <Button onClick={() => setShowImport(true)} size="sm" variant="outline" className="gap-1">
            <Download className="h-4 w-4" /> Import
          </Button>
          <Button onClick={() => setShowForm(true)} size="sm" className="gap-1">
            <Plus className="h-4 w-4" /> Add Product
          </Button>
        </div>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      {/* Bulk Actions Bar */}
      {filtered.length > 0 && (
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <Button variant="outline" size="sm" onClick={toggleSelectAll} className="gap-1">
            {selectedIds.size === filtered.length ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4" />}
            {selectedIds.size === filtered.length ? 'Deselect All' : 'Select All'}
          </Button>
          {selectedIds.size > 0 && (
            <>
              <span className="text-xs text-muted-foreground">{selectedIds.size} selected</span>
              <Button
                variant="outline"
                size="sm"
                className="gap-1"
                disabled={bulkOptimizing}
                onClick={bulkAiOptimize}
              >
                {bulkOptimizing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                AI Optimize
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={() => setShowPriceChange(!showPriceChange)}
              >
                <IndianRupee className="h-4 w-4" /> Price Change
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="gap-1"
                disabled={bulkDeleting}
                onClick={bulkDelete}
              >
                {bulkDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                Delete ({selectedIds.size})
              </Button>
            </>
          )}
        </div>
      )}

      {/* Price Change Panel */}
      {showPriceChange && selectedIds.size > 0 && (
        <div className="bg-card border border-border rounded-xl p-4 mb-4 flex items-end gap-3 flex-wrap max-w-lg">
          <div>
            <label className="text-xs font-medium text-foreground">Set Price (₹)</label>
            <Input
              type="number"
              placeholder="e.g. 249"
              value={fixedPrice}
              onChange={(e) => setFixedPrice(e.target.value)}
              className="mt-1 w-32"
            />
          </div>
          <Button size="sm" disabled={priceChanging} onClick={bulkPriceChange}>
            {priceChanging ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null}
            Apply
          </Button>
          <Button size="sm" variant="ghost" onClick={() => { setShowPriceChange(false); setFixedPrice(''); }}>
            Cancel
          </Button>
        </div>
      )}

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="text-muted-foreground">No products found.</p>
      ) : (
        <div className="space-y-3">
          {filtered.map((p) => {
            const thumb = p.product_images?.sort((a, b) => a.sort_order - b.sort_order)[0];
            const isSelected = selectedIds.has(p.id);
            return (
              <div
                key={p.id}
                className={`bg-card border rounded-xl p-4 flex items-center gap-4 cursor-pointer transition-colors ${isSelected ? 'border-primary bg-primary/5' : 'border-border'}`}
                onClick={() => toggleSelect(p.id)}
              >
                <div className="flex-shrink-0">
                  {isSelected
                    ? <CheckSquare className="h-5 w-5 text-primary" />
                    : <Square className="h-5 w-5 text-muted-foreground" />
                  }
                </div>
                <div className="h-16 w-16 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                  {thumb && <img src={thumb.image_url} alt="" className="h-full w-full object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground truncate">{p.name}</h3>
                  <p className="text-xs text-muted-foreground">{p.category} • Stock: {p.stock}</p>
                  <p className="text-sm font-bold text-foreground">₹{p.price} <span className="text-xs text-muted-foreground line-through">₹{p.original_price}</span></p>
                </div>
                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                  <Button variant="ghost" size="icon" onClick={() => toggleVisibility(p.id, p.is_visible)} title={p.is_visible ? 'Hide' : 'Show'}>
                    {p.is_visible ? <Eye className="h-4 w-4 text-green-600" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setEditingProduct(p.id)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteProduct(p.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
