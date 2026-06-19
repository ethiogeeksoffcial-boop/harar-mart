import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/integrations/supabase/client'
import type { ProductWithRelations, Category } from '@/integrations/supabase/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit, Trash2, Package, Upload, X } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { SellerProductsSkeleton } from '@/components/app/AppSkeletons'

export default function SellerProducts() {
  const [products, setProducts] = useState<ProductWithRelations[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<ProductWithRelations | null>(null)
  const { sellerProfile, isSeller } = useAuth()
  const navigate = useNavigate()

  // Form state
  const [imageUploading, setImageUploading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category_id: '',
    moq: 1,
    min_price: 0,
    max_price: 0,
    images: [] as string[],
    hs_code: '',
    lead_time_days: 7,
    certifications: [] as string[],
    is_active: true,
  })

  useEffect(() => {
    if (!isSeller || !sellerProfile) {
      navigate('/auth?role=seller')
      return
    }
    fetchProducts()
    fetchCategories()
  }, [isSeller, sellerProfile, navigate])

  async function fetchProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*, category:categories(*)')
      .eq('seller_id', sellerProfile?.id)
      .order('created_at', { ascending: false })
    
    if (data && !error) {
      setProducts(data)
    }
    setLoading(false)
  }

  async function fetchCategories() {
    const { data } = await supabase.from('categories').select('*')
    if (data) setCategories(data)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    const productPayload = {
      ...formData,
      is_available: formData.is_active,
    }

    if (editingProduct) {
      const { error } = await supabase
        .from('products')
        .update({
          ...productPayload,
          updated_at: new Date().toISOString(),
        })
        .eq('id', editingProduct.id)
      if (error) alert('Failed to update product')
      else {
        setIsDialogOpen(false)
        fetchProducts()
      }
    } else {
      const { error } = await supabase.from('products').insert({
        ...productPayload,
        seller_id: sellerProfile?.id,
      })
      if (error) alert('Failed to create product')
      else {
        setIsDialogOpen(false)
        fetchProducts()
      }
    }
    resetForm()
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this product?')) return
    
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) alert('Failed to delete product')
    else fetchProducts()
  }

  function handleEdit(product: ProductWithRelations) {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description ?? '',
      category_id: product.category_id ?? '',
      moq: product.moq ?? 1,
      min_price: product.min_price ?? 0,
      max_price: product.max_price ?? 0,
      images: product.images ?? [],
      hs_code: product.hs_code || '',
      lead_time_days: product.lead_time_days ?? 7,
      certifications: product.certifications ?? [],
      is_active: product.is_active ?? true,
    })
    setIsDialogOpen(true)
  }

  function resetForm() {
    setEditingProduct(null)
    setFormData({
      name: '',
      description: '',
      category_id: '',
      moq: 1,
      min_price: 0,
      max_price: 0,
      images: [],
      hs_code: '',
      lead_time_days: 7,
      certifications: [],
      is_active: true,
    })
  }

  if (!isSeller) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">Only sellers can access this page.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading) {
    return <SellerProductsSkeleton />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Products</h1>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) resetForm()
        }}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category_id} onValueChange={(v) => setFormData({ ...formData, category_id: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="moq">MOQ *</Label>
                  <Input
                    id="moq"
                    type="number"
                    min="1"
                    value={formData.moq}
                    onChange={(e) => setFormData({ ...formData, moq: parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="leadTime">Lead Time (days) *</Label>
                  <Input
                    id="leadTime"
                    type="number"
                    min="1"
                    value={formData.lead_time_days}
                    onChange={(e) => setFormData({ ...formData, lead_time_days: parseInt(e.target.value) })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minPrice">Min Price ($) *</Label>
                  <Input
                    id="minPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.min_price}
                    onChange={(e) => setFormData({ ...formData, min_price: parseFloat(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxPrice">Max Price ($) *</Label>
                  <Input
                    id="maxPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.max_price}
                    onChange={(e) => setFormData({ ...formData, max_price: parseFloat(e.target.value) })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hsCode">HS Code (Optional)</Label>
                <Input
                  id="hsCode"
                  value={formData.hs_code}
                  onChange={(e) => setFormData({ ...formData, hs_code: e.target.value })}
                  placeholder="e.g., 85263090"
                />
              </div>

              <div className="space-y-2">
                <Label>Product Images</Label>
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {formData.images.map((url, idx) => (
                      <div key={idx} className="relative group">
                        <img src={url} alt={`Product ${idx + 1}`} className="w-full h-24 object-cover rounded border" />
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }))}
                          className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div>
                  <input
                    type="file"
                    id="product-image-upload"
                    accept="image/*"
                    className="hidden"
                    disabled={imageUploading}
                    onChange={async (e) => {
                      const file = e.target.files?.[0]
                      if (!file) return
                      setImageUploading(true)
                      try {
                        const ext = file.name.split('.').pop()
                        const path = `${crypto.randomUUID()}.${ext}`
                        const { error: uploadError } = await supabase.storage
                          .from('product-images')
                          .upload(path, file, { upsert: false })
                        if (uploadError) throw uploadError
                        const { data } = supabase.storage.from('product-images').getPublicUrl(path)
                        setFormData(prev => ({ ...prev, images: [...prev.images, data.publicUrl] }))
                      } catch (err) {
                        alert('Upload failed: ' + (err instanceof Error ? err.message : 'Unknown error'))
                      } finally {
                        setImageUploading(false)
                        e.target.value = ''
                      }
                    }}
                  />
                  <label htmlFor="product-image-upload">
                    <Button type="button" variant="outline" size="sm" disabled={imageUploading} asChild>
                      <span>
                        <Upload className="h-4 w-4 mr-2" />
                        {imageUploading ? 'Uploading...' : 'Upload Image'}
                      </span>
                    </Button>
                  </label>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                />
                <Label htmlFor="isActive">Product is active/available</Label>
              </div>

              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingProduct ? 'Update' : 'Create'} Product
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {products.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">No products yet</p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Product
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <div className="aspect-square bg-muted rounded-lg mb-4 overflow-hidden">
                  {product.images?.[0] ? (
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <Package className="h-12 w-12" />
                    </div>
                  )}
                </div>
                <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">MOQ:</span>
                  <span className="font-semibold">{product.moq}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Price:</span>
                  <span className="font-semibold">${(product.min_price ?? 0).toFixed(2)} - ${(product.max_price ?? 0).toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Lead Time:</span>
                  <span className="font-semibold">{product.lead_time_days} days</span>
                </div>
                <Badge variant={product.is_active ? 'default' : 'secondary'}>
                  {product.is_active ? 'Available' : 'Unavailable'}
                </Badge>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(product)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="sm" className="flex-1" onClick={() => handleDelete(product.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
