import host1 from "@/assets/host-1.jpg";
import host2 from "@/assets/host-2.jpg";
import host3 from "@/assets/host-3.jpg";
import host4 from "@/assets/host-4.jpg";
import host5 from "@/assets/host-5.jpg";
import host6 from "@/assets/host-6.jpg";
import host7 from "@/assets/host-7.jpg";
import host8 from "@/assets/host-8.jpg";

export interface Profile {
  id: string;
  name: string;
  tagline: string;
  image: string;
  rating: number;
  age: number;
  description: string;
}

export const profiles: Profile[] = [
  {
    id: "ananya",
    name: "Ananya",
    tagline: "Session Host",
    image: host1,
    rating: 5,
    age: 23,
    description: "Warm, sweet, and caring personality. Gentle talks with a romantic and comforting vibe.",
  },
  {
    id: "meera",
    name: "Meera",
    tagline: "Session Host",
    image: host2,
    rating: 5,
    age: 25,
    description: "Confident and affectionate nature. Smooth conversations that feel natural and close.",
  },
  {
    id: "kavya",
    name: "Kavya",
    tagline: "Session Host",
    image: host3,
    rating: 4,
    age: 22,
    description: "Playful and cheerful. Cute romantic talks full of positive energy.",
  },
  {
    id: "divya",
    name: "Divya",
    tagline: "Session Host",
    image: host4,
    rating: 5,
    age: 26,
    description: "Mature and understanding. Calm, deep conversations with a soft romantic tone.",
  },
  {
    id: "shruti",
    name: "Shruti",
    tagline: "Session Host",
    image: host5,
    rating: 4,
    age: 24,
    description: "Soft-spoken and loving. Friendly chats with sweetness and care.",
  },
  {
    id: "nisha",
    name: "Nisha",
    tagline: "Session Host",
    image: host6,
    rating: 5,
    age: 21,
    description: "Lively and charming. Fun, flirty, and engaging conversations.",
  },
  {
    id: "priya",
    name: "Priyanka",
    tagline: "Session Host",
    image: host7,
    rating: 4,
    age: 27,
    description: "Classy and composed. Romantic but respectful communication style.",
  },
  {
    id: "aisha",
    name: "Aisha",
    tagline: "Session Host",
    image: host8,
    rating: 5,
    age: 28,
    description: "Warm-hearted and trustworthy. Smooth, comforting, and romantic talks.",
  },
];

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
}

export const services: Service[] = [
  {
    id: "video",
    name: "Live Online video Call",
    price: 99,
    duration: "20 minutes",
    description: "Face-to-face video session",
  },
  {
    id: "voice",
    name: "Audio Call",
    price: 89,
    duration: "20 minutes",
    description: "Audio-only session",
  },
  {
    id: "text",
    name: "chating with photos",
    price: 79,
    duration: "20 minutes",
    description: "Text-based interaction",
  },
];
