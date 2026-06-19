import { supabase } from '@/integrations/supabase/client'

type Bucket = 'product-images' | 'house-images'

interface UploadResult {
  url: string
  path: string
  bucket: string
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      // Strip the data:...;base64, prefix
      resolve(result.split(',')[1])
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

async function uploadViaApi(file: File, bucket: Bucket): Promise<UploadResult> {
  const session = await supabase.auth.getSession()
  const token = session.data.session?.access_token
  if (!token) throw new Error('Not authenticated')

  const data = await fileToBase64(file)

  const res = await fetch('/api/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      bucket,
      fileName: file.name,
      contentType: file.type,
      data,
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(err.error || err.detail || 'Upload failed')
  }

  return res.json()
}

async function uploadDirect(file: File, bucket: Bucket): Promise<UploadResult> {
  const ext = file.name.split('.').pop() || 'png'
  const path = `${crypto.randomUUID()}.${ext}`

  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { upsert: false })

  if (error) throw error

  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return { url: data.publicUrl, path, bucket }
}

export async function uploadImage(file: File, bucket: Bucket): Promise<string> {
  // Try direct upload first (works if RLS policies are in place)
  // Falls back to API endpoint (uses service role key server-side)
  try {
    const result = await uploadDirect(file, bucket)
    return result.url
  } catch {
    const result = await uploadViaApi(file, bucket)
    return result.url
  }
}

export async function uploadImages(files: File[], bucket: Bucket): Promise<string[]> {
  const results = await Promise.all(files.map((f) => uploadImage(f, bucket)))
  return results
}
