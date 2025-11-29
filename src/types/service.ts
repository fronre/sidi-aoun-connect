export interface Service {
  id: string;
  name: string;
  businessName: string;
  category: string;
  description: string;
  phone: string;
  email?: string;
  address: string;
  images: string[];
  rating: number;
  reviewCount: number;
  latitude?: number;
  longitude?: number;
  isVerified: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface Review {
  id: string;
  serviceId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: 'user' | 'provider' | 'admin';
}
