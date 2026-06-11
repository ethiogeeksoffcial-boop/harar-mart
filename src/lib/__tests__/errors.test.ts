import { describe, it, expect, vi } from 'vitest'
import { handleError } from '../errors'

// Mock the toast hook
vi.mock('@/hooks/use-toast', () => ({
  toast: vi.fn(),
}))

// Import the mocked module
import { toast } from '@/hooks/use-toast'

describe('handleError', () => {
  it('extracts message from Error objects', () => {
    handleError(new Error('Something broke'))
    expect(toast).toHaveBeenCalledWith(
      expect.objectContaining({ description: 'Something broke', variant: 'destructive' })
    )
  })

  it('uses string directly', () => {
    handleError('Custom error message')
    expect(toast).toHaveBeenCalledWith(
      expect.objectContaining({ description: 'Custom error message' })
    )
  })

  it('uses fallback for non-Error values', () => {
    handleError(null, 'Default message')
    expect(toast).toHaveBeenCalledWith(
      expect.objectContaining({ description: 'Default message' })
    )
  })
})
