import profileSunita from '@/assets/profile-sunita.jpg';
import profileRiya from '@/assets/profile-riya.jpg';
import profilePooja from '@/assets/profile-pooja.jpg';
import profileAnjali from '@/assets/profile-anjali.jpg';
import profilePriya from '@/assets/profile-priya.jpg';
import profileNeha from '@/assets/profile-neha.jpg';

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
    id: 'sunita',
    name: 'Sunita',
    tagline: 'Friendly & Polite',
    image: profileSunita,
    rating: 4,
    description: 'Sweet and caring personality. Always ready to listen and make your day special with warm conversations.'
  },
  {
    id: 'riya',
    name: 'Riya',
    tagline: 'Quick Response',
    image: profileRiya,
    rating: 5,
    description: 'Energetic and fun-loving. Known for her quick wit and engaging conversations that keep you entertained.'
  },
  {
    id: 'pooja',
    name: 'Pooja',
    tagline: 'Verified Profile',
    image: profilePooja,
    rating: 4,
    description: 'Elegant and sophisticated. Perfect for meaningful conversations and creating memorable moments.'
  },
  {
    id: 'anjali',
    name: 'Anjali',
    tagline: 'Top Rated',
    image: profileAnjali,
    rating: 5,
    description: 'Cheerful and understanding. Her positive energy makes every call a delightful experience.'
  },
  {
    id: 'priya',
    name: 'Priya',
    tagline: 'Premium Member',
    image: profilePriya,
    rating: 4,
    description: 'Graceful and attentive. She ensures you feel valued and appreciated in every interaction.'
  },
  {
    id: 'neha',
    name: 'Neha',
    tagline: 'New & Popular',
    image: profileNeha,
    rating: 5,
    description: 'Stylish and modern. Her vibrant personality brings freshness to every conversation.'
  }
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
    id: 'video',
    name: 'Video Call',
    price: 99,
    duration: '20 minutes',
    description: 'Face-to-face video conversation'
  },
  {
    id: 'voice',
    name: 'Voice Call',
    price: 79,
    duration: '20 minutes',
    description: 'Audio-only conversation'
  },
  {
    id: 'demo',
    name: 'Demo Call',
    price: 50,
    duration: '5 minutes',
    description: 'Quick introduction call'
  }
];
