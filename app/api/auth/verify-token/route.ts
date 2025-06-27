import { type NextRequest, NextResponse } from "next/server"
import { CryptoService } from "@/lib/crypto"
import { DatabaseService } from "@/lib/database"

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production"

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          success: false,
          error: "No token provided",
        },
        { status: 401 },
      )
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix

    // Verify token signature and expiration
    let payload
    try {
      payload = CryptoService.verifyJWT(token, JWT_SECRET)
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid token",
        },
        { status: 401 },
      )
    }

    // Check if session exists and is valid
    const session = await DatabaseService.getValidSession(token)
    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error: "Session expired or invalid",
        },
        { status: 401 },
      )
    }

    // Get current user data
    const user = await DatabaseService.getUserById(payload.userId)
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: {
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
        tokenValid: true,
      },
    })
  } catch (error) {
    console.error("Token verification error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}
