import { type NextRequest, NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database"
import { ValidationService } from "@/lib/validation"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { mobile, otp, type = "verification" } = body // type: 'verification' | 'login'

    // Validate inputs
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

    // Find and validate OTP
    const otpRecord = await DatabaseService.getValidOTP(normalizedMobile, otp)

    if (!otpRecord) {
      // Increment attempts for rate limiting
      await DatabaseService.incrementOTPAttempts(normalizedMobile, otp)

      return NextResponse.json(
        {
          success: false,
          error: "Invalid or expired OTP",
        },
        { status: 400 },
      )
    }

    // Mark OTP as used
    await DatabaseService.markOTPAsUsed(otpRecord.id)

    // Find user
    const user = await DatabaseService.getUserByMobile(normalizedMobile)
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found",
        },
        { status: 404 },
      )
    }

    // Update user verification status if this is a verification OTP
    if (type === "verification" && !user.is_verified) {
      await DatabaseService.updateUser(user.id, { is_verified: true })
    }

    return NextResponse.json({
      success: true,
      message: type === "verification" ? "Mobile number verified successfully" : "OTP verified successfully",
      data: {
        userId: user.id,
        isVerified: type === "verification" ? true : user.is_verified,
        mobile: normalizedMobile,
      },
    })
  } catch (error) {
    console.error("Verify OTP error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}
