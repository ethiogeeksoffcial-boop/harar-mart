import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { Product } from '@/integrations/supabase/types'

interface ProductFormProps {
  product?: Product
  onSubmit: (data: any) => void
  onCancel: () => void
}

export default function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
  const [formData, setFormData] = React.useState({
    name: product?.name || '',
    description: product?.description || '',
    min_price: product?.min_price?.toString() || '',
    max_price: product?.max_price?.toString() || '',
    category_id: product?.category_id || '',
    moq: product?.moq?.toString() || '1',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      min_price: parseFloat(formData.min_price),
      max_price: parseFloat(formData.max_price),
      moq: parseInt(formData.moq),
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{product ? 'Edit Product' : 'Add New Product'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="min_price">Min Price</Label>
              <Input
                id="min_price"
                type="number"
                step="0.01"
                value={formData.min_price}
                onChange={(e) => setFormData({ ...formData, min_price: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max_price">Max Price</Label>
              <Input
                id="max_price"
                type="number"
                step="0.01"
                value={formData.max_price}
                onChange={(e) => setFormData({ ...formData, max_price: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="moq">MOQ (Min Order Qty)</Label>
              <Input
                id="moq"
                type="number"
                value={formData.moq}
                onChange={(e) => setFormData({ ...formData, moq: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Save Product</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}