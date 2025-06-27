import type { NextRequest } from "next/server"
import { CryptoService } from "@/lib/crypto"
import { DatabaseService } from "@/lib/database"

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production"

export interface AuthenticatedUser {
  id: string
  voterID: string
  email: string
  mobile: string
  state: string
  constituency: string
  isVerified: boolean
  hasVoted: boolean
}

export async function authenticateRequest(request: NextRequest): Promise<{
  success: boolean
  user?: AuthenticatedUser
  error?: string
}> {
  try {
    const authHeader = request.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return { success: false, error: "No token provided" }
    }

    const token = authHeader.substring(7)

    // Verify JWT token
    let payload
    try {
      payload = CryptoService.verifyJWT(token, JWT_SECRET)
    } catch (error) {
      return { success: false, error: "Invalid token" }
    }

    // Check session validity
    const session = await DatabaseService.getValidSession(token)
    if (!session) {
      return { success: false, error: "Session expired" }
    }

    // Get user data
    const user = await DatabaseService.getUserById(payload.userId)
    if (!user) {
      return { success: false, error: "User not found" }
    }

    if (!user.is_verified) {
      return { success: false, error: "User not verified" }
    }

    return {
      success: true,
      user: {
        id: user.id,
        voterID: user.voter_id,
        email: user.email,
        mobile: user.mobile,
        state: user.state,
        constituency: user.constituency,
        isVerified: user.is_verified,
        hasVoted: user.has_voted,
      },
    }
  } catch (error) {
    console.error("Authentication error:", error)
    return { success: false, error: "Authentication failed" }
  }
}
