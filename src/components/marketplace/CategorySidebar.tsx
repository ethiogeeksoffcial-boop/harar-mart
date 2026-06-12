import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ChevronDown, ChevronRight, Building2, Package } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import type { Category } from '@/integrations/supabase/types'

interface CategoryWithChildren extends Category {
  children?: Category[]
}

export default function CategorySidebar() {
  const [searchParams] = useSearchParams()
  const activeCategoryId = searchParams.get('category')
  const [categories, setCategories] = useState<CategoryWithChildren[]>([])
  const [expanded, setExpanded] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
  }, [])

  async function fetchCategories() {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .limit(50)
      if (error) throw error

      const parentCategories = data?.filter(c => !c.parent_id) || []
      const withChildren = parentCategories.map(parent => ({
        ...parent,
        children: data?.filter(c => c.parent_id === parent.id) || []
      }))
      setCategories(withChildren)
    } catch (e) {
      console.error('Error fetching categories:', e)
    } finally {
      setLoading(false)
    }
  }

  const toggleExpand = (id: string) => {
    setExpanded(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-10 bg-muted rounded-md animate-skeleton-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="bg-background border border-border rounded-lg overflow-hidden">
      <div className="p-3 border-b border-border bg-muted/30">
        <h3 className="font-semibold text-sm flex items-center gap-2">
          <Package className="h-4 w-4 text-primary" />
          All Categories
        </h3>
      </div>
      <nav className="py-1">
        {/* "All Products" link */}
        <Link
          to="/shop"
          className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
            !activeCategoryId ? 'bg-primary/5 text-primary font-medium' : 'hover:bg-muted'
          }`}
        >
          <Building2 className="h-4 w-4 shrink-0" />
          <span>All Products</span>
        </Link>

        {categories.map((cat) => {
          const isActive = activeCategoryId === cat.id
          const isExpanded = expanded.includes(cat.id)
          const hasChildren = cat.children && cat.children.length > 0

          return (
            <div key={cat.id}>
              <div className="flex items-center">
                <Link
                  to={`/shop?category=${cat.id}`}
                  className={`flex-1 flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                    isActive ? 'bg-primary/5 text-primary font-medium' : 'hover:bg-muted'
                  }`}
                >
                  <Building2 className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="truncate">{cat.name}</span>
                </Link>
                {hasChildren && (
                  <button
                    onClick={() => toggleExpand(cat.id)}
                    className="p-2.5 hover:bg-muted transition-colors"
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                )}
              </div>

              {/* Subcategories */}
              {hasChildren && isExpanded && (
                <div className="ml-4 border-l border-border">
                  {cat.children!.map((sub) => (
                    <Link
                      key={sub.id}
                      to={`/shop?category=${sub.id}`}
                      className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                        activeCategoryId === sub.id
                          ? 'bg-primary/5 text-primary font-medium'
                          : 'hover:bg-muted text-muted-foreground'
                      }`}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
                      <span className="truncate">{sub.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </div>
  )
}
