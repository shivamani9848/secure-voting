import { type NextRequest, NextResponse } from "next/server"
import { CryptoService } from "@/lib/crypto"
import { DatabaseService } from "@/lib/database"
import { SMSService } from "@/lib/sms-service"
import { ValidationService } from "@/lib/validation"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { voterID, email, password, mobile, state, constituency, fullName } = body

    // Validate all inputs
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

    const passwordValidation = ValidationService.validatePassword(password)
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        {
          success: false,
          error: passwordValidation.error,
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

    const stateValidation = ValidationService.validateState(state)
    if (!stateValidation.isValid) {
      return NextResponse.json(
        {
          success: false,
          error: stateValidation.error,
        },
        { status: 400 },
      )
    }

    if (!constituency || constituency.trim().length < 2) {
      return NextResponse.json(
        {
          success: false,
          error: "Constituency is required and must be at least 2 characters",
        },
        { status: 400 },
      )
    }

    if (!fullName || fullName.trim().length < 2) {
      return NextResponse.json(
        {
          success: false,
          error: "Full name is required and must be at least 2 characters",
        },
        { status: 400 },
      )
    }

    // Normalize inputs
    const normalizedVoterID = ValidationService.normalizeVoterID(voterID)
    const normalizedMobile = ValidationService.normalizeMobile(mobile)
    const voterIDHash = CryptoService.hashData(normalizedVoterID)

    // Check if user already exists
    const existingUserByVoterID = await DatabaseService.getUserByVoterIdHash(voterIDHash)
    if (existingUserByVoterID) {
      return NextResponse.json(
        {
          success: false,
          error: "A user with this Voter ID already exists",
        },
        { status: 409 },
      )
    }

    const existingUserByEmail = await DatabaseService.getUserByEmail(email.toLowerCase())
    if (existingUserByEmail) {
      return NextResponse.json(
        {
          success: false,
          error: "A user with this email already exists",
        },
        { status: 409 },
      )
    }

    const existingUserByMobile = await DatabaseService.getUserByMobile(normalizedMobile)
    if (existingUserByMobile) {
      return NextResponse.json(
        {
          success: false,
          error: "A user with this mobile number already exists",
        },
        { status: 409 },
      )
    }

    // Hash password
    const passwordHash = await CryptoService.hashPassword(password)

    // Create user
    const user = await DatabaseService.createUser({
      voter_id: normalizedVoterID,
      voter_id_hash: voterIDHash,
      email: email.toLowerCase(),
      mobile: normalizedMobile,
      password_hash: passwordHash,
      state: state.trim(),
      constituency: constituency.trim(),
      is_verified: false,
      has_voted: false,
    })

    // Generate and send OTP for mobile verification
    const otp = CryptoService.generateOTP(6)
    await DatabaseService.createOTP(normalizedMobile, otp, 10) // 10 minutes expiry

    const smsResult = await SMSService.sendOTP(normalizedMobile, otp)

    if (!smsResult.success) {
      console.error("Failed to send OTP:", smsResult.error)
      // Don't fail registration if SMS fails, user can request OTP later
    }

    // Send welcome SMS
    await SMSService.sendWelcomeSMS(normalizedMobile, fullName)

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful. Please verify your mobile number with the OTP sent.",
        data: {
          userId: user.id,
          voterID: user.voter_id,
          email: user.email,
          mobile: user.mobile,
          isVerified: user.is_verified,
          otpSent: smsResult.success,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}
