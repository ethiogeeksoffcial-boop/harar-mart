import React from 'react'
import { Link } from 'react-router-dom'
import { TrendingUp, Flame } from 'lucide-react'

interface HotQuery {
  label: string
  query: string
 热度?: number // popularity indicator
}

const defaultHotQueries: HotQuery[] = [
  { label: 'Wireless Earbuds', query: 'wireless earbuds', 热度: 95 },
  { label: 'Solar Panels', query: 'solar panels', 热度: 88 },
  { label: 'LED Lights', query: 'led lights', 热度: 82 },
  { label: 'Smart Watches', query: 'smart watch', 热度: 79 },
  { label: 'Coffee Beans', query: 'coffee beans', 热度: 75 },
  { label: 'Phone Cases', query: 'phone case', 热度: 72 },
  { label: 'Yoga Mats', query: 'yoga mat', 热度: 68 },
  { label: 'Baby Toys', query: 'baby toys', 热度: 65 },
  { label: 'Face Masks', query: 'face mask', 热度: 60 },
  { label: 'Bluetooth Speakers', query: 'bluetooth speaker', 热度: 58 },
  { label: 'Laptop Stands', query: 'laptop stand', 热度: 55 },
  { label: 'Water Bottles', query: 'water bottle', 热度: 52 },
]

interface HotQueriesProps {
  queries?: HotQuery[]
}

export default function HotQueries({ queries = defaultHotQueries }: HotQueriesProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5 shrink-0">
        <Flame className="h-4 w-4 text-orange-500" />
        <span className="text-sm font-medium text-muted-foreground">Hot Queries</span>
      </div>
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {queries.map((q, i) => (
          <Link
            key={i}
            to={`/shop?q=${encodeURIComponent(q.query)}`}
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-muted hover:bg-primary/10 hover:text-primary rounded-full text-sm transition-colors whitespace-nowrap"
          >
            <TrendingUp className="h-3 w-3" />
            {q.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
