import bcrypt from "bcryptjs"
import crypto from "crypto"

export class CryptoService {
  // Hash password with bcrypt
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12
    return await bcrypt.hash(password, saltRounds)
  }

  // Verify password against hash
  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash)
  }

  // Generate secure OTP
  static generateOTP(length = 6): string {
    const digits = "0123456789"
    let otp = ""

    for (let i = 0; i < length; i++) {
      const randomIndex = crypto.randomInt(0, digits.length)
      otp += digits[randomIndex]
    }

    return otp
  }

  // Generate secure random token
  static generateToken(length = 32): string {
    return crypto.randomBytes(length).toString("hex")
  }

  // Hash sensitive data (like Voter ID for indexing)
  static hashData(data: string): string {
    return crypto.createHash("sha256").update(data).digest("hex")
  }

  // Generate JWT-like token (simplified)
  static generateJWT(payload: any, secret: string): string {
    const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url")
    const payloadStr = Buffer.from(JSON.stringify(payload)).toString("base64url")
    const signature = crypto.createHmac("sha256", secret).update(`${header}.${payloadStr}`).digest("base64url")

    return `${header}.${payloadStr}.${signature}`
  }

  // Verify JWT-like token
  static verifyJWT(token: string, secret: string): any {
    try {
      const [header, payload, signature] = token.split(".")
      const expectedSignature = crypto.createHmac("sha256", secret).update(`${header}.${payload}`).digest("base64url")

      if (signature !== expectedSignature) {
        throw new Error("Invalid token signature")
      }

      return JSON.parse(Buffer.from(payload, "base64url").toString())
    } catch (error) {
      throw new Error("Invalid token")
    }
  }
}
