import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Package, ShoppingCart, Store, IndianRupee, AlertTriangle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface OrderRow {
  id: string;
  customer_name: string;
  total_amount: number;
  status: string;
  created_at: string;
  items: any;
}

interface LowStockProduct {
  id: string;
  name: string;
  stock: number;
  price: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState({ orders: 0, products: 0, revenue: 0, storeOpen: true });
  const [recentOrders, setRecentOrders] = useState<OrderRow[]>([]);
  const [lowStock, setLowStock] = useState<LowStockProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      const [ordersRes, productsRes, settingsRes, revenueRes, recentRes, lowStockRes] = await Promise.all([
        supabase.from('orders').select('id', { count: 'exact', head: true }),
        supabase.from('products').select('id', { count: 'exact', head: true }),
        supabase.from('store_settings').select('is_store_open').limit(1).single(),
        supabase.from('orders').select('total_amount').eq('status', 'delivered'),
        supabase.from('orders').select('id, customer_name, total_amount, status, created_at, items').order('created_at', { ascending: false }).limit(10),
        supabase.from('products').select('id, name, stock, price').lt('stock', 10).order('stock', { ascending: true }).limit(10),
      ]);

      const revenue = (revenueRes.data || []).reduce((sum: number, o: any) => sum + (o.total_amount || 0), 0);

      setStats({
        orders: ordersRes.count ?? 0,
        products: productsRes.count ?? 0,
        revenue,
        storeOpen: settingsRes.data?.is_store_open ?? true,
      });
      setRecentOrders((recentRes.data || []) as OrderRow[]);
      setLowStock((lowStockRes.data || []) as LowStockProduct[]);
      setLoading(false);
    };
    fetchAll();

    // Realtime subscription for orders
    const channel = supabase
      .channel('admin-dashboard')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => fetchAll())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => fetchAll())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const statusColor: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  const cards = [
    { label: 'Total Orders', value: stats.orders, icon: ShoppingCart, color: 'text-blue-600 bg-blue-100' },
    { label: 'Total Products', value: stats.products, icon: Package, color: 'text-green-600 bg-green-100' },
    { label: 'Total Revenue', value: `₹${stats.revenue.toLocaleString()}`, icon: IndianRupee, color: 'text-emerald-600 bg-emerald-100' },
    { label: 'Store Status', value: stats.storeOpen ? 'Open' : 'Closed', icon: Store, color: stats.storeOpen ? 'text-emerald-600 bg-emerald-100' : 'text-red-600 bg-red-100' },
  ];

  if (loading) return <p className="text-muted-foreground">Loading dashboard...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="bg-card border border-border rounded-xl p-4 lg:p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${card.color}`}>
                <card.icon className="h-5 w-5" />
              </div>
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-foreground">{card.value}</p>
            <span className="text-xs text-muted-foreground">{card.label}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-card border border-border rounded-xl p-4 lg:p-5">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-base font-bold text-foreground">Recent Orders</h2>
          </div>
          {recentOrders.length === 0 ? (
            <p className="text-sm text-muted-foreground">No orders yet.</p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{order.customer_name || 'Guest'}</p>
                    <p className="text-xs text-muted-foreground">{new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`text-[10px] ${statusColor[order.status || 'pending'] || statusColor.pending}`}>
                      {order.status || 'pending'}
                    </Badge>
                    <span className="text-sm font-bold text-foreground">₹{(order.total_amount || 0).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-card border border-border rounded-xl p-4 lg:p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <h2 className="text-base font-bold text-foreground">Low Stock Alerts</h2>
          </div>
          {lowStock.length === 0 ? (
            <p className="text-sm text-muted-foreground">All products are well stocked.</p>
          ) : (
            <div className="space-y-3">
              {lowStock.map((product) => (
                <div key={product.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium text-foreground truncate max-w-[200px]">{product.name}</p>
                    <p className="text-xs text-muted-foreground">₹{product.price.toLocaleString()}</p>
                  </div>
                  <Badge variant="destructive" className="text-xs">
                    {product.stock} left
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
