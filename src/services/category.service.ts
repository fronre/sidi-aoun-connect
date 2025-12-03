import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database.types';

type CreateCategoryInput = Database['public']['Tables']['categories']['Insert'];
type UpdateCategoryInput = Database['public']['Tables']['categories']['Update'];

export const categoryService = {
  // Create a new category
  async createCategory(categoryData: CreateCategoryInput) {
    const { data, error } = await supabase
      .from('categories')
      .insert(categoryData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update an existing category
  async updateCategory(categoryId: string, updates: UpdateCategoryInput) {
    const { data, error } = await supabase
      .from('categories')
      .update(updates)
      .eq('id', categoryId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete a category
  async deleteCategory(categoryId: string) {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', categoryId);

    if (error) throw error;
    return true;
  },

  // Get all categories
  async getCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;
    return data;
  },

  // Get a single category by ID
  async getCategoryById(categoryId: string) {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', categoryId)
      .single();

    if (error) throw error;
    return data;
  },

  // Get services count by category
  async getServicesCountByCategory() {
    const { data, error } = await supabase
      .from('services')
      .select('category_id, count', { count: 'exact', head: true })
      .eq('is_approved', true)
      .group('category_id');

    if (error) throw error;
    return data;
  },
};
