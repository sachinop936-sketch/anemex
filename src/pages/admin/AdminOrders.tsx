import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Search, Download, Filter } from 'lucide-react';

interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  customer_city: string;
  customer_state: string;
  customer_pincode: string;
  total_amount: number;
  status: string;
  payment_method: string;
  items: any;
  created_at: string;
}

const STATUS_OPTIONS = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

const statusColor: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    let query = supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (filterStatus !== 'all') {
      query = query.eq('status', filterStatus);
    }

    const { data, error } = await query;
    if (!error && data) setOrders(data as Order[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();

    const channel = supabase
      .channel('admin-orders')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => fetchOrders())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [filterStatus]);

  const updateStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', orderId);

    if (error) {
      toast.error('Failed to update status');
    } else {
      toast.success(`Order marked as ${newStatus}`);
      fetchOrders();
    }
  };

  const exportCSV = () => {
    const headers = ['Order ID', 'Customer', 'Phone', 'City', 'State', 'Pincode', 'Amount', 'Status', 'Payment', 'Date'];
    const rows = filtered.map(o => [
      o.id.slice(0, 8),
      o.customer_name || 'Guest',
      o.customer_phone || '-',
      o.customer_city || '-',
      o.customer_state || '-',
      o.customer_pincode || '-',
      o.total_amount || 0,
      o.status || 'pending',
      o.payment_method || 'online',
      new Date(o.created_at).toLocaleDateString('en-IN'),
    ]);

    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Orders exported!');
  };

  const filtered = orders.filter(o =>
    (o.customer_name || '').toLowerCase().includes(search.toLowerCase()) ||
    (o.customer_phone || '').includes(search) ||
    o.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-foreground">Orders</h1>
        <Button onClick={exportCSV} size="sm" variant="outline" className="gap-1">
          <Download className="h-4 w-4" /> Export CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name, phone, or ID..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="all">All Status</option>
            {STATUS_OPTIONS.map(s => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders List */}
      {loading ? (
        <p className="text-muted-foreground">Loading orders...</p>
      ) : filtered.length === 0 ? (
        <p className="text-muted-foreground">No orders found.</p>
      ) : (
        <div className="space-y-3">
          {filtered.map((order) => (
            <div key={order.id} className="bg-card border border-border rounded-xl overflow-hidden">
              {/* Order Header */}
              <button
                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                className="w-full p-4 flex items-center gap-4 text-left hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono text-muted-foreground">#{order.id.slice(0, 8)}</span>
                    <Badge className={`text-[10px] ${statusColor[order.status || 'pending'] || statusColor.pending}`}>
                      {order.status || 'pending'}
                    </Badge>
                  </div>
                  <p className="text-sm font-semibold text-foreground mt-1">{order.customer_name || 'Guest Customer'}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-base font-bold text-foreground">₹{(order.total_amount || 0).toLocaleString()}</p>
                  <p className="text-[10px] text-muted-foreground uppercase">{order.payment_method || 'online'}</p>
                </div>
              </button>

              {/* Expanded Details */}
              {expandedOrder === order.id && (
                <div className="border-t border-border p-4 bg-muted/30 space-y-4 animate-fade-in">
                  {/* Customer Details */}
                  <div>
                    <h4 className="text-xs font-bold text-muted-foreground uppercase mb-2">Customer Details</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="text-muted-foreground">Name:</span> <span className="text-foreground font-medium">{order.customer_name || '-'}</span></div>
                      <div><span className="text-muted-foreground">Phone:</span> <span className="text-foreground font-medium">{order.customer_phone || '-'}</span></div>
                      <div className="col-span-2"><span className="text-muted-foreground">Address:</span> <span className="text-foreground font-medium">{order.customer_address || '-'}</span></div>
                      <div><span className="text-muted-foreground">City:</span> <span className="text-foreground font-medium">{order.customer_city || '-'}</span></div>
                      <div><span className="text-muted-foreground">State:</span> <span className="text-foreground font-medium">{order.customer_state || '-'}</span></div>
                      <div><span className="text-muted-foreground">Pincode:</span> <span className="text-foreground font-medium">{order.customer_pincode || '-'}</span></div>
                    </div>
                  </div>

                  {/* Items */}
                  {Array.isArray(order.items) && order.items.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-muted-foreground uppercase mb-2">Items</h4>
                      <div className="space-y-1">
                        {order.items.map((item: any, idx: number) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span className="text-foreground">{item.name || 'Product'} × {item.quantity || 1}</span>
                            <span className="text-foreground font-medium">₹{((item.price || 0) * (item.quantity || 1)).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Status Update */}
                  <div>
                    <h4 className="text-xs font-bold text-muted-foreground uppercase mb-2">Update Status</h4>
                    <div className="flex flex-wrap gap-2">
                      {STATUS_OPTIONS.map((s) => (
                        <Button
                          key={s}
                          size="sm"
                          variant={order.status === s ? 'default' : 'outline'}
                          onClick={() => updateStatus(order.id, s)}
                          className="text-xs capitalize"
                        >
                          {s}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
