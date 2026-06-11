import { Link } from 'react-router-dom'
import { Building2, Mail, Phone, MapPin } from 'lucide-react'

const footerLinks = {
  product: [
    { label: 'Browse Products', to: '/shop' },
    { label: 'Categories', to: '/categories' },
    { label: 'Verified Suppliers', to: '/suppliers' },
    { label: 'Request Quotes', to: '/quotes' },
    { label: 'Order Samples', to: '/samples' },
  ],
  company: [
    { label: 'About Us', to: '/about' },
    { label: 'Careers', to: '/careers' },
    { label: 'Press', to: '/press' },
    { label: 'Partners', to: '/partners' },
    { label: 'Contact Us', to: '/contact' },
  ],
  resources: [
    { label: 'Blog', to: '/blog' },
    { label: 'Buying Guides', to: '/guides' },
    { label: 'Help Center', to: '/help' },
    { label: 'API Documentation', to: '/api' },
    { label: 'Community', to: '/community' },
  ],
  legal: [
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms of Service', to: '/terms' },
    { label: 'Cookie Policy', to: '/cookies' },
    { label: 'Disclaimer', to: '/disclaimer' },
    { label: 'Compliance', to: '/compliance' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Tagline */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Building2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Harar Mart</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted global B2B marketplace connecting buyers with verified suppliers worldwide.
            </p>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Email Us</p>
                <p className="text-sm text-muted-foreground">support@haramart.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Call Us</p>
                <p className="text-sm text-muted-foreground">+251919054807</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Visit Us</p>
                <p className="text-sm text-muted-foreground">Harar, Ethiopia</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border text-center md:text-left">
          <p className="text-sm text-muted-foreground">
          © 2026 Harar Mart. All rights reserved. Built with ❤️ for global trade. | Developed by <a href="https://officialcloverdigital.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Clover Digital</a>

          </p>
        </div>
      </div>
    </footer>
  )
}
