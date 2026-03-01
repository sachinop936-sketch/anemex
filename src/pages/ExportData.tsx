import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Download, Loader2, Image } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import JSZip from 'jszip';

const ExportData = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [zipping, setZipping] = useState(false);
  const [zipProgress, setZipProgress] = useState(0);

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

  const downloadImagesZip = async () => {
    setZipping(true);
    setZipProgress(0);
    const zip = new JSZip();
    const total = images.length;
    let completed = 0;
    let failed = 0;

    // Group images by product_id for folder structure
    const grouped: Record<string, any[]> = {};
    for (const img of images) {
      const pid = img.product_id || 'unknown';
      if (!grouped[pid]) grouped[pid] = [];
      grouped[pid].push(img);
    }

    // Download in batches of 5
    const allEntries = images.map((img, i) => ({ img, i }));
    for (let b = 0; b < allEntries.length; b += 5) {
      const batch = allEntries.slice(b, b + 5);
      await Promise.all(batch.map(async ({ img }) => {
        try {
          const res = await fetch(img.image_url);
          if (!res.ok) throw new Error('fetch failed');
          const blob = await res.blob();
          const ext = img.image_url.match(/\.(jpe?g|png|webp|gif)/i)?.[0] || '.jpg';
          const pid = (img.product_id || 'unknown').slice(0, 8);
          const folder = zip.folder(pid)!;
          folder.file(`${img.sort_order ?? 0}${ext}`, blob);
        } catch {
          failed++;
        } finally {
          completed++;
          setZipProgress(Math.round((completed / total) * 100));
        }
      }));
    }

    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'product-images.zip';
    a.click();
    URL.revokeObjectURL(url);
    setZipping(false);
    if (failed > 0) {
      alert(`Done! ${failed} image(s) failed to download (CORS or broken URL).`);
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen text-foreground">Loading data...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-8 bg-background">
      <h1 className="text-2xl font-bold text-foreground">Database Export</h1>
      <p className="text-muted-foreground">Click to download each table as a JSON file.</p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Button onClick={() => download(products, 'products.json')} className="gap-2">
          <Download className="h-4 w-4" /> Products ({products.length} rows)
        </Button>
        <Button onClick={() => download(images, 'product_images.json')} className="gap-2">
          <Download className="h-4 w-4" /> Product Images ({images.length} rows)
        </Button>
      </div>

      <div className="border-t border-border w-full max-w-md pt-6 mt-2 flex flex-col items-center gap-4">
        <h2 className="text-lg font-semibold text-foreground">Image Files Export</h2>
        <p className="text-sm text-muted-foreground text-center">
          Downloads all {images.length} product images and bundles them into a ZIP file, organized by product.
        </p>
        <Button onClick={downloadImagesZip} disabled={zipping || images.length === 0} className="gap-2">
          {zipping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Image className="h-4 w-4" />}
          {zipping ? `Downloading... ${zipProgress}%` : `Download All Images (ZIP)`}
        </Button>
        {zipping && <Progress value={zipProgress} className="w-full max-w-xs" />}
      </div>
    </div>
  );
};

export default ExportData;
