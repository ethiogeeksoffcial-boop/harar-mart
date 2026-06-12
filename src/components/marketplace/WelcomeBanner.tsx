import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { MapPin, Sun, Moon, Cloud } from 'lucide-react'

export default function WelcomeBanner() {
  const { user } = useAuth()

  // Simple greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 18) return 'Good Afternoon'
    return 'Good Evening'
  }

  const getGreetingIcon = () => {
    const hour = new Date().getHours()
    if (hour < 12) return <Sun className="h-4 w-4 text-amber-500" />
    if (hour < 18) return <Cloud className="h-4 w-4 text-blue-400" />
    return <Moon className="h-4 w-4 text-indigo-400" />
  }

  return (
    <div className="bg-gradient-to-r from-primary/5 via-background to-primary/5 border-b border-border/50">
      <div className="container-alibaba py-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            {getGreetingIcon()}
            <p className="text-sm">
              <span className="text-muted-foreground">{getGreeting()},</span>{' '}
              <span className="font-medium">
                {user?.email ? user.email.split('@')[0] : 'Guest'}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <Link to="/shop" className="hover:text-primary transition-colors">
              Today's Deals
            </Link>
            <span className="text-border">|</span>
            <Link to="/support" className="hover:text-primary transition-colors">
              Customer Service
            </Link>
            <span className="text-border hidden sm:inline">|</span>
            <div className="hidden sm:flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>Ship to: Ethiopia</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
