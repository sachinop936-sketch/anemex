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
];
