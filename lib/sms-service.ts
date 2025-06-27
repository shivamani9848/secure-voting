export interface SMSResponse {
  success: boolean
  messageId?: string
  error?: string
}

export class SMSService {
  private static readonly SMS_API_URL = process.env.SMS_API_URL || "https://api.textlocal.in/send/"
  private static readonly SMS_API_KEY = process.env.SMS_API_KEY || "demo-key"
  private static readonly SMS_SENDER = process.env.SMS_SENDER || "SECURE"

  static async sendOTP(mobile: string, otp: string): Promise<SMSResponse> {
    try {
      // In development, just log the OTP
      if (process.env.NODE_ENV === "development") {
        console.log(
          `📱 SMS to ${mobile}: Your SecureVoting OTP is ${otp}. Valid for 10 minutes. Do not share this code.`,
        )
        return {
          success: true,
          messageId: `dev-${Date.now()}`,
        }
      }

      // Format mobile number (remove +91 if present, ensure 10 digits)
      const formattedMobile = mobile.replace(/^\+91/, "").replace(/\D/g, "")

      if (formattedMobile.length !== 10) {
        return {
          success: false,
          error: "Invalid mobile number format",
        }
      }

      const message = `Your SecureVoting OTP is ${otp}. Valid for 10 minutes. Do not share this code. - SecureVoting Team`

      const params = new URLSearchParams({
        apikey: this.SMS_API_KEY,
        numbers: formattedMobile,
        message: message,
        sender: this.SMS_SENDER,
      })

      const response = await fetch(this.SMS_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      })

      const data = await response.json()

      if (data.status === "success") {
        return {
          success: true,
          messageId: data.batch_id,
        }
      } else {
        return {
          success: false,
          error: data.errors?.[0]?.message || "Failed to send SMS",
        }
      }
    } catch (error) {
      console.error("SMS sending error:", error)
      return {
        success: false,
        error: "SMS service unavailable",
      }
    }
  }

  static async sendWelcomeSMS(mobile: string, voterName: string): Promise<SMSResponse> {
    try {
      const message = `Welcome to SecureVoting, ${voterName}! Your account has been successfully created. You can now participate in secure digital voting. - SecureVoting Team`

      if (process.env.NODE_ENV === "development") {
        console.log(`📱 Welcome SMS to ${mobile}: ${message}`)
        return { success: true, messageId: `dev-welcome-${Date.now()}` }
      }

      const formattedMobile = mobile.replace(/^\+91/, "").replace(/\D/g, "")

      const params = new URLSearchParams({
        apikey: this.SMS_API_KEY,
        numbers: formattedMobile,
        message: message,
        sender: this.SMS_SENDER,
      })

      const response = await fetch(this.SMS_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      })

      const data = await response.json()
      return data.status === "success"
        ? { success: true, messageId: data.batch_id }
        : { success: false, error: data.errors?.[0]?.message || "Failed to send SMS" }
    } catch (error) {
      console.error("Welcome SMS error:", error)
      return { success: false, error: "SMS service unavailable" }
    }
  }
}
