export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  originalPrice: number;
  discountPrice: number;
  discountPercent: number;
  image: string;
  images: string[];
  category: string;
  tag?: 'trending' | 'bestseller' | 'limited';
  rating: number;
  reviewCount: number;
  features: string[];
}

const productImages = [
  'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1617606002806-94e279c22567?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1598030343246-eec71cb44231?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&h=400&fit=crop',
];

const productNames = [
  'Floral Print Kurti Set',
  'Cotton Palazzo Pants',
  'Embroidered Silk Dupatta',
  'Designer Anarkali Dress',
  'Printed Maxi Dress',
  'Casual Linen Top',
  'Ethnic Fusion Jacket',
  'Denim Wide Leg Jeans',
  'Boho Embroidered Bag',
  'Leather Crossbody Purse',
  'Classic White Sneakers',
  'Running Sport Shoes',
  'Casual Canvas Shoes',
  'Trendy Chunky Sneakers',
  'Slip-on Loafers',
  'Premium Wireless Earbuds',
  'Smart Fitness Band',
  'Minimalist Analog Watch',
  'Statement Gold Necklace',
  'Pearl Drop Earrings',
  'Silk Hair Scrunchies Set',
  'Bluetooth Headphones',
  'Phone Ring Holder',
  'Smart Watch Pro',
  'Luxury Perfume Set',
  'Makeup Brush Kit',
  'Beauty Blender Set',
  'Premium Lipstick Collection',
  'Skincare Essentials Kit',
  'Designer Tote Bag',
];

const categories = [
  'Ethnic Wear',
  'Western Wear',
  'Accessories',
  'Footwear',
  'Electronics',
  'Beauty',
  'Bags',
];

const tags: (undefined | 'trending' | 'bestseller' | 'limited')[] = [
  undefined,
  'trending',
  'bestseller',
  'limited',
  undefined,
  'trending',
  undefined,
  'bestseller',
  undefined,
  'limited',
];

const features = [
  ['Premium quality fabric', 'Comfortable fit', 'Machine washable', 'Available in multiple sizes'],
  ['Soft cotton blend', 'Breathable material', 'Perfect for daily wear', 'Easy to maintain'],
  ['Elegant design', 'Versatile styling', 'Durable construction', 'Great value for money'],
  ['Trendy patterns', 'Lightweight material', 'All-season wear', 'Stylish look'],
  ['High-quality finish', 'Long-lasting durability', 'Modern design', 'Customer favorite'],
];

export const products: Product[] = Array.from({ length: 30 }, (_, i) => {
  const originalPrice = Math.floor(Math.random() * 2000) + 500;
  const discountPercent = Math.floor(Math.random() * 50) + 20;
  const discountPrice = Math.floor(originalPrice * (1 - discountPercent / 100));

  return {
    id: `product-${i + 1}`,
    name: productNames[i],
    description: `Experience the perfect blend of style and comfort with our ${productNames[i]}. Crafted with premium materials and attention to detail, this piece is designed to elevate your everyday look. Whether you're heading to work, a casual outing, or a special occasion, this versatile item will be your go-to choice.`,
    shortDescription: `Premium quality ${productNames[i].toLowerCase()} with elegant design and comfortable fit.`,
    originalPrice,
    discountPrice,
    discountPercent,
    image: productImages[i],
    images: [
      productImages[i],
      productImages[(i + 1) % 30],
      productImages[(i + 2) % 30],
      productImages[(i + 3) % 30],
    ],
    category: categories[i % categories.length],
    tag: tags[i % tags.length],
    rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)),
    reviewCount: Math.floor(Math.random() * 500) + 50,
    features: features[i % features.length],
  };
});
