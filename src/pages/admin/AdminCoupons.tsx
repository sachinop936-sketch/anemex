import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Plus, Trash2, Tag } from 'lucide-react';

interface Coupon {
  id: string;
  code: string;
  discount_type: string;
  discount_value: number;
  min_order: number;
  max_discount: number | null;
  is_active: boolean;
  used_count: number;
}

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ code: '', discount_type: 'percent', discount_value: '', min_order: '0', max_discount: '' });

  const fetch = async () => {
    const { data } = await supabase.from('coupons').select('*').order('created_at', { ascending: false });
    if (data) setCoupons(data as Coupon[]);
  };

  useEffect(() => { fetch(); }, []);

  const addCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code || !form.discount_value) { toast.error('Code and value required'); return; }
    await supabase.from('coupons').insert({
      code: form.code.toUpperCase(), discount_type: form.discount_type,
      discount_value: Number(form.discount_value), min_order: Number(form.min_order),
      max_discount: form.max_discount ? Number(form.max_discount) : null,
    });
    toast.success('Coupon added');
    setShowForm(false);
    setForm({ code: '', discount_type: 'percent', discount_value: '', min_order: '0', max_discount: '' });
    fetch();
  };

  const deleteCoupon = async (id: string) => {
    if (!confirm('Delete?')) return;
    await supabase.from('coupons').delete().eq('id', id);
    toast.success('Deleted');
    fetch();
  };

  const toggleActive = async (id: string, active: boolean) => {
    await supabase.from('coupons').update({ is_active: !active }).eq('id', id);
    fetch();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Coupons</h1>
        <Button size="sm" className="gap-1" onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4" /> Add Coupon
        </Button>
      </div>

      {showForm && (
        <form onSubmit={addCoupon} className="bg-card border border-border rounded-xl p-4 mb-6 space-y-3 max-w-md">
          <div><Label>Code</Label><Input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} placeholder="SAVE10" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Type</Label>
              <select value={form.discount_type} onChange={(e) => setForm({ ...form, discount_type: e.target.value })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="percent">Percentage</option>
                <option value="flat">Flat Amount</option>
              </select>
            </div>
            <div><Label>Value</Label><Input type="number" value={form.discount_value} onChange={(e) => setForm({ ...form, discount_value: e.target.value })} /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Min Order (₹)</Label><Input type="number" value={form.min_order} onChange={(e) => setForm({ ...form, min_order: e.target.value })} /></div>
            <div><Label>Max Discount (₹)</Label><Input type="number" value={form.max_discount} onChange={(e) => setForm({ ...form, max_discount: e.target.value })} placeholder="No limit" /></div>
          </div>
          <Button type="submit" size="sm">Save</Button>
        </form>
      )}

      <div className="space-y-3">
        {coupons.map((c) => (
          <div key={c.id} className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Tag className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-foreground">{c.code}</p>
              <p className="text-xs text-muted-foreground">
                {c.discount_type === 'percent' ? `${c.discount_value}% off` : `₹${c.discount_value} off`}
                {c.min_order > 0 ? ` • Min ₹${c.min_order}` : ''}
                {c.max_discount ? ` • Max ₹${c.max_discount}` : ''}
                {` • Used ${c.used_count}x`}
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => toggleActive(c.id, c.is_active)} className={c.is_active ? 'text-green-600' : 'text-muted-foreground'}>
              {c.is_active ? 'Active' : 'Inactive'}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => deleteCoupon(c.id)}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCoupons;
