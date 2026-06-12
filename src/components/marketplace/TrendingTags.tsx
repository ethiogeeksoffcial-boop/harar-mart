import React from 'react'
import { Link } from 'react-router-dom'
import { Hash } from 'lucide-react'

interface TrendingTag {
  label: string
  query: string
  count?: number
}

const defaultTags: TrendingTag[] = [
  { label: 'Free Shipping', query: 'free shipping', count: 1234 },
  { label: 'Wholesale Price', query: 'wholesale', count: 987 },
  { label: 'New Arrivals', query: 'new arrival', count: 856 },
  { label: 'Best Seller', query: 'best seller', count: 743 },
  { label: 'Eco Friendly', query: 'eco friendly', count: 621 },
  { label: 'Premium Quality', query: 'premium quality', count: 534 },
  { label: 'Fast Delivery', query: 'fast delivery', count: 412 },
  { label: 'Factory Direct', query: 'factory direct', count: 389 },
  { label: 'Custom Logo', query: 'custom logo', count: 267 },
  { label: 'Sample Available', query: 'sample available', count: 198 },
  { label: 'Ready to Ship', query: 'ready to ship', count: 156 },
  { label: 'On Sale', query: 'on sale', count: 89 },
]

interface TrendingTagsProps {
  tags?: TrendingTag[]
}

export default function TrendingTags({ tags = defaultTags }: TrendingTagsProps) {
  // Sort by count descending and take top ones for visual variety
  const sorted = [...tags].sort((a, b) => (b.count || 0) - (a.count || 0))

  return (
    <div>
      <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
        <Hash className="h-4 w-4" />
        Trending Searches
      </h3>
      <div className="flex flex-wrap gap-2">
        {sorted.map((tag, i) => {
          // Vary the visual weight based on popularity
          const weight = tag.count || 0
          const sizeClass = weight > 800 ? 'text-sm' : weight > 400 ? 'text-xs' : 'text-xs'
          const opacityClass = weight > 800 ? 'bg-primary/10 text-primary' : weight > 400 ? 'bg-muted hover:bg-primary/5' : 'bg-muted/50 text-muted-foreground'

          return (
            <Link
              key={i}
              to={`/shop?q=${encodeURIComponent(tag.query)}`}
              className={`${sizeClass} ${opacityClass} px-3 py-1.5 rounded-full hover:text-primary transition-colors whitespace-nowrap`}
            >
              {tag.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
