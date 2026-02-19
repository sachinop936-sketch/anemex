import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Package, ShoppingCart, Store } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ orders: 0, products: 0, storeOpen: true });

  useEffect(() => {
    const fetchStats = async () => {
      const [ordersRes, productsRes, settingsRes] = await Promise.all([
        supabase.from('orders').select('id', { count: 'exact', head: true }),
        supabase.from('products').select('id', { count: 'exact', head: true }),
        supabase.from('store_settings').select('is_store_open').limit(1).single(),
      ]);
      setStats({
        orders: ordersRes.count ?? 0,
        products: productsRes.count ?? 0,
        storeOpen: settingsRes.data?.is_store_open ?? true,
      });
    };
    fetchStats();
  }, []);

  const cards = [
    { label: 'Total Orders', value: stats.orders, icon: ShoppingCart, color: 'text-blue-600 bg-blue-100' },
    { label: 'Total Products', value: stats.products, icon: Package, color: 'text-green-600 bg-green-100' },
    { label: 'Store Status', value: stats.storeOpen ? 'Open' : 'Closed', icon: Store, color: stats.storeOpen ? 'text-emerald-600 bg-emerald-100' : 'text-red-600 bg-red-100' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${card.color}`}>
                <card.icon className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">{card.label}</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
