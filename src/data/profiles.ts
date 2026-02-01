import host1 from '@/assets/host-1.jpg';
import host2 from '@/assets/host-2.jpg';
import host3 from '@/assets/host-3.jpg';
import host4 from '@/assets/host-4.jpg';
import host5 from '@/assets/host-5.jpg';
import host6 from '@/assets/host-6.jpg';
import host7 from '@/assets/host-7.jpg';
import host8 from '@/assets/host-8.jpg';

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
    id: 'ananya',
    name: 'Ananya',
    tagline: 'Session Host',
    image: host1,
    rating: 5,
    description: 'Calm and professional session host with a friendly communication style. Age group: 20–24. Sessions usually start within 1 minute after confirmation. Designed for smooth and comfortable online interaction.'
  },
  {
    id: 'meera',
    name: 'Meera',
    tagline: 'Session Host',
    image: host2,
    rating: 5,
    description: 'Experienced session host known for clear and structured communication. Age group: 22–26. Quick response time and reliable session delivery. Focused on creating a productive session environment.'
  },
  {
    id: 'kavya',
    name: 'Kavya',
    tagline: 'Session Host',
    image: host3,
    rating: 4,
    description: 'Warm and approachable session host with excellent listening skills. Age group: 21–25. Sessions are well-organized and start promptly. Creates a welcoming atmosphere for all participants.'
  },
  {
    id: 'divya',
    name: 'Divya',
    tagline: 'Session Host',
    image: host4,
    rating: 5,
    description: 'Detail-oriented session host with a methodical approach. Age group: 23–27. Known for punctuality and efficient session management. Ensures clear communication throughout the session.'
  },
  {
    id: 'shruti',
    name: 'Shruti',
    tagline: 'Session Host',
    image: host5,
    rating: 4,
    description: 'Energetic and engaging session host with a positive attitude. Age group: 20–24. Sessions are interactive and well-paced. Brings enthusiasm to every online interaction.'
  },
  {
    id: 'nisha',
    name: 'Nisha',
    tagline: 'Session Host',
    image: host6,
    rating: 5,
    description: 'Thoughtful and patient session host with a calm demeanor. Age group: 24–28. Focuses on understanding participant needs. Maintains a professional and supportive session environment.'
  },
  {
    id: 'priyanka',
    name: 'Priyanka',
    tagline: 'Session Host',
    image: host7,
    rating: 4,
    description: 'Articulate and composed session host with strong communication skills. Age group: 25–29. Sessions are structured and goal-oriented. Brings clarity and professionalism to every session.'
  },
  {
    id: 'aisha',
    name: 'Aisha',
    tagline: 'Session Host',
    image: host8,
    rating: 5,
    description: 'Dynamic and adaptable session host with a versatile approach. Age group: 22–26. Quick to respond and flexible with session formats. Committed to delivering quality online experiences.'
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
    name: 'Live Online Call',
    price: 99,
    duration: '20 minutes',
    description: 'Face-to-face video session'
  },
  {
    id: 'voice',
    name: 'Audio Call',
    price: 89,
    duration: '20 minutes',
    description: 'Audio-only session'
  },
  {
    id: 'text',
    name: 'Interactive Text Session',
    price: 79,
    duration: '20 minutes',
    description: 'Text-based interaction'
  }
];
