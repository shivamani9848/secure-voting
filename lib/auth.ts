export interface User {
  id: string
  voterID: string
  email: string
  mobile: string
  state: string
  constituency: string
  hasVoted: boolean
}

export interface AuthResponse {
  success: boolean
  user?: User
  token?: string
  message?: string
}

export class AuthService {
  async register(userData: {
    voterID: string
    email: string
    password: string
    mobile: string
    state: string
    constituency: string
  }): Promise<AuthResponse> {
    // In a real implementation, you would:
    // 1. Validate voter ID with Election Commission database
    // 2. Send OTP to mobile number
    // 3. Create user account after OTP verification
    // 4. Store user data securely

    return {
      success: true,
      message: "Registration successful. Please verify your mobile number.",
    }
  }

  async login(credentials: {
    voterID?: string
    email?: string
    password?: string
    mobile?: string
    otp?: string
  }): Promise<AuthResponse> {
    // Mock authentication
    const mockUser: User = {
      id: "1",
      voterID: credentials.voterID || "ABC123456789",
      email: credentials.email || "user@example.com",
      mobile: credentials.mobile || "+91 9876543210",
      state: "Maharashtra",
      constituency: "Mumbai North",
      hasVoted: false,
    }

    return {
      success: true,
      user: mockUser,
      token: "mock-jwt-token",
    }
  }

  async sendOTP(mobile: string): Promise<{ success: boolean; message: string }> {
    // In a real implementation, you would integrate with SMS service
    console.log(`Sending OTP to ${mobile}`)

    return {
      success: true,
      message: "OTP sent successfully",
    }
  }

  async verifyOTP(mobile: string, otp: string): Promise<{ success: boolean; message: string }> {
    // Mock OTP verification
    return {
      success: otp === "123456",
      message: otp === "123456" ? "OTP verified" : "Invalid OTP",
    }
  }
}

export const authService = new AuthService()
