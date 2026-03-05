import { useEffect, useState } from 'react';
import productsData from '../../public/data/products.json';

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
    const mapped = (productsData as any[]).map((p) => ({
      id: p.id,
      name: p.name,
      short_description: p.short_description || '',
      description: p.description || '',
      price: Number(p.price),
      original_price: Number(p.original_price),
      discount_percent: Number(p.discount_percent),
      category: p.category || '',
      tag: p.tag,
      stock: p.stock || 100,
      stock_tag: p.stock_tag,
      rating: Number(p.rating),
      review_count: p.review_count || 0,
      features: p.features || [],
      seller: p.seller || '',
      free_delivery: p.free_delivery ?? true,
      is_visible: p.is_visible ?? true,
      images: p.images && p.images.length > 0 ? p.images : ['/placeholder.svg'],
      image: p.images?.[0] || '/placeholder.svg',
    } as DBProduct));
    setProducts(mapped);
    setLoading(false);
  }, []);

  return { products, loading };
};
