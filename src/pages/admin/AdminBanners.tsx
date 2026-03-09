import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Upload, Trash2, Eye, EyeOff } from 'lucide-react';

interface Banner {
  id: string;
  image_url: string;
  title: string;
  is_active: boolean;
  sort_order: number;
}

const AdminBanners = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchBanners = async () => {
    const { data } = await supabase.from('banners').select('*').order('sort_order');
    if (data) setBanners(data as Banner[]);
    setLoading(false);
  };

  useEffect(() => { fetchBanners(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const path = `banner-${Date.now()}.${file.name.split('.').pop()}`;
    const { error } = await supabase.storage.from('banners').upload(path, file);
    if (error) { toast.error('Upload failed'); setUploading(false); return; }
    const { data: urlData } = supabase.storage.from('banners').getPublicUrl(path);
    await supabase.from('banners').insert({ image_url: urlData.publicUrl, title: '', sort_order: banners.length });
    toast.success('Banner added');
    setUploading(false);
    e.target.value = '';
    fetchBanners();
  };

  const toggleActive = async (id: string, active: boolean) => {
    await supabase.from('banners').update({ is_active: !active }).eq('id', id);
    fetchBanners();
  };

  const deleteBanner = async (id: string) => {
    if (!confirm('Delete this banner?')) return;
    await supabase.from('banners').delete().eq('id', id);
    toast.success('Banner deleted');
    fetchBanners();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Banner Manager</h1>
        <label>
          <Button size="sm" className="gap-1" disabled={uploading} asChild>
            <span><Upload className="h-4 w-4" /> {uploading ? 'Uploading...' : 'Upload Banner'}</span>
          </Button>
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </label>
      </div>

      {loading ? <p className="text-muted-foreground">Loading...</p> : banners.length === 0 ? (
        <p className="text-muted-foreground">No banners yet. Upload one to get started.</p>
      ) : (
        <div className="space-y-4">
          {banners.map((b) => (
            <div key={b.id} className="bg-card border border-border rounded-xl overflow-hidden">
              <img src={b.image_url} alt="" className="w-full h-auto" />
              <div className="p-3 flex items-center justify-between">
                <span className={`text-xs font-medium ${b.is_active ? 'text-green-600' : 'text-muted-foreground'}`}>
                  {b.is_active ? 'Active' : 'Hidden'}
                </span>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => toggleActive(b.id, b.is_active)}>
                    {b.is_active ? <Eye className="h-4 w-4 text-green-600" /> : <EyeOff className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteBanner(b.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBanners;
