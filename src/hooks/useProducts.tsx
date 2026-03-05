import { staticProducts, StaticProduct } from '@/data/staticProducts';

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
  const products: DBProduct[] = staticProducts.map((p) => ({
    id: p.id,
    name: p.name,
    short_description: p.short_description,
    description: p.description,
    price: p.price,
    original_price: p.original_price,
    discount_percent: p.discount_percent,
    category: p.category,
    tag: p.tag,
    stock: p.stock,
    stock_tag: p.stock_tag,
    rating: p.rating,
    review_count: p.review_count,
    features: p.features,
    seller: p.seller,
    free_delivery: p.free_delivery,
    is_visible: true,
    images: p.images,
    image: p.images[0] || '/placeholder.svg',
  }));

  return { products, loading: false };
};
