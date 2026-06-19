import { useState, useCallback } from 'react'
import { uploadImage } from '@/services/upload'
import { handleError } from '@/lib/errors'

interface Props {
  bucket: 'product-images' | 'house-images'
  onUpload: (url: string) => void
}

export function ImageUpload({ bucket, onUpload }: Props) {
  const [uploading, setUploading] = useState(false)

  const upload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const url = await uploadImage(file, bucket)
      onUpload(url)
    } catch (err) {
      handleError(err, 'Upload failed')
    } finally {
      setUploading(false)
    }
  }, [bucket, onUpload])

  return (
    <label className="cursor-pointer inline-flex items-center gap-2 border rounded px-3 py-2 text-sm hover:bg-muted transition-colors">
      {uploading ? 'Uploading…' : 'Upload image'}
      <input type="file" accept="image/*" className="hidden" onChange={upload} disabled={uploading} />
    </label>
  )
}
