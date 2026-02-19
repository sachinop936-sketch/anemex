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
    store_name: '', logo_url: '', support_number: '', info_text: '', footer_text: '', is_store_open: true,
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
    await supabase.from('store_settings').update(form).eq('id', settingsId);
    toast.success('Settings saved');
    setSaving(false);
  };

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Store Settings</h1>
      <div className="space-y-4 max-w-lg">
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
        <div>
          <Label>Info Text</Label>
          <Textarea value={form.info_text} onChange={(e) => setForm({ ...form, info_text: e.target.value })} rows={2} />
        </div>
        <div>
          <Label>Footer Text</Label>
          <Textarea value={form.footer_text} onChange={(e) => setForm({ ...form, footer_text: e.target.value })} rows={2} />
        </div>
        <div className="flex items-center gap-3">
          <Switch checked={form.is_store_open} onCheckedChange={(v) => setForm({ ...form, is_store_open: v })} />
          <Label>Store is {form.is_store_open ? 'Open' : 'Closed'}</Label>
        </div>
        <Button onClick={save} disabled={saving}>{saving ? 'Saving...' : 'Save Settings'}</Button>
      </div>
    </div>
  );
};

export default AdminSettings;
