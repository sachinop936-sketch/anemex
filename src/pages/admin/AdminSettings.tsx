import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Upload } from 'lucide-react';

const AdminSettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settingsId, setSettingsId] = useState('');
  const [form, setForm] = useState({
    store_name: '', logo_url: '', support_number: '', info_text: '', footer_text: '',
    is_store_open: true, delivery_charges: '0', free_delivery_above: '100', tax_percent: '0',
  });

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('store_settings').select('*').limit(1).single();
      if (data) {
        setSettingsId(data.id);
        setForm({
          store_name: data.store_name || '', logo_url: data.logo_url || '',
          support_number: data.support_number || '', info_text: data.info_text || '',
          footer_text: data.footer_text || '', is_store_open: data.is_store_open ?? true,
          delivery_charges: String((data as any).delivery_charges ?? 0),
          free_delivery_above: String((data as any).free_delivery_above ?? 100),
          tax_percent: String((data as any).tax_percent ?? 0),
        });
      }
      setLoading(false);
    };
    load();
  }, []);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const path = `logo-${Date.now()}.${file.name.split('.').pop()}`;
    const { error } = await supabase.storage.from('store-assets').upload(path, file);
    if (error) { toast.error('Upload failed'); return; }
    const { data } = supabase.storage.from('store-assets').getPublicUrl(path);
    setForm({ ...form, logo_url: data.publicUrl });
    toast.success('Logo uploaded');
  };

  const save = async () => {
    setSaving(true);
    const updateData = {
      store_name: form.store_name,
      logo_url: form.logo_url,
      support_number: form.support_number,
      info_text: form.info_text,
      footer_text: form.footer_text,
      is_store_open: form.is_store_open,
      delivery_charges: Number(form.delivery_charges) || 0,
      free_delivery_above: Number(form.free_delivery_above) || 100,
      tax_percent: Number(form.tax_percent) || 0,
    };

    const { error } = await supabase.from('store_settings').update(updateData as any).eq('id', settingsId);
    if (error) {
      toast.error('Failed to save: ' + error.message);
    } else {
      toast.success('Settings saved — changes are live!');
    }
    setSaving(false);
  };

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Store Settings</h1>
      <div className="space-y-6 max-w-lg">
        {/* General */}
        <div className="bg-card border border-border rounded-xl p-4 space-y-4">
          <h2 className="text-sm font-bold text-foreground">General</h2>
          <div>
            <Label>Store Name</Label>
            <Input value={form.store_name} onChange={(e) => setForm({ ...form, store_name: e.target.value })} />
          </div>
          <div>
            <Label>Logo</Label>
            <div className="flex items-center gap-3 mt-1">
              {form.logo_url && <img src={form.logo_url} alt="Logo" className="h-12 rounded" />}
              <label>
                <Button size="sm" variant="outline" className="gap-1" asChild>
                  <span><Upload className="h-4 w-4" /> Upload</span>
                </Button>
                <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
              </label>
            </div>
          </div>
          <div>
            <Label>Support Number</Label>
            <Input value={form.support_number} onChange={(e) => setForm({ ...form, support_number: e.target.value })} />
          </div>
          <div className="flex items-center gap-3">
            <Switch checked={form.is_store_open} onCheckedChange={(v) => setForm({ ...form, is_store_open: v })} />
            <Label>Store is {form.is_store_open ? 'Open' : 'Closed'}</Label>
          </div>
        </div>

        {/* Delivery & Tax */}
        <div className="bg-card border border-border rounded-xl p-4 space-y-4">
          <h2 className="text-sm font-bold text-foreground">Delivery & Tax</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Delivery Charges (₹)</Label>
              <Input type="number" value={form.delivery_charges} onChange={(e) => setForm({ ...form, delivery_charges: e.target.value })} />
            </div>
            <div>
              <Label>Free Delivery Above (₹)</Label>
              <Input type="number" value={form.free_delivery_above} onChange={(e) => setForm({ ...form, free_delivery_above: e.target.value })} />
            </div>
          </div>
          <div>
            <Label>Tax Percentage (%)</Label>
            <Input type="number" value={form.tax_percent} onChange={(e) => setForm({ ...form, tax_percent: e.target.value })} />
            <p className="text-[11px] text-muted-foreground mt-1">Applied on top of product price during checkout</p>
          </div>
        </div>

        {/* Text Content */}
        <div className="bg-card border border-border rounded-xl p-4 space-y-4">
          <h2 className="text-sm font-bold text-foreground">Content</h2>
          <div>
            <Label>Info Text</Label>
            <Textarea value={form.info_text} onChange={(e) => setForm({ ...form, info_text: e.target.value })} rows={2} />
          </div>
          <div>
            <Label>Footer Text</Label>
            <Textarea value={form.footer_text} onChange={(e) => setForm({ ...form, footer_text: e.target.value })} rows={2} />
          </div>
        </div>

        <Button onClick={save} disabled={saving} className="w-full">
          {saving ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;
