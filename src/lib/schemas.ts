import { z } from 'zod'

export const productSchema = z.object({
  name:        z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(10, 'Add a description (min 10 chars)'),
  min_price:   z.coerce.number().positive('Price must be positive'),
  max_price:   z.coerce.number().positive('Price must be positive'),
  moq:         z.coerce.number().int().min(1, 'MOQ must be at least 1'),
  category_id: z.string().min(1, 'Select a category'),
  hs_code:     z.string().optional(),
}).refine(d => d.max_price >= d.min_price, {
  message: 'Max price must be ≥ min price',
  path: ['max_price'],
})

export const inquirySchema = z.object({
  message:  z.string().min(10, 'Message must be at least 10 characters'),
  quantity: z.coerce.number().int().min(1, 'Quantity must be at least 1'),
})

export const checkoutSchema = z.object({
  shipping_address: z.string().min(10, 'Enter your full shipping address'),
  phone:            z.string().min(9, 'Enter a valid phone number'),
  notes:            z.string().optional(),
})

export type ProductFormData  = z.infer<typeof productSchema>
export type InquiryFormData  = z.infer<typeof inquirySchema>
export type CheckoutFormData = z.infer<typeof checkoutSchema>
