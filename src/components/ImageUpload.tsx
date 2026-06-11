import { useState, useCallback } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { handleError } from '@/lib/errors'

interface Props {
  bucket: string
  onUpload: (url: string) => void
}

export function ImageUpload({ bucket, onUpload }: Props) {
  const [uploading, setUploading] = useState(false)

  const upload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const ext  = file.name.split('.').pop()
      const path = `${crypto.randomUUID()}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(path, file, { upsert: false })

      if (uploadError) throw uploadError

      const { data } = supabase.storage.from(bucket).getPublicUrl(path)
      onUpload(data.publicUrl)
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
