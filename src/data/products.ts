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
  // Product 1
  {
    id: "product-1",
    name: "SoundPods Pro Max TWS Earbuds",
    description:
      "Unleash studio-quality sound with the SoundPods Pro Max. These premium TWS earbuds feature 12mm titanium-coated drivers for rich, detailed audio across every frequency. With hybrid active noise cancellation, you can block out the world and immerse yourself in your music. The ergonomic design fits securely for hours of comfortable listening, while Bluetooth 5.3 ensures a rock-solid, lag-free connection.",
    shortDescription: "Premium TWS with hybrid ANC & titanium drivers",
    originalPrice: 1999,
    discountPrice: 1,
    discountPercent: 75,
    image: earbud11,
    images: [earbud11, earbud12, earbud13, earbud14],
    category: "Electronics",
    tag: "bestseller",
    rating: 4.5,
    reviewCount: 2341,
    features: ["12mm Titanium Drivers", "Hybrid ANC", "Bluetooth 5.3", "Ergonomic Fit"],
    seller: "SoundPods Official",
    freeDelivery: true,
  },
  // Product 2
  {
    id: "product-2",
    name: "BassX Elite Wireless Earbuds",
    description:
      "Feel every beat with the BassX Elite. Engineered for bass lovers, these wireless earbuds pack oversized 13mm dynamic drivers that deliver deep, punchy bass without sacrificing clarity. The sleek metallic charging case provides 28 hours of total playtime, and the IPX4 splash-proof rating keeps them safe during intense workouts.",
    shortDescription: "Heavy bass earbuds with 28hr battery life",
    originalPrice: 1499,
    discountPrice: 399,
    discountPercent: 73,
    image: earbud21,
    images: [earbud21, earbud22, earbud23],
    category: "Electronics",
    tag: "trending",
    rating: 4.3,
    reviewCount: 1876,
    features: ["13mm Dynamic Drivers", "28hr Total Battery", "IPX4 Splash-proof", "Metallic Case"],
    seller: "BassX Audio",
    freeDelivery: true,
  },
  // Product 3
  {
    id: "product-3",
    name: "AirBuds Lite Comfort Fit Earbuds",
    description:
      "All-day comfort meets impressive sound. The AirBuds Lite are designed with ultra-lightweight silicone tips and a featherweight 4.2g per earbud body so you'll forget you're wearing them. Despite their compact size, they deliver crisp highs and warm mids, making them perfect for podcasts, calls, and casual listening throughout the day.",
    shortDescription: "Ultra-light earbuds for all-day comfort",
    originalPrice: 2499,
    discountPrice: 599,
    discountPercent: 76,
    image: earbud31,
    images: [earbud31, earbud32, earbud33, earbud34],
    category: "Electronics",
    tag: "new",
    rating: 4.6,
    reviewCount: 3102,
    features: ["4.2g Ultra Light", "Soft Silicone Tips", "24hr Battery", "Clear Call Mic"],
    seller: "AirBuds Store",
    freeDelivery: true,
  },
  // Product 4
  {
    id: "product-4",
    name: "NoiseCut ANC True Wireless Earbuds",
    description:
      "Silence the noise, amplify your world. NoiseCut earbuds feature advanced feedforward + feedback ANC that eliminates up to 35dB of ambient noise. Switch to Transparency mode to stay aware of your surroundings. With aptX adaptive codec support, enjoy lossless-quality streaming for an audiophile-grade experience on the go.",
    shortDescription: "35dB ANC with aptX adaptive codec",
    originalPrice: 1899,
    discountPrice: 549,
    discountPercent: 71,
    image: earbud41,
    images: [earbud41, earbud42, earbud43, earbud44],
    category: "Electronics",
    tag: "bestseller",
    rating: 4.4,
    reviewCount: 4521,
    features: ["35dB ANC", "Transparency Mode", "aptX Adaptive", "Low Latency"],
    seller: "NoiseCut Audio",
    freeDelivery: true,
  },
  // Product 5
  {
    id: "product-5",
    name: "PulseBeats Sport TWS Earbuds",
    description:
      "Built for athletes who demand more. PulseBeats Sport earbuds feature a secure ear-hook design that stays locked in during the most intense workouts. With IP55 dust and water resistance, they handle rain, sweat, and mud without skipping a beat. The built-in heart rate sensor tracks your pulse in real-time for smarter training.",
    shortDescription: "Sports earbuds with heart rate sensor",
    originalPrice: 2999,
    discountPrice: 799,
    discountPercent: 73,
    image: earbud51,
    images: [earbud51, earbud52, earbud53, earbud54],
    category: "Electronics",
    tag: "trending",
    rating: 4.7,
    reviewCount: 1543,
    features: ["IP55 Rating", "Heart Rate Sensor", "Secure Ear Hooks", "20hr Battery"],
    seller: "PulseBeats Fitness",
    freeDelivery: true,
  },
  // Product 6
  {
    id: "product-6",
    name: "CrystalTone Hi-Fi Wireless Earbuds",
    description:
      "Experience every note in stunning clarity. CrystalTone earbuds use dual-driver architecture—a balanced armature for highs and a dynamic driver for lows—delivering Hi-Fi sound that rivals wired headphones. The premium ceramic-finish case complements the audiophile-grade performance with style.",
    shortDescription: "Dual-driver Hi-Fi earbuds with ceramic case",
    originalPrice: 3499,
    discountPrice: 899,
    discountPercent: 74,
    image: earbud61,
    images: [earbud61, earbud62, earbud63, earbud64],
    category: "Electronics",
    tag: "trending",
    rating: 4.4,
    reviewCount: 2156,
    features: ["Dual Driver System", "Hi-Fi Sound", "Ceramic Case", "32hr Battery"],
    seller: "CrystalTone Audio",
    freeDelivery: true,
  },
  // Product 7
  {
    id: "product-7",
    name: "ZenPods Meditation & Sleep Earbuds",
    description:
      "Designed for relaxation and restful sleep. ZenPods feature an ultra-slim profile that sits flush in your ear for comfortable side-sleeping. Pre-loaded with soothing white noise and nature soundscapes, they also support your own music library. The gentle alarm feature wakes you naturally without disturbing your partner.",
    shortDescription: "Sleep-friendly earbuds with white noise",
    originalPrice: 2999,
    discountPrice: 749,
    discountPercent: 75,
    image: earbud71,
    images: [earbud71, earbud72, earbud73, earbud74],
    category: "Electronics",
    tag: "bestseller",
    rating: 4.3,
    reviewCount: 1834,
    features: ["Ultra Slim Design", "Sleep-Friendly", "White Noise", "Gentle Alarm"],
    seller: "ZenPods Wellness",
    freeDelivery: true,
  },
  // Product 8
  {
    id: "product-8",
    name: "ThunderBass XL Wireless Earbuds",
    description:
      "For those who crave earth-shaking bass. ThunderBass XL packs an oversized 14.2mm driver with a bass boost chamber that amplifies low frequencies for a club-like experience in your ears. The aggressive angular design and matte black finish make a bold style statement.",
    shortDescription: "14.2mm mega bass earbuds",
    originalPrice: 2499,
    discountPrice: 649,
    discountPercent: 74,
    image: earbud81,
    images: [earbud81, earbud82, earbud83, earbud84],
    category: "Electronics",
    tag: "new",
    rating: 4.5,
    reviewCount: 1267,
    features: ["14.2mm Mega Driver", "Bass Boost Chamber", "Touch Controls", "ENC Mic"],
    seller: "ThunderBass Audio",
    freeDelivery: true,
  },
  // Product 9
  {
    id: "product-9",
    name: "MiniPod Ultra Compact TWS",
    description:
      "Incredibly small, surprisingly powerful. MiniPod earbuds weigh just 3.8g each and come in a lipstick-sized charging case that slips into any pocket. Don't let the size fool you—custom-tuned 6mm micro-drivers deliver rich, detailed sound with impressive soundstage for their class.",
    shortDescription: "Pocket-sized earbuds with big sound",
    originalPrice: 1999,
    discountPrice: 499,
    discountPercent: 75,
    image: earbud91,
    images: [earbud91, earbud92, earbud93, earbud94],
    category: "Electronics",
    tag: "limited",
    rating: 4.2,
    reviewCount: 987,
    features: ["3.8g Ultra Light", "Compact Case", "6mm Micro Drivers", "22hr Battery"],
    seller: "MiniPod Tech",
    freeDelivery: true,
  },
  // Product 10
  {
    id: "product-10",
    name: "AudioPhile Reference Earbuds",
    description:
      "Crafted for discerning listeners. These reference-grade earbuds feature Knowles balanced armature drivers with a hand-tuned crossover network for flat, accurate frequency response from 20Hz to 40kHz. Hi-Res Audio certified with LDAC support, they reveal details in your music you've never heard before.",
    shortDescription: "Reference-grade Hi-Res earbuds with LDAC",
    originalPrice: 4999,
    discountPrice: 1299,
    discountPercent: 74,
    image: earbud101,
    images: [earbud101, earbud102, earbud103, earbud104],
    category: "Electronics",
    tag: "trending",
    rating: 4.7,
    reviewCount: 3421,
    features: ["Knowles BA Drivers", "Hi-Res Certified", "LDAC Codec", "40kHz Response"],
    seller: "AudioPhile Store",
    freeDelivery: true,
  },
  // Product 11
  {
    id: "product-11",
    name: "GameStrike Low Latency Earbuds",
    description:
      "Dominate every match with zero audio lag. GameStrike earbuds feature a dedicated gaming mode that drops latency to just 38ms, giving you a competitive edge in fast-paced mobile games. The RGB-lit charging case adds gamer flair, while the dual-mic system ensures crystal-clear team communication.",
    shortDescription: "38ms gaming earbuds with RGB case",
    originalPrice: 2799,
    discountPrice: 699,
    discountPercent: 75,
    image: earbud111,
    images: [earbud111, earbud112, earbud113, earbud114],
    category: "Electronics",
    tag: "new",
    rating: 4.3,
    reviewCount: 1543,
    features: ["38ms Latency", "RGB Charging Case", "Game Mode", "Dual Mic ENC"],
    seller: "GameStrike Audio",
    freeDelivery: true,
  },
  // Product 12
  {
    id: "product-12",
    name: "OpenAir Bone Conduction Earbuds",
    description:
      "Stay connected to the world while you listen. OpenAir earbuds use innovative bone conduction technology to deliver sound through your cheekbones, leaving your ear canals completely open. Perfect for runners, cyclists, and anyone who needs situational awareness without sacrificing their music.",
    shortDescription: "Open-ear bone conduction earbuds",
    originalPrice: 3299,
    discountPrice: 849,
    discountPercent: 74,
    image: earbud121,
    images: [earbud121, earbud122, earbud123, earbud124],
    category: "Electronics",
    tag: "bestseller",
    rating: 4.4,
    reviewCount: 2087,
    features: ["Bone Conduction", "Open Ear Design", "IP67 Waterproof", "8hr Battery"],
    seller: "OpenAir Sound",
    freeDelivery: true,
  },
  // Product 13
  {
    id: "product-13",
    name: "StudioPro Monitor Earbuds",
    description:
      "Professional monitoring in a wireless package. StudioPro earbuds feature triple balanced armature drivers with an audiologist-tuned crossover for ruler-flat frequency response. Used by music producers and sound engineers, they reveal every flaw and nuance in your mix with surgical precision.",
    shortDescription: "Triple-driver studio monitor earbuds",
    originalPrice: 5499,
    discountPrice: 1499,
    discountPercent: 73,
    image: earbud131,
    images: [earbud131, earbud132, earbud133, earbud134],
    category: "Electronics",
    tag: "limited",
    rating: 4.8,
    reviewCount: 876,
    features: ["Triple BA Drivers", "Flat Response", "Studio Grade", "Detachable Cable"],
    seller: "StudioPro Audio",
    freeDelivery: true,
  },
  // Product 14
  {
    id: "product-14",
    name: "EcoBuds Value Wireless Earbuds",
    description:
      "Great sound doesn't have to break the bank. EcoBuds deliver clean, balanced audio with a well-tuned 10mm driver at an unbeatable price. Made with recycled ocean plastics, they're the eco-conscious choice that doesn't compromise on quality. Includes Type-C fast charging—10 minutes gives you 2 hours of playback.",
    shortDescription: "Eco-friendly budget earbuds with fast charge",
    originalPrice: 1299,
    discountPrice: 349,
    discountPercent: 73,
    image: earbud141,
    images: [earbud141, earbud142, earbud143],
    category: "Electronics",
    tag: "bestseller",
    rating: 4.1,
    reviewCount: 5432,
    features: ["Recycled Materials", "10mm Driver", "Fast Charge", "Type-C Port"],
    seller: "EcoBuds Green",
    freeDelivery: true,
  },
];
