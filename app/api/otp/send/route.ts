import { type NextRequest, NextResponse } from "next/server"
import { authService } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { mobile } = body

    if (!mobile) {
      return NextResponse.json({ success: false, message: "Mobile number is required" }, { status: 400 })
    }

    const result = await authService.sendOTP(mobile)
    return NextResponse.json(result)
  } catch (error) {
    console.error("OTP send error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
