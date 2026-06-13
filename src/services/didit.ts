/**
 * Didit KYC Verification Service
 *
 * Didit offers 500 free KYC verifications every month, forever — no credit card required.
 * Full KYC bundle (ID verification + passive liveness + face match + IP analysis) costs $0.33/verification above free tier.
 * Supports Ethiopian documents: Kebele ID, Fayda digital ID, and Passport in a single session.
 *
 * Docs: https://docs.didit.me/
 */

const DIDIT_API_BASE = 'https://api.didit.me/v1'
const DIDIT_API_KEY = import.meta.env.VITE_DIDIT_API_KEY

export interface DiditSession {
  session_id: string
  url: string
  status: 'pending' | 'completed' | 'approved' | 'declined' | 'expired'
  created_at: string
}

export interface DiditVerificationResult {
  session_id: string
  status: 'approved' | 'declined' | 'pending' | 'expired'
  vendor_data?: {
    first_name?: string
    last_name?: string
    document_type?: string
    document_number?: string
    country?: string
    date_of_birth?: string
    expiry_date?: string
  }
  risk_data?: {
    ip_risk_score?: number
    device_risk_score?: number
  }
}

/**
 * Create a new KYC verification session for a seller.
 * The returned URL is used to open the Didit verification widget.
 */
export async function createVerificationSession(
  userId: string,
  customerEmail: string,
  customerName: string,
  redirectUrl?: string
): Promise<DiditSession> {
  if (!DIDIT_API_KEY) {
    throw new Error('Didit API key is not configured. Please set VITE_DIDIT_API_KEY in your .env file.')
  }

  const response = await fetch(`${DIDIT_API_BASE}/session/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DIDIT_API_KEY}`,
    },
    body: JSON.stringify({
      customer: {
        id: userId,
        email: customerEmail,
        name: customerName,
      },
      configuration: {
        // Support Ethiopian documents: Kebele ID, Fayda digital ID, Passport
        document_types: ['passport', 'national_id', 'drivers_license'],
        // Enable passive liveness check
        liveness_check: true,
        // Enable face match between selfie and document photo
        face_match: true,
        // Enable IP analysis for fraud detection
        ip_analysis: true,
      },
      callback_url: redirectUrl || `${window.location.origin}/seller/profile`,
      // Expire session after 30 minutes
      expires_in_minutes: 30,
    }),
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(`Didit API error (${response.status}): ${errorBody}`)
  }

  const data = await response.json()
  return {
    session_id: data.session_id,
    url: data.url,
    status: data.status || 'pending',
    created_at: data.created_at || new Date().toISOString(),
  }
}

/**
 * Get the status and details of a verification session.
 */
export async function getVerificationStatus(
  sessionId: string
): Promise<DiditVerificationResult> {
  if (!DIDIT_API_KEY) {
    throw new Error('Didit API key is not configured.')
  }

  const response = await fetch(`${DIDIT_API_BASE}/session/${sessionId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${DIDIT_API_KEY}`,
    },
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(`Didit API error (${response.status}): ${errorBody}`)
  }

  const data = await response.json()
  return {
    session_id: data.session_id,
    status: data.status,
    vendor_data: data.vendor_data,
    risk_data: data.risk_data,
  }
}

/**
 * Parse the verification result from a webhook callback or redirect query params.
 * Didit sends status updates via webhook or as query params on redirect.
 */
export function parseVerificationCallback(params: URLSearchParams): {
  session_id: string
  status: string
} | null {
  const sessionId = params.get('session_id')
  const status = params.get('status')

  if (sessionId && status) {
    return { session_id: sessionId, status }
  }

  return null
}
