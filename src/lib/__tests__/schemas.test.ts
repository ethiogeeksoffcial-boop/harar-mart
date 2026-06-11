import { describe, it, expect } from 'vitest'
import { productSchema, checkoutSchema } from '../schemas'

describe('productSchema', () => {
  it('rejects when max_price < min_price', () => {
    const result = productSchema.safeParse({
      name: 'Test Product',
      description: 'A long description here that meets the minimum length',
      min_price: 100,
      max_price: 50,
      moq: 1,
      category_id: 'cat-1',
    })
    expect(result.success).toBe(false)
  })

  it('passes valid product data', () => {
    const result = productSchema.safeParse({
      name: 'Teff Flour',
      description: 'Organic teff flour from Harar region',
      min_price: 10,
      max_price: 20,
      moq: 50,
      category_id: 'cat-1',
    })
    expect(result.success).toBe(true)
  })

  it('rejects empty name', () => {
    const result = productSchema.safeParse({
      name: 'A',
      description: 'A long description here that meets the minimum length',
      min_price: 10,
      max_price: 20,
      moq: 1,
      category_id: 'cat-1',
    })
    expect(result.success).toBe(false)
  })
})

describe('checkoutSchema', () => {
  it('rejects short phone numbers', () => {
    const result = checkoutSchema.safeParse({
      shipping_address: '123 Main St, Addis Ababa, Ethiopia',
      phone: '123',
    })
    expect(result.success).toBe(false)
  })

  it('passes valid checkout data', () => {
    const result = checkoutSchema.safeParse({
      shipping_address: '123 Main St, Addis Ababa, Ethiopia',
      phone: '+251911234567',
    })
    expect(result.success).toBe(true)
  })
})
