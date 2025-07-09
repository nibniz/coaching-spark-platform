export interface Mentor {
  id: number;
  name: string;
  title: string;
  expertise: string[];
  rating: number;
  reviews: number;
  hourlyRate: number;
  location: string;
  sessions: number;
  responseTime: string;
  image: string;
  verified: boolean;
  description: string;
  languages: string[];
}

export interface SessionType {
  name: string;
  duration: string;
  price: number;
  description: string;
} 