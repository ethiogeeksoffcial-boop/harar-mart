import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Upload, X } from 'lucide-react'
import { uploadImages } from '@/services/upload'

interface ProductImageUploadProps {
  images: string[]
  onImagesChange: (urls: string[]) => void
}

export default function ProductImageUpload({ images, onImagesChange }: ProductImageUploadProps) {
  const [uploading, setUploading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    try {
      const urls = await uploadImages(Array.from(files), 'product-images')
      onImagesChange([...images, ...urls])
    } catch (err) {
      console.error('Upload failed:', err)
      alert('Upload failed: ' + (err instanceof Error ? err.message : 'Unknown error'))
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const handleRemove = (idx: number) => {
    onImagesChange(images.filter((_, i) => i !== idx))
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {images.map((url, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={url}
                    alt={`Product ${idx + 1}`}
                    className="w-full h-24 object-cover rounded border"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleRemove(idx)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          {images.length === 0 && (
            <div className="border-2 border-dashed rounded-lg h-48 flex items-center justify-center bg-muted">
              <div className="text-center">
                <Upload className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  No images selected
                </p>
              </div>
            </div>
          )}
          <div>
            <input
              type="file"
              id="admin-image-upload"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
              disabled={uploading}
            />
            <label htmlFor="admin-image-upload">
              <Button variant="outline" className="w-full" asChild>
                <span>{uploading ? 'Uploading...' : 'Upload Images'}</span>
              </Button>
            </label>
            <p className="text-xs text-muted-foreground mt-1">Select multiple images at once</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
