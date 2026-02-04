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

// Electronics & gadget images matching Flipkart style
const productImages = [
  'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=400&h=400&fit=crop&bg=white', // iPhone
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&bg=white', // Phone
  'https://images.unsplash.com/photo-1580910051074-3eb694886f8b?w=400&h=400&fit=crop&bg=white', // Laptop
  'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop&bg=white', // Watch
  'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400&h=400&fit=crop&bg=white', // iPhone Pro
  'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop&bg=white', // Android
  'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&bg=white', // Headphones
  'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop&bg=white', // MacBook
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&bg=white', // Smart Watch
  'https://images.unsplash.com/photo-1608042314453-ae338d80c427?w=400&h=400&fit=crop&bg=white', // Samsung
  'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop&bg=white', // Sneakers
  'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=400&fit=crop&bg=white', // Jordan
  'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop&bg=white', // Camera
  'https://images.unsplash.com/photo-1544866092-1935c5ef2a8f?w=400&h=400&fit=crop&bg=white', // Camera DSLR
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&bg=white', // Headphones
  'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop&bg=white', // Phone back
  'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop&bg=white', // Samsung Galaxy
  'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=400&fit=crop&bg=white', // Laptop
  'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=400&fit=crop&bg=white', // AirPods
  'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=400&h=400&fit=crop&bg=white', // iPhone 13
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop&bg=white', // MacBook
  'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=400&h=400&fit=crop&bg=white', // iPad
  'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop&bg=white', // Keyboard
  'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop&bg=white', // Mouse
  'https://images.unsplash.com/photo-1601524909162-ae8725290836?w=400&h=400&fit=crop&bg=white', // Samsung watch
  'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop&bg=white', // iPad Pro
  'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=400&fit=crop&bg=white', // Gaming
  'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=400&fit=crop&bg=white', // Monitor
  'https://images.unsplash.com/photo-1596558450268-9c27524ba856?w=400&h=400&fit=crop&bg=white', // Pixel
  'https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?w=400&h=400&fit=crop&bg=white', // OnePlus
];

const productNames = [
  'APPLE iPhone 14 Pro',
  'Apple iPhone 14 Plus',
  'APPLE 2020 Macbook Air',
  'APPLE Watch Ultra GPS',
  'APPLE iPhone 15 Pro Max',
  'SAMSUNG Galaxy S23 Ultra',
  'Google Pixel 7 (Snow)',
  'MOTOROLA Edge 40',
  'Lenovo Legion 5 Pro',
  'Samsung Galaxy S22 Ultra',
  'vivo V27 5G (Magic Blue)',
  'Canon EOS 3000D DSLR',
  'Sony Alpha A7 III',
  'Nikon D850 DSLR Camera',
  'Sony WH-1000XM5',
  'OnePlus 11R 5G (Sonic)',
  'Realme GT Neo 3T',
  'HP Pavilion Gaming Laptop',
  'Apple AirPods Pro 2nd',
  'Apple iPhone 13 (Blue)',
  'MacBook Pro 14 M2 Pro',
  'iPad Pro 12.9 M2 Chip',
  'Logitech MX Keys Mini',
  'Logitech MX Master 3S',
  'Samsung Galaxy Watch 5',
  'iPad Air 5th Gen M1',
  'ASUS ROG Strix Gaming',
  'Dell UltraSharp Monitor',
  'Google Pixel 7 Pro',
  'OnePlus Nord 3 5G',
];

const categories = [
  'Mobiles',
  'Laptops',
  'Watches',
  'Cameras',
  'Audio',
  'Tablets',
  'Gaming',
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
  ['Super Retina XDR display', 'A16 Bionic chip', '48MP camera system', 'All-day battery life'],
  ['M2 chip performance', '18-hour battery', 'Liquid Retina display', 'MagSafe charging'],
  ['Always-On display', 'Advanced health sensors', 'Water resistant 100m', 'GPS + Cellular'],
  ['4K video recording', 'Advanced autofocus', 'Full-frame sensor', 'Pro-grade controls'],
  ['Active Noise Cancelling', 'Hi-Res Audio', '30-hour battery', 'Premium sound quality'],
];

export const products: Product[] = Array.from({ length: 30 }, (_, i) => {
  // Use Flipkart-style pricing (high original, very low discount price)
  const originalPrices = [144900, 159900, 99990, 89000, 179900, 124999, 59999, 34999, 185890, 109999, 46999, 54995, 198990, 256950, 29990, 39999, 31999, 84990, 26900, 79900, 199900, 129900, 12995, 8995, 44999, 69900, 149990, 79990, 84999, 33999];
  const discountPrices = [499, 399, 495, 498, 549, 459, 319, 249, 481, 449, 379, 399, 599, 649, 289, 319, 279, 449, 249, 449, 699, 549, 199, 149, 349, 449, 549, 399, 449, 299];
  
  const originalPrice = originalPrices[i] || Math.floor(Math.random() * 100000) + 30000;
  const discountPrice = discountPrices[i] || Math.floor(Math.random() * 500) + 200;
  const discountPercent = 99; // Flipkart shows 99% off in reference

  return {
    id: `product-${i + 1}`,
    name: productNames[i],
    description: `Experience the ultimate performance with ${productNames[i]}. Packed with cutting-edge technology and premium build quality, this device delivers exceptional value. Whether for work, entertainment, or creativity, this is your perfect companion for every task.`,
    shortDescription: `Premium ${productNames[i]} with latest technology and exceptional performance.`,
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
    rating: Number((Math.random() * 0.5 + 4.3).toFixed(1)),
    reviewCount: Math.floor(Math.random() * 5000) + 500,
    features: features[i % features.length],
  };
});
