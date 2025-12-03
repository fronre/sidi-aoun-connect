export type AppRole = 'admin' | 'moderator' | 'user';
export type AccountType = 'user' | 'provider';

export interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  phone?: string;
  avatar_url?: string;
  account_type: AccountType;
  bio?: string;
  address?: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
  description?: string;
  created_at: string;
}

export interface Service {
  id: string;
  provider_id: string;
  category_id?: string;
  business_name: string;
  description?: string;
  phone: string;
  email?: string;
  address: string;
  images: string[];
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'id' | 'user_id' | 'created_at'>>;
      };
      user_roles: {
        Row: UserRole;
        Insert: Omit<UserRole, 'id' | 'created_at'>;
        Update: Partial<Omit<UserRole, 'id' | 'user_id' | 'created_at'>>;
      };
      categories: {
        Row: Category;
        Insert: Omit<Category, 'id' | 'created_at'>;
        Update: Partial<Omit<Category, 'id' | 'created_at'>>;
      };
      services: {
        Row: Service;
        Insert: Omit<Service, 'id' | 'created_at' | 'updated_at' | 'is_approved'> & {
          is_approved?: boolean;
        };
        Update: Partial<Omit<Service, 'id' | 'provider_id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
}
