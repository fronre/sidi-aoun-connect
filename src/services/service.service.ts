import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database.types';

type CreateServiceInput = Database['public']['Tables']['services']['Insert'];
type UpdateServiceInput = Database['public']['Tables']['services']['Update'];

export const serviceService = {
  // Create a new service
  async createService(serviceData: CreateServiceInput) {
    const { data, error } = await supabase
      .from('services')
      .insert(serviceData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update an existing service
  async updateService(serviceId: string, updates: UpdateServiceInput) {
    const { data, error } = await supabase
      .from('services')
      .update(updates)
      .eq('id', serviceId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete a service
  async deleteService(serviceId: string) {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', serviceId);

    if (error) throw error;
    return true;
  },

  // Get a single service by ID
  async getServiceById(serviceId: string) {
    const { data, error } = await supabase
      .from('services')
      .select(`
        *,
        provider:profiles(*),
        category:categories(*)
      `)
      .eq('id', serviceId)
      .single();

    if (error) throw error;
    return data;
  },

  // Get all services with optional filtering
  async getServices({
    categoryId,
    searchQuery = '',
    limit = 10,
    page = 1,
    onlyApproved = true,
  }: {
    categoryId?: string;
    searchQuery?: string;
    limit?: number;
    page?: number;
    onlyApproved?: boolean;
  } = {}) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from('services')
      .select(
        `
        *,
        provider:profiles(*),
        category:categories(*)
      `,
        { count: 'exact' }
      )
      .range(from, to);

    if (onlyApproved) {
      query = query.eq('is_approved', true);
    }

    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }

    if (searchQuery) {
      query = query.or(
        `business_name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`
      );
    }

    const { data, error, count } = await query.order('created_at', {
      ascending: false,
    });

    if (error) throw error;

    return {
      data,
      count: count || 0,
      totalPages: Math.ceil((count || 0) / limit),
      currentPage: page,
    };
  },

  // Get services by provider
  async getServicesByProvider(providerId: string) {
    const { data, error } = await supabase
      .from('services')
      .select(
        `
        *,
        category:categories(*)
      `
      )
      .eq('provider_id', providerId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Upload service image
  async uploadServiceImage(file: File, serviceId: string) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${serviceId}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `service-images/${fileName}`;

    const { error: uploadError, data } = await supabase.storage
      .from('services')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('services')
      .getPublicUrl(filePath);

    return publicUrl;
  },

  // Update service images
  async updateServiceImages(serviceId: string, images: string[]) {
    const { data, error } = await supabase
      .from('services')
      .update({ images })
      .eq('id', serviceId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
