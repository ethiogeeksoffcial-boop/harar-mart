import { supabase } from '@/integrations/supabase/client'
import type { Product } from '@/integrations/supabase/types'

const TABLE = 'products' as const

export const productsService = {
  async list({ search, category, page = 0, pageSize = 24 }: {
    search?: string
    category?: string
    page?: number
    pageSize?: number
  } = {}) {
    let q = supabase
      .from(TABLE)
      .select('*, seller: seller_profiles(*, users(*)), category:categories(*)', { count: 'exact' })
      .eq('is_available', true)
      .range(page * pageSize, (page + 1) * pageSize - 1)
      .order('created_at', { ascending: false })

    if (search)   q = q.ilike('name', `%${search}%`)
    if (category) q = q.eq('category_id', category)

    const { data, count, error } = await q
    if (error) throw error
    return { data: data as Product[], total: count ?? 0 }
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from(TABLE).select('*, seller: seller_profiles(*, users(*)), category:categories(*)').eq('id', id).single()
    if (error) throw error
    return data as Product
  },

  async create(product: Partial<Product>) {
    const { data, error } = await supabase
      .from(TABLE).insert(product).select().single()
    if (error) throw error
    return data as Product
  },

  async update(id: string, updates: Partial<Product>) {
    const { data, error } = await supabase
      .from(TABLE).update(updates).eq('id', id).select().single()
    if (error) throw error
    return data as Product
  },

  async remove(id: string) {
    const { error } = await supabase.from(TABLE).delete().eq('id', id)
    if (error) throw error
  },
}
