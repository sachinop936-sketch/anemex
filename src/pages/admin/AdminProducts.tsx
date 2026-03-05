import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Eye, EyeOff, Search, Download } from 'lucide-react';
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
