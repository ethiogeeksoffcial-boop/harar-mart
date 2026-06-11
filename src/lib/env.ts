const required = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'] as const

for (const key of required) {
  if (!import.meta.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
}

export const env = {
  supabaseUrl:     import.meta.env.VITE_SUPABASE_URL as string,
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY as string,
  deliveryFee:     Number(import.meta.env.VITE_DELIVERY_FEE ?? 5),
  supportPhone:    import.meta.env.VITE_SUPPORT_PHONE ?? '+251919054807',
}
