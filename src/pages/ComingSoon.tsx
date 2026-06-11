import { useLocation } from 'react-router-dom'

export default function ComingSoon() {
  const { pathname } = useLocation()
  const name = pathname.split('/').pop()?.replace(/-/g, ' ') ?? 'page'

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-center px-4">
      <h1 className="text-2xl font-semibold capitalize">{name}</h1>
      <p className="text-muted-foreground">This page is coming soon.</p>
    </div>
  )
}
