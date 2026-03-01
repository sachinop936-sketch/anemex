import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface DBProduct {
  id: string;
  name: string;
  short_description: string;
  description: string;
  price: number;
  original_price: number;
  discount_percent: number;
  category: string;
  tag: string | null;
  stock: number;
  stock_tag: string | null;
  rating: number;
  review_count: number;
  features: string[];
  seller: string;
  free_delivery: boolean;
  is_visible: boolean;
  images: string[];
  image: string;
}

export const useProducts = () => {
  const [products, setProducts] = useState<DBProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, product_images(image_url, sort_order)')
        .eq('is_visible', true)
        .order('sort_order', { ascending: true });

      if (!error && data) {
        const mapped = data.map((p: any) => {
          const imgs = (p.product_images || [])
            .sort((a: any, b: any) => a.sort_order - b.sort_order)
            .map((i: any) => i.image_url);
          return {
            id: p.id,
            name: p.name,
            short_description: p.short_description || '',
            description: p.description || '',
            price: Number(p.price),
            original_price: Number(p.original_price),
            discount_percent: Number(p.discount_percent),
            category: p.category || '',
            tag: p.tag,
            stock: p.stock,
            stock_tag: p.stock_tag,
            rating: Number(p.rating),
            review_count: p.review_count,
            features: p.features || [],
            seller: p.seller || '',
            free_delivery: p.free_delivery,
            is_visible: p.is_visible,
            images: imgs.length > 0 ? imgs : ['/placeholder.svg'],
            image: imgs[0] || '/placeholder.svg',
          } as DBProduct;
        });
        setProducts(mapped);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  return { products, loading };
};
