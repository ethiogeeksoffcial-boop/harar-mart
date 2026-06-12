import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Building2 } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import type { Category } from '@/integrations/supabase/types'

interface CategoryWithChildren extends Category {
  children?: Category[]
}

export default function MegaMenu() {
  const [categories, setCategories] = useState<CategoryWithChildren[]>([])
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setActiveCategory(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  async function fetchCategories() {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .limit(20)
      if (error) throw error

      // Build tree structure
      const parentCategories = data?.filter(c => !c.parent_id) || []
      const withChildren = parentCategories.map(parent => ({
        ...parent,
        children: data?.filter(c => c.parent_id === parent.id) || []
      }))
      setCategories(withChildren)
    } catch (e) {
      console.error('Error fetching categories:', e)
    }
  }

  const handleMouseEnter = (categoryId: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveCategory(categoryId)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
      setActiveCategory(null)
    }, 150)
  }

  const activeCategoryData = categories.find(c => c.id === activeCategory)

  return (
    <div ref={menuRef} className="relative" onMouseLeave={handleMouseLeave}>
      {/* Trigger */}
      <button
        onMouseEnter={() => setIsOpen(true)}
        className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
          isOpen ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
        }`}
      >
        <Building2 className="h-4 w-4" />
        Categories
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="animate-mega-menu absolute top-full left-0 mt-1 w-[700px] bg-background border border-border rounded-lg shadow-xl z-50 flex">
          {/* Level 1 - Categories List */}
          <div className="w-[240px] border-r border-border py-2 shrink-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onMouseEnter={() => handleMouseEnter(cat.id)}
                onClick={() => {
                  setIsOpen(false)
                  setActiveCategory(null)
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-primary/5 text-primary font-medium'
                    : 'hover:bg-muted'
                }`}
              >
                <span className="truncate">{cat.name}</span>
                {cat.children && cat.children.length > 0 && (
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                )}
              </button>
            ))}
          </div>

          {/* Level 2 - Subcategories */}
          <div className="flex-1 p-4">
            {activeCategoryData ? (
              <div>
                <Link
                  to={`/shop?category=${activeCategoryData.id}`}
                  onClick={() => { setIsOpen(false); setActiveCategory(null) }}
                  className="text-sm font-semibold text-primary hover:underline mb-3 block"
                >
                  {activeCategoryData.name}
                </Link>
                {activeCategoryData.children && activeCategoryData.children.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {activeCategoryData.children.map((sub) => (
                      <Link
                        key={sub.id}
                        to={`/shop?category=${sub.id}`}
                        onClick={() => { setIsOpen(false); setActiveCategory(null) }}
                        className="group flex items-start gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                      >
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                          <Building2 className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{sub.name}</p>
                          {sub.description && (
                            <p className="text-xs text-muted-foreground line-clamp-1">{sub.description}</p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No subcategories</p>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                Hover over a category to see subcategories
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
