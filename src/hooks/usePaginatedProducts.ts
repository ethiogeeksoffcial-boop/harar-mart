import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import type { Product } from '@/integrations/supabase/types'

const PAGE_SIZE = 24

export function usePaginatedProducts(search: string, category: string) {
  const [products, setProducts]   = useState<Product[]>([])
  const [page, setPage]           = useState(0)
  const [total, setTotal]         = useState(0)
  const [loading, setLoading]     = useState(false)

  useEffect(() => { setPage(0) }, [search, category])

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    const from = page * PAGE_SIZE
    const to   = from + PAGE_SIZE - 1

    let query = supabase
      .from('products')
      .select('*, seller: seller_profiles(*, users(*)), category:categories(*)', { count: 'exact' })
      .eq('is_available', true)
      .range(from, to)
      .order('created_at', { ascending: false })

    if (search)   query = query.ilike('name', `%${search}%`)
    if (category) query = query.eq('category_id', category)

    query.then(({ data, count, error }) => {
      if (cancelled || error) return
      setProducts(data ?? [])
      setTotal(count ?? 0)
      setLoading(false)
    })

    return () => { cancelled = true }
  }, [page, search, category])

  return {
    products,
    loading,
    page,
    setPage,
    totalPages: Math.ceil(total / PAGE_SIZE),
    total,
  }
}
