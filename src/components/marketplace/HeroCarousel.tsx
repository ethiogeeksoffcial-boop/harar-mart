import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'

interface HeroSlide {
  id: string
  title: string
  subtitle: string
  cta: string
  ctaLink: string
  bgColor: string
  accentColor: string
  image?: string
}

const defaultSlides: HeroSlide[] = [
  {
    id: '1',
    title: 'Source Quality Products\nfrom Verified Suppliers',
    subtitle: 'Connect with manufacturers and wholesalers worldwide. Get the best deals with bulk ordering.',
    cta: 'Start Sourcing',
    ctaLink: '/shop',
    bgColor: 'from-primary/10 via-background to-primary/5',
    accentColor: 'bg-primary',
  },
  {
    id: '2',
    title: 'Bulk Pricing\nfor Every Business',
    subtitle: 'Whether you need 100 or 10,000 units, find competitive prices from trusted suppliers.',
    cta: 'View Deals',
    ctaLink: '/shop?sort=price_asc',
    bgColor: 'from-blue-50 via-background to-blue-50/50',
    accentColor: 'bg-blue-500',
  },
  {
    id: '3',
    title: 'Global Trade,\nLocal Trust',
    subtitle: 'Join 10,000+ businesses already sourcing on Harar Mart. Verified suppliers, guaranteed quality.',
    cta: 'Join Now',
    ctaLink: '/auth',
    bgColor: 'from-amber-50 via-background to-amber-50/50',
    accentColor: 'bg-amber-500',
  },
]

interface HeroCarouselProps {
  slides?: HeroSlide[]
}

export default function HeroCarousel({ slides = defaultSlides }: HeroCarouselProps) {
  return (
    <Carousel className="w-full h-full" loop>
      <CarouselContent>
        {slides.map((slide) => (
          <CarouselItem key={slide.id}>
            <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${slide.bgColor} min-h-[320px] md:min-h-[400px] flex items-center`}>
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-white/10 to-transparent rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10 p-8 md:p-12 max-w-xl">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight whitespace-pre-line mb-4">
                  {slide.title}
                </h2>
                <p className="text-sm md:text-base text-muted-foreground mb-6 max-w-lg">
                  {slide.subtitle}
                </p>
                <Link to={slide.ctaLink}>
                  <Button size="lg" className="h-11 px-6">
                    {slide.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {/* Right side decorative image area */}
              <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/40 to-primary/20" />
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Navigation Arrows */}
      <CarouselPrevious className="left-3 bg-white/90 hover:bg-white shadow-md border-0" />
      <CarouselNext className="right-3 bg-white/90 hover:bg-white shadow-md border-0" />

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {slides.map((_, index) => (
          <div
            key={index}
            className="w-2 h-2 rounded-full bg-muted-foreground/30 data-[active=true]:bg-primary data-[active=true]:w-6 transition-all duration-300"
            data-active={index === 0}
          />
        ))}
      </div>
    </Carousel>
  )
}
