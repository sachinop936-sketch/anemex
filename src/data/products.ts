import earbud11 from '@/assets/earbud-1.1.jpg';
import earbud12 from '@/assets/earbud-1.2.jpg';
import earbud13 from '@/assets/earbud-1.3.jpg';
import earbud14 from '@/assets/earbud-1.4.jpg';
import earbud21 from '@/assets/earbud-2.1.jpg';
import earbud22 from '@/assets/earbud-2.2.jpg';
import earbud23 from '@/assets/earbud-2.3.jpg';
import earbud31 from '@/assets/earbud-3.1.jpg';
import earbud32 from '@/assets/earbud-3.2.jpg';
import earbud33 from '@/assets/earbud-3.3.jpg';
import earbud34 from '@/assets/earbud-3.4.jpg';
import earbud41 from '@/assets/earbud-4.1.jpg';
import earbud42 from '@/assets/earbud-4.2.jpg';
import earbud43 from '@/assets/earbud-4.3.jpg';
import earbud44 from '@/assets/earbud-4.4.jpg';
import earbud51 from '@/assets/earbud-5.1.jpg';
import earbud52 from '@/assets/earbud-5.2.jpg';
import earbud53 from '@/assets/earbud-5.3.jpg';
import earbud54 from '@/assets/earbud-5.4.jpg';
import earbud61 from '@/assets/earbud-6.1.jpg';
import earbud62 from '@/assets/earbud-6.2.jpg';
import earbud63 from '@/assets/earbud-6.3.jpg';
import earbud64 from '@/assets/earbud-6.4.jpg';
import earbud71 from '@/assets/earbud-7.1.jpg';
import earbud72 from '@/assets/earbud-7.2.jpg';
import earbud73 from '@/assets/earbud-7.3.jpg';
import earbud74 from '@/assets/earbud-7.4.jpg';
import earbud81 from '@/assets/earbud-8.1.jpg';
import earbud82 from '@/assets/earbud-8.2.jpg';
import earbud83 from '@/assets/earbud-8.3.jpg';
import earbud84 from '@/assets/earbud-8.4.jpg';
import earbud91 from '@/assets/earbud-9.1.jpg';
import earbud92 from '@/assets/earbud-9.2.jpg';
import earbud93 from '@/assets/earbud-9.3.jpg';
import earbud94 from '@/assets/earbud-9.4.jpg';
import earbud101 from '@/assets/earbud-10.1.jpg';
import earbud102 from '@/assets/earbud-10.2.jpg';
import earbud103 from '@/assets/earbud-10.3.jpg';
import earbud104 from '@/assets/earbud-10.4.jpg';
import earbud111 from '@/assets/earbud-11.1.jpg';
import earbud112 from '@/assets/earbud-11.2.jpg';
import earbud113 from '@/assets/earbud-11.3.jpg';
import earbud114 from '@/assets/earbud-11.4.jpg';
import earbud121 from '@/assets/earbud-12.1.jpg';
import earbud122 from '@/assets/earbud-12.2.jpg';
import earbud123 from '@/assets/earbud-12.3.jpg';
import earbud124 from '@/assets/earbud-12.4.jpg';
import earbud131 from '@/assets/earbud-13.1.jpg';
import earbud132 from '@/assets/earbud-13.2.jpg';
import earbud133 from '@/assets/earbud-13.3.jpg';
import earbud134 from '@/assets/earbud-13.4.jpg';
import earbud141 from '@/assets/earbud-14.1.jpg';
import earbud142 from '@/assets/earbud-14.2.jpg';
import earbud143 from '@/assets/earbud-14.3.jpg';

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
  tag?: "trending" | "bestseller" | "limited" | "new";
  rating: number;
  reviewCount: number;
  features: string[];
  seller: string;
  freeDelivery: boolean;
}

