import { type NextRequest, NextResponse } from "next/server"
import { CryptoService } from "@/lib/crypto"
import { DatabaseService } from "@/lib/database"
import { ValidationService } from "@/lib/validation"

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { loginType, voterID, email, mobile, password, otp } = body

    if (!loginType || !["voterID", "email", "mobile"].includes(loginType)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid login type",
        },
        { status: 400 },
      )
    }

    let user = null

    // Find user based on login type
    if (loginType === "voterID") {
      if (!voterID || !password) {
        return NextResponse.json(
          {
            success: false,
            error: "Voter ID and password are required",
          },
          { status: 400 },
        )
      }

      const voterIDValidation = ValidationService.validateVoterID(voterID)
      if (!voterIDValidation.isValid) {
        return NextResponse.json(
          {
            success: false,
            error: voterIDValidation.error,
          },
          { status: 400 },
        )
      }

      const normalizedVoterID = ValidationService.normalizeVoterID(voterID)
      const voterIDHash = CryptoService.hashData(normalizedVoterID)
      user = await DatabaseService.getUserByVoterIdHash(voterIDHash)

      if (!user) {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid Voter ID or password",
          },
          { status: 401 },
        )
      }

      // Verify password
      const isPasswordValid = await CryptoService.verifyPassword(password, user.password_hash)
      if (!isPasswordValid) {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid Voter ID or password",
          },
          { status: 401 },
        )
      }
    } else if (loginType === "email") {
      if (!email || !password) {
        return NextResponse.json(
          {
            success: false,
            error: "Email and password are required",
          },
          { status: 400 },
        )
      }

      const emailValidation = ValidationService.validateEmail(email)
      if (!emailValidation.isValid) {
        return NextResponse.json(
          {
            success: false,
            error: emailValidation.error,
          },
          { status: 400 },
        )
      }

      user = await DatabaseService.getUserByEmail(email.toLowerCase())

      if (!user) {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid email or password",
          },
          { status: 401 },
        )
      }

      // Verify password
      const isPasswordValid = await CryptoService.verifyPassword(password, user.password_hash)
      if (!isPasswordValid) {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid email or password",
          },
          { status: 401 },
        )
      }
    } else if (loginType === "mobile") {
      if (!mobile || !otp) {
        return NextResponse.json(
          {
            success: false,
            error: "Mobile number and OTP are required",
          },
          { status: 400 },
        )
      }

      const mobileValidation = ValidationService.validateMobile(mobile)
      if (!mobileValidation.isValid) {
        return NextResponse.json(
          {
            success: false,
            error: mobileValidation.error,
          },
          { status: 400 },
        )
      }

      const otpValidation = ValidationService.validateOTP(otp)
      if (!otpValidation.isValid) {
        return NextResponse.json(
          {
            success: false,
            error: otpValidation.error,
          },
          { status: 400 },
        )
      }

      const normalizedMobile = ValidationService.normalizeMobile(mobile)

      // Verify OTP
      const otpRecord = await DatabaseService.getValidOTP(normalizedMobile, otp)
      if (!otpRecord) {
        await DatabaseService.incrementOTPAttempts(normalizedMobile, otp)
        return NextResponse.json(
          {
            success: false,
            error: "Invalid or expired OTP",
          },
          { status: 401 },
        )
      }

      // Mark OTP as used
      await DatabaseService.markOTPAsUsed(otpRecord.id)

      user = await DatabaseService.getUserByMobile(normalizedMobile)
      if (!user) {
        return NextResponse.json(
          {
            success: false,
            error: "User not found",
          },
          { status: 404 },
        )
      }
    }

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Authentication failed",
        },
        { status: 401 },
      )
    }

    // Check if user is verified
    if (!user.is_verified) {
      return NextResponse.json(
        {
          success: false,
          error: "Please verify your mobile number before logging in",
          requiresVerification: true,
          mobile: user.mobile,
        },
        { status: 403 },
      )
    }

    // Generate JWT token
    const tokenPayload = {
      userId: user.id,
      voterID: user.voter_id,
      email: user.email,
      mobile: user.mobile,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
    }

    const token = CryptoService.generateJWT(tokenPayload, JWT_SECRET)

    // Create session
    await DatabaseService.createSession(user.id, token, 24) // 24 hours

    // Clean up expired records
    await DatabaseService.cleanupExpiredRecords()

    return NextResponse.json({
      success: true,
      message: "Login successful",
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
        token,
        expiresIn: 86400, // 24 hours in seconds
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}
