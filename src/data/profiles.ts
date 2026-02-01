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
  description: string;
}

export const profiles: Profile[] = [
  {
    id: "ananya",
    name: "Ananya",
    tagline: "Session Host",
    image: host1,
    rating: 5,
    description:
      "Friendly and confident. Known for clear communication and positive interactions. Age 21. Services usually start within 1 minute. Popular choice for first-time users.",
  },
  {
    id: "meera",
    name: "Meera",
    tagline: "Session Host",
    image: host2,
    rating: 5,
    description:
      "Energetic and polite personality with a calm approach. Age 23. Fast response time and smooth experience. Highly appreciated by returning users.",
  },
  {
    id: "kavya",
    name: "Kavya",
    tagline: "Session Host",
    image: host3,
    rating: 4,
    description:
      "Soft-spoken and attentive. Focused on user comfort and quality interaction. Age 20. Quick availability with minimal waiting time.",
  },
  {
    id: "divya",
    name: "Divya",
    tagline: "Session Host",
    image: host4,
    rating: 5,
    description:
      "Cheerful and engaging communication style. Age 24. Reliable service flow and prompt connection after booking.",
  },
  {
    id: "shruti",
    name: "Shruti",
    tagline: "Session Host",
    image: host5,
    rating: 4,
    description:
      "Warm and respectful conversations. Age 22. Service usually begins within one minute after confirmation.",
  },
  {
    id: "nisha",
    name: "Nisha",
    tagline: "Session Host",
    image: host6,
    rating: 5,
    description:
      "Balanced, friendly, and easy to talk to. Age 19. Known for timely responses and consistent availability.",
  },
  {
    id: "priya",
    name: "Priyanka",
    tagline: "Session Host",
    image: host7,
    rating: 4,
    description: "Calm and confident presence. Age 23. Smooth onboarding and fast service initiation.",
  },
  {
    id: "aisha",
    name: "Aisha",
    tagline: "Session Host",
    image: host8,
    rating: 5,
    description:
      "Professional and well-mannered interaction style. Age 21. Designed for a simple and hassle-free experience.",
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
