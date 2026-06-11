import { useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { handleSuccess } from '@/lib/errors'

export function useOrderUpdates(orderId: string, onUpdate: (status: string) => void) {
  useEffect(() => {
    if (!orderId) return

    const channel = supabase
      .channel(`order-${orderId}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'orders', filter: `id=eq.${orderId}` },
        payload => {
          const newStatus = (payload.new as { status: string }).status
          onUpdate(newStatus)
          handleSuccess(`Order status updated to: ${newStatus}`)
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [orderId, onUpdate])
}
