// Vercel serverless function: proxy image uploads to Supabase Storage.
// Uses the service role key server-side so clients don't need storage RLS INSERT.

import { createClient } from '@supabase/supabase-js'
import { randomUUID } from 'crypto'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '6mb',
    },
  },
}

const ALLOWED_BUCKETS = ['product-images', 'house-images']
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'image/webp']
const MAX_SIZE = 5 * 1024 * 1024 // 5 MB

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    // Verify the user is authenticated by checking their JWT
    const authHeader = req.headers.authorization || ''
    const token = authHeader.replace('Bearer ', '')
    if (!token) return res.status(401).json({ error: 'Missing authorization token' })

    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    const anonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

    if (!supabaseUrl || !serviceKey || !anonKey) {
      return res.status(500).json({ error: 'Server misconfigured' })
    }

    // Verify the user's token is valid
    const anonClient = createClient(supabaseUrl, anonKey)
    const { data: { user }, error: authError } = await anonClient.auth.getUser(token)
    if (authError || !user) {
      return res.status(401).json({ error: 'Invalid token' })
    }

    // Parse the base64 payload
    const { bucket, fileName, contentType, data } = req.body || {}

    if (!bucket || !ALLOWED_BUCKETS.includes(bucket)) {
      return res.status(400).json({ error: 'Invalid bucket' })
    }
    if (!contentType || !ALLOWED_TYPES.includes(contentType)) {
      return res.status(400).json({ error: 'Invalid file type. Allowed: ' + ALLOWED_TYPES.join(', ') })
    }
    if (!data) {
      return res.status(400).json({ error: 'Missing file data' })
    }

    const fileBuffer = Buffer.from(data, 'base64')
    if (fileBuffer.length > MAX_SIZE) {
      return res.status(400).json({ error: 'File too large (max 5 MB)' })
    }

    const ext = (fileName || 'image.png').split('.').pop() || 'png'
    const path = `${randomUUID()}.${ext}`

    // Upload using the service role key (bypasses RLS)
    const adminClient = createClient(supabaseUrl, serviceKey)
    const { error: uploadError } = await adminClient.storage
      .from(bucket)
      .upload(path, fileBuffer, {
        contentType,
        upsert: false,
      })

    if (uploadError) {
      console.error('Storage upload error:', uploadError)
      return res.status(502).json({ error: 'Upload failed', detail: uploadError.message })
    }

    const { data: urlData } = adminClient.storage.from(bucket).getPublicUrl(path)

    return res.status(200).json({
      url: urlData.publicUrl,
      path,
      bucket,
    })
  } catch (err) {
    console.error('Upload handler error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
