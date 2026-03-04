import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Plus, Trash2, Bell } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  is_active: boolean;
  created_at: string;
}

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', message: '' });

  const fetch = async () => {
    const { data } = await supabase.from('notifications').select('*').order('created_at', { ascending: false });
    if (data) setNotifications(data as Notification[]);
  };

  useEffect(() => { fetch(); }, []);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) { toast.error('Title required'); return; }
    await supabase.from('notifications').insert({ title: form.title, message: form.message });
    toast.success('Notification added');
    setShowForm(false);
    setForm({ title: '', message: '' });
    fetch();
  };

  const del = async (id: string) => {
    await supabase.from('notifications').delete().eq('id', id);
    toast.success('Deleted');
    fetch();
  };

  const toggle = async (id: string, active: boolean) => {
    await supabase.from('notifications').update({ is_active: !active }).eq('id', id);
    fetch();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
        <Button size="sm" className="gap-1" onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4" /> Add
        </Button>
      </div>

      {showForm && (
        <form onSubmit={add} className="bg-card border border-border rounded-xl p-4 mb-6 space-y-3 max-w-md">
          <div><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
          <div><Label>Message</Label><Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={3} /></div>
          <Button type="submit" size="sm">Save</Button>
        </form>
      )}

      <div className="space-y-3">
        {notifications.map((n) => (
          <div key={n.id} className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">{n.title}</p>
              <p className="text-xs text-muted-foreground truncate">{n.message}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => toggle(n.id, n.is_active)} className={n.is_active ? 'text-green-600' : 'text-muted-foreground'}>
              {n.is_active ? 'Active' : 'Off'}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => del(n.id)}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminNotifications;
