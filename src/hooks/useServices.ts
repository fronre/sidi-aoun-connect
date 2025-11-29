import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Service {
  id: string;
  provider_id: string;
  category_id: string | null;
  business_name: string;
  description: string | null;
  phone: string;
  email: string | null;
  address: string;
  images: string[];
  latitude: number | null;
  longitude: number | null;
  is_verified: boolean;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
  categories?: {
    name: string;
    icon: string | null;
  } | null;
  profiles?: {
    full_name: string;
    avatar_url: string | null;
  } | null;
  reviews?: {
    rating: number;
  }[];
}

export const useServices = (categoryId?: string, searchQuery?: string) => {
  return useQuery({
    queryKey: ['services', categoryId, searchQuery],
    queryFn: async () => {
      let query = supabase
        .from('services')
        .select(`
          *,
          categories (name, icon),
          profiles (full_name, avatar_url),
          reviews (rating)
        `)
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      if (searchQuery) {
        query = query.or(`business_name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,address.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      
      // Calculate average rating for each service
      return (data as Service[]).map(service => ({
        ...service,
        averageRating: service.reviews?.length 
          ? service.reviews.reduce((acc, r) => acc + r.rating, 0) / service.reviews.length 
          : 0,
        reviewCount: service.reviews?.length || 0,
      }));
    },
  });
};

export const useService = (id: string) => {
  return useQuery({
    queryKey: ['service', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select(`
          *,
          categories (name, icon),
          profiles (full_name, avatar_url, phone),
          reviews (
            id,
            rating,
            comment,
            created_at,
            profiles (full_name, avatar_url)
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      
      const service = data as any;
      return {
        ...service,
        averageRating: service.reviews?.length 
          ? service.reviews.reduce((acc: number, r: any) => acc + r.rating, 0) / service.reviews.length 
          : 0,
        reviewCount: service.reviews?.length || 0,
      };
    },
    enabled: !!id,
  });
};

export const useMyServices = (profileId?: string) => {
  return useQuery({
    queryKey: ['my-services', profileId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select(`
          *,
          categories (name, icon),
          reviews (rating)
        `)
        .eq('provider_id', profileId!)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Service[];
    },
    enabled: !!profileId,
  });
};

export const useCreateService = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (service: Omit<Service, 'id' | 'created_at' | 'updated_at' | 'is_verified' | 'is_approved'>) => {
      const { data, error } = await supabase
        .from('services')
        .insert(service)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      queryClient.invalidateQueries({ queryKey: ['my-services'] });
    },
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Service> & { id: string }) => {
      const { data, error } = await supabase
        .from('services')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      queryClient.invalidateQueries({ queryKey: ['my-services'] });
    },
  });
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      queryClient.invalidateQueries({ queryKey: ['my-services'] });
    },
  });
};
