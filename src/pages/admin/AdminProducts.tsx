import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Eye, EyeOff, Search, Download, Sparkles, IndianRupee, Loader2 } from 'lucide-react';
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

  // Bulk state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkPrice, setBulkPrice] = useState('');
  const [showPriceInput, setShowPriceInput] = useState(false);
  const [bulkLoading, setBulkLoading] = useState<'delete' | 'price' | 'ai' | null>(null);

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

  // Select helpers
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

  const selectedCount = selectedIds.size;

  // Bulk Delete
  const handleBulkDelete = async () => {
    if (!confirm(`Delete ${selectedCount} products?`)) return;
    setBulkLoading('delete');
    for (const id of selectedIds) {
      await supabase.from('products').delete().eq('id', id);
    }
    toast.success(`${selectedCount} products deleted`);
    setSelectedIds(new Set());
    setBulkLoading(null);
    fetchProducts();
  };

  // Bulk Set Fixed Price
  const handleBulkSetPrice = async () => {
    const price = parseFloat(bulkPrice);
    if (isNaN(price) || price < 0) { toast.error('Enter a valid price'); return; }
    setBulkLoading('price');
    for (const id of selectedIds) {
      await supabase.from('products').update({ price }).eq('id', id);
    }
    toast.success(`Price set to ₹${price} for ${selectedCount} products`);
    setSelectedIds(new Set());
    setBulkPrice('');
    setShowPriceInput(false);
    setBulkLoading(null);
    fetchProducts();
  };

  // Bulk AI Optimize
  const handleBulkAiOptimize = async () => {
    setBulkLoading('ai');
    let success = 0;
    let failed = 0;
    for (const id of selectedIds) {
      const product = products.find(p => p.id === id);
      if (!product) continue;
      try {
        const { data, error } = await supabase.functions.invoke('ai-optimize-product', {
          body: { product: { name: product.name, price: product.price, category: product.category } },
        });
        if (error || !data?.success) { failed++; continue; }
        const o = data.optimized;
        await supabase.from('products').update({
          name: o.optimized_title || product.name,
          short_description: o.short_description || undefined,
          description: o.description || undefined,
          features: o.features || undefined,
          tag: o.tag || undefined,
        }).eq('id', id);
        success++;
      } catch {
        failed++;
      }
    }
    toast.success(`AI optimized ${success} products${failed ? `, ${failed} failed` : ''}`);
    setSelectedIds(new Set());
    setBulkLoading(null);
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
        <div className="flex flex-wrap items-center gap-2 mb-4 p-3 bg-muted/50 rounded-xl border border-border">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={selectedIds.size === filtered.length && filtered.length > 0}
              onCheckedChange={toggleSelectAll}
            />
            <span className="text-sm font-medium text-foreground">
              {selectedCount > 0 ? `${selectedCount} selected` : 'Select All'}
            </span>
          </div>

          {selectedCount > 0 && (
            <>
              <div className="h-5 w-px bg-border mx-1" />

              {/* Bulk Delete */}
              <Button
                size="sm"
                variant="destructive"
                className="gap-1"
                disabled={bulkLoading !== null}
                onClick={handleBulkDelete}
              >
                {bulkLoading === 'delete' ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                Delete
              </Button>

              {/* Bulk Set Price */}
              {showPriceInput ? (
                <div className="flex items-center gap-1.5">
                  <div className="relative">
                    <IndianRupee className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    <Input
                      type="number"
                      placeholder="249"
                      value={bulkPrice}
                      onChange={(e) => setBulkPrice(e.target.value)}
                      className="h-8 w-24 pl-7 text-sm"
                    />
                  </div>
                  <Button
                    size="sm"
                    variant="default"
                    disabled={bulkLoading !== null || !bulkPrice}
                    onClick={handleBulkSetPrice}
                  >
                    {bulkLoading === 'price' ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : 'Set'}
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => { setShowPriceInput(false); setBulkPrice(''); }}>✕</Button>
                </div>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1"
                  disabled={bulkLoading !== null}
                  onClick={() => setShowPriceInput(true)}
                >
                  <IndianRupee className="h-3.5 w-3.5" />
                  Set Price
                </Button>
              )}

              {/* Bulk AI Optimize */}
              <Button
                size="sm"
                variant="outline"
                className="gap-1"
                disabled={bulkLoading !== null}
                onClick={handleBulkAiOptimize}
              >
                {bulkLoading === 'ai' ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
                AI Optimize
              </Button>
            </>
          )}
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
            return (
              <div key={p.id} className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
                <Checkbox
                  checked={selectedIds.has(p.id)}
                  onCheckedChange={() => toggleSelect(p.id)}
                />
                <div className="h-16 w-16 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                  {thumb && <img src={thumb.image_url} alt="" className="h-full w-full object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground truncate">{p.name}</h3>
                  <p className="text-xs text-muted-foreground">{p.category} • Stock: {p.stock}</p>
                  <p className="text-sm font-bold text-foreground">₹{p.price} <span className="text-xs text-muted-foreground line-through">₹{p.original_price}</span></p>
                </div>
                <div className="flex items-center gap-1">
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
