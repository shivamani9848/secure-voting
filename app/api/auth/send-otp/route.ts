import { type NextRequest, NextResponse } from "next/server"
import { CryptoService } from "@/lib/crypto"
import { DatabaseService } from "@/lib/database"
import { SMSService } from "@/lib/sms-service"
import { ValidationService } from "@/lib/validation"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { mobile, type = "login" } = body // type: 'login' | 'verification'

    // Validate mobile number
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

    const normalizedMobile = ValidationService.normalizeMobile(mobile)

    // Check if user exists for login OTP
    if (type === "login") {
      const user = await DatabaseService.getUserByMobile(normalizedMobile)
      if (!user) {
        return NextResponse.json(
          {
            success: false,
            error: "No account found with this mobile number",
          },
          { status: 404 },
        )
      }
    }

    // Rate limiting: Check if OTP was sent recently
    const recentOTPs = await DatabaseService.getRecentOTPs(normalizedMobile, 2) // Last 2 minutes
    if (recentOTPs.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "OTP already sent. Please wait 2 minutes before requesting again.",
        },
        { status: 429 },
      )
    }

    // Generate and store OTP
    const otp = CryptoService.generateOTP(6)
    await DatabaseService.createOTP(normalizedMobile, otp, 10) // 10 minutes expiry

    // Send OTP via SMS
    const smsResult = await SMSService.sendOTP(normalizedMobile, otp)

    if (!smsResult.success) {
      console.error("Failed to send OTP:", smsResult.error)
      return NextResponse.json(
        {
          success: false,
          error: "Failed to send OTP. Please try again.",
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
      data: {
        mobile: normalizedMobile,
        messageId: smsResult.messageId,
        expiresIn: 600, // 10 minutes in seconds
      },
    })
  } catch (error) {
    console.error("Send OTP error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}

// Define the OTPRecord type
interface OTPRecord {
  mobile: string
  otp: string
  createdAt: Date
}

// Add this method to DatabaseService
declare module "@/lib/database" {
  namespace DatabaseService {
    function getRecentOTPs(mobile: string, minutesAgo: number): Promise<OTPRecord[]>
  }
}
