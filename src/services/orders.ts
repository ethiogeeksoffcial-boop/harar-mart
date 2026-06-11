import { supabase } from '@/integrations/supabase/client'
import type { Order, OrderItem } from '@/integrations/supabase/types'

export const ordersService = {
  async listForBuyer(buyerId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select('*, items:order_items(*, product:products(*))')
      .eq('user_id', buyerId)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data as (Order & { items: OrderItem[] })[]
  },

  async listForSeller(sellerId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select('*, items:order_items(*, product:products(*)), users!user_id(full_name, email)')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('orders')
      .select('*, items:order_items(*, product:products(*))')
      .eq('id', id)
      .single()
    if (error) throw error
    return data as Order & { items: OrderItem[] }
  },

  async updateStatus(orderId: string, status: Order['status']) {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)
    if (error) throw error
  },
}
