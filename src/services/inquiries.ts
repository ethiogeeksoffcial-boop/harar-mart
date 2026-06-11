import { supabase } from '@/integrations/supabase/client'

export const inquiriesService = {
  async send(data: {
    product_id: string
    seller_id:  string
    buyer_id:   string
    message:    string
    quantity:   number
  }) {
    const { error } = await supabase.from('inquiries').insert(data)
    if (error) throw error
  },

  async listForSeller(sellerId: string) {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*, products(name), users!buyer_id(full_name, email)')
      .eq('seller_id', sellerId)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  },

  async listForBuyer(buyerId: string) {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*, products(name, images), users!seller_id(full_name)')
      .eq('buyer_id', buyerId)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  },
}
