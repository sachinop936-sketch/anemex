import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const ExportData = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const [pRes, iRes] = await Promise.all([
        supabase.from('products').select('*').order('created_at', { ascending: false }),
        supabase.from('product_images').select('*').order('product_id').order('sort_order'),
      ]);
      if (pRes.data) setProducts(pRes.data);
      if (iRes.data) setImages(iRes.data);
      setLoading(false);
    };
    fetch();
  }, []);

  const download = (data: any[], filename: string) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen text-foreground">Loading data...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-8 bg-background">
      <h1 className="text-2xl font-bold text-foreground">Database Export</h1>
      <p className="text-muted-foreground">Click to download each table as a JSON file.</p>
      <div className="flex gap-4">
        <Button onClick={() => download(products, 'products.json')} className="gap-2">
          <Download className="h-4 w-4" /> Products ({products.length} rows)
        </Button>
        <Button onClick={() => download(images, 'product_images.json')} className="gap-2">
          <Download className="h-4 w-4" /> Product Images ({images.length} rows)
        </Button>
      </div>
    </div>
  );
};

export default ExportData;
