import { toast } from '@/hooks/use-toast'



export function handleError(error: unknown, fallback = 'Something went wrong') {
  const message =
    error instanceof Error ? error.message :
    typeof error === 'string' ? error :
    fallback

  console.error('[handleError]', error)

  toast({
    title: 'Error',
    description: message,
    variant: 'destructive',
  })
}

export function handleSuccess(message: string) {
  toast({ title: message })
}