export const products: Product[] = [
  // Product 1: Women's Floral Dress
  {
    id: "product-1",
    name: "Women's Floral Print Maxi Dress",
    description:
      "Elegant floral print maxi dress perfect for summer outings. Made from breathable cotton blend fabric with a flattering A-line silhouette. Features adjustable straps and a comfortable elastic waist.",
    shortDescription: "Beautiful floral maxi dress for summer",
    originalPrice: 1999,
    discountPrice: 1,
    discountPercent: 75,
    image: earbud11,
    images: [earbud11, earbud12, earbud13, earbud14],
    category: "Women's Fashion",
    tag: "bestseller",
    rating: 4.5,
    reviewCount: 2341,
    features: ["100% Cotton Blend", "Machine Washable", "Adjustable Straps", "Comfortable Fit"],
    seller: "Fashion Hub",
    freeDelivery: true,
  },
  // Product 2: Men's Casual Shirt
  {
    id: "product-2",
    name: "Men's Premium Cotton Casual Shirt",
    description:
      "Classic casual shirt crafted from premium cotton. Perfect for office wear or casual outings. Features a regular fit with button-down collar and chest pocket.",
    shortDescription: "Premium cotton casual shirt for men",
    originalPrice: 1499,
    discountPrice: 399,
    discountPercent: 73,
    image: earbud21,
    images: [earbud21, earbud22, earbud23],
    category: "Men's Fashion",
    tag: "trending",
    rating: 4.3,
    reviewCount: 1876,
    features: ["Pure Cotton", "Regular Fit", "Button-Down Collar", "Chest Pocket"],
    seller: "Style Studio",
    freeDelivery: true,
  },
  // Product 3: Women's Kurti
  {
    id: "product-3",
    name: "Embroidered Anarkali Kurti",
    description:
      "Beautiful embroidered Anarkali kurti with intricate threadwork. Made from soft rayon fabric with a flattering flared silhouette. Perfect for festivals and special occasions.",
    shortDescription: "Elegant embroidered Anarkali kurti",
    originalPrice: 2499,
    discountPrice: 599,
    discountPercent: 76,
    image: earbud31,
    images: [earbud31, earbud32, earbud33, earbud34],
    category: "Women's Fashion",
    tag: "new",
    rating: 4.6,
    reviewCount: 3102,
    features: ["Soft Rayon Fabric", "Hand Embroidery", "Flared Design", "Comfortable Wear"],
    seller: "Ethnic Elegance",
    freeDelivery: true,
  },
  // Product 4: Men's Jeans
  {
    id: "product-4",
    name: "Men's Slim Fit Denim Jeans",
    description:
      "Classic slim fit denim jeans with comfortable stretch. Features 5-pocket styling and zip fly closure. Perfect for everyday casual wear.",
    shortDescription: "Comfortable slim fit denim jeans",
    originalPrice: 1899,
    discountPrice: 549,
    discountPercent: 71,
    image: earbud41,
    images: [earbud41, earbud42, earbud43, earbud44],
    category: "Men's Fashion",
    tag: "bestseller",
    rating: 4.4,
    reviewCount: 4521,
    features: ["Stretch Denim", "Slim Fit", "5-Pocket Design", "Zip Fly"],
    seller: "Denim World",
    freeDelivery: true,
  },
  // Product 5: Women's Handbag
  {
    id: "product-5",
    name: "Women's Leather Tote Handbag",
    description:
      "Elegant leather tote bag with spacious interior. Features multiple compartments, zip closure, and detachable shoulder strap. Perfect for work or daily use.",
    shortDescription: "Stylish leather tote for everyday use",
    originalPrice: 2999,
    discountPrice: 799,
    discountPercent: 73,
    image: earbud51,
    images: [earbud51, earbud52, earbud53, earbud54],
    category: "Bags & Accessories",
    tag: "trending",
    rating: 4.7,
    reviewCount: 1543,
    features: ["Genuine Leather", "Multiple Pockets", "Zip Closure", "Detachable Strap"],
    seller: "Bag Boutique",
    freeDelivery: true,
  },
  // Product 6
  {
    id: "product-6",
    name: "Wireless Bluetooth Earbuds Pro",
    description: "High-quality wireless Bluetooth earbuds with deep bass and crystal clear sound. Features active noise cancellation and long battery life.",
    shortDescription: "Premium wireless earbuds with ANC",
    originalPrice: 3499,
    discountPrice: 899,
    discountPercent: 74,
    image: earbud61,
    images: [earbud61, earbud62, earbud63, earbud64],
    category: "Electronics",
    tag: "trending",
    rating: 4.4,
    reviewCount: 2156,
    features: ["Active Noise Cancellation", "Bluetooth 5.3", "30hr Battery", "IPX5 Waterproof"],
    seller: "Audio Zone",
    freeDelivery: true,
  },
  // Product 7
  {
    id: "product-7",
    name: "Sports Wireless Earbuds",
    description: "Designed for active lifestyles with secure ear hooks and sweat-resistant design. Powerful bass drivers deliver immersive sound during workouts.",
    shortDescription: "Sweat-proof earbuds for sports",
    originalPrice: 2999,
    discountPrice: 749,
    discountPercent: 75,
    image: earbud71,
    images: [earbud71, earbud72, earbud73, earbud74],
    category: "Electronics",
    tag: "bestseller",
    rating: 4.3,
    reviewCount: 1834,
    features: ["Secure Ear Hooks", "Sweat Resistant", "24hr Battery", "Quick Charge"],
    seller: "FitSound",
    freeDelivery: true,
  },
  // Product 8
  {
    id: "product-8",
    name: "Ultra Bass Wireless Earbuds",
    description: "Experience thundering bass with these premium wireless earbuds. Equipped with 13mm dynamic drivers for unmatched audio quality.",
    shortDescription: "Deep bass wireless earbuds",
    originalPrice: 2499,
    discountPrice: 649,
    discountPercent: 74,
    image: earbud81,
    images: [earbud81, earbud82, earbud83, earbud84],
    category: "Electronics",
    tag: "new",
    rating: 4.5,
    reviewCount: 1267,
    features: ["13mm Drivers", "Deep Bass", "Touch Controls", "Voice Assistant"],
    seller: "BassKing",
    freeDelivery: true,
  },
  // Product 9
  {
    id: "product-9",
    name: "Compact TWS Earbuds",
    description: "Ultra-compact truly wireless earbuds with ergonomic design. Lightweight and comfortable for all-day wear with premium sound quality.",
    shortDescription: "Compact lightweight TWS earbuds",
    originalPrice: 1999,
    discountPrice: 499,
    discountPercent: 75,
    image: earbud91,
    images: [earbud91, earbud92, earbud93, earbud94],
    category: "Electronics",
    tag: "limited",
    rating: 4.2,
    reviewCount: 987,
    features: ["Ultra Compact", "Lightweight", "20hr Battery", "Dual Mic"],
    seller: "TechBuds",
    freeDelivery: true,
  },
  // Product 10
  {
    id: "product-10",
    name: "Premium ANC Earbuds",
    description: "Top-tier noise cancellation earbuds with transparency mode. Hi-Res audio certified for audiophile-grade listening experience.",
    shortDescription: "Hi-Res ANC earbuds",
    originalPrice: 4999,
    discountPrice: 1299,
    discountPercent: 74,
    image: earbud101,
    images: [earbud101, earbud102, earbud103, earbud104],
    category: "Electronics",
    tag: "trending",
    rating: 4.7,
    reviewCount: 3421,
    features: ["Hi-Res Audio", "Hybrid ANC", "Transparency Mode", "Wireless Charging"],
    seller: "SoundElite",
    freeDelivery: true,
  },
  // Product 11
  {
    id: "product-11",
    name: "Gaming Wireless Earbuds",
    description: "Low-latency wireless earbuds designed for mobile gaming. Features game mode with 40ms latency and RGB lighting on the charging case.",
    shortDescription: "Low-latency gaming earbuds",
    originalPrice: 2799,
    discountPrice: 699,
    discountPercent: 75,
    image: earbud111,
    images: [earbud111, earbud112, earbud113, earbud114],
    category: "Electronics",
    tag: "new",
    rating: 4.3,
    reviewCount: 1543,
    features: ["40ms Low Latency", "Game Mode", "RGB Case", "Dual Connect"],
    seller: "GameAudio",
    freeDelivery: true,
  },
  // Product 12
  {
    id: "product-12",
    name: "Open Ear Wireless Earbuds",
    description: "Innovative open-ear design for ambient awareness while enjoying music. Perfect for outdoor activities and commuting.",
    shortDescription: "Open-ear design earbuds",
    originalPrice: 3299,
    discountPrice: 849,
    discountPercent: 74,
    image: earbud121,
    images: [earbud121, earbud122, earbud123, earbud124],
    category: "Electronics",
    tag: "bestseller",
    rating: 4.4,
    reviewCount: 2087,
    features: ["Open Ear Design", "Ambient Aware", "16hr Battery", "Multipoint Connect"],
    seller: "OpenSound",
    freeDelivery: true,
  },
  // Product 13
  {
    id: "product-13",
    name: "Studio Monitor Earbuds",
    description: "Professional-grade studio monitor earbuds with balanced armature drivers. Flat frequency response for accurate audio reproduction.",
    shortDescription: "Studio-grade monitor earbuds",
    originalPrice: 5499,
    discountPrice: 1499,
    discountPercent: 73,
    image: earbud131,
    images: [earbud131, earbud132, earbud133, earbud134],
    category: "Electronics",
    tag: "limited",
    rating: 4.8,
    reviewCount: 876,
    features: ["Balanced Armature", "Flat Response", "Detachable Cable", "Studio Quality"],
    seller: "ProAudio",
    freeDelivery: true,
  },
  // Product 14
  {
    id: "product-14",
    name: "Budget Wireless Earbuds",
    description: "Affordable wireless earbuds with surprisingly good sound quality. Great value for money with essential features and reliable performance.",
    shortDescription: "Value-for-money wireless earbuds",
    originalPrice: 1299,
    discountPrice: 349,
    discountPercent: 73,
    image: earbud141,
    images: [earbud141, earbud142, earbud143],
    category: "Electronics",
    tag: "bestseller",
    rating: 4.1,
    reviewCount: 5432,
    features: ["Bluetooth 5.1", "15hr Battery", "Type-C Charging", "Lightweight"],
    seller: "ValueTech",
    freeDelivery: true,
  },
];
