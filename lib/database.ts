export interface User {
  id: string
  voter_id: string
  voter_id_hash: string
  email: string
  mobile: string
  password_hash: string
  state: string
  constituency: string
  is_verified: boolean
  has_voted: boolean
  created_at: Date
  updated_at: Date
}

export interface OTPRecord {
  id: string
  mobile: string
  otp: string
  expires_at: Date
  is_used: boolean
  attempts: number
  created_at: Date
}

export interface Session {
  id: string
  user_id: string
  token: string
  expires_at: Date
  created_at: Date
}

export class DatabaseService {
  private static users: Map<string, User> = new Map()
  private static otpRecords: Map<string, OTPRecord> = new Map()
  private static sessions: Map<string, Session> = new Map()
  private static voterIdIndex: Map<string, string> = new Map() // hash -> user_id
  private static mobileIndex: Map<string, string> = new Map() // mobile -> user_id

  // User operations
  static async createUser(userData: Omit<User, "id" | "created_at" | "updated_at">): Promise<User> {
    const id = crypto.randomUUID()
    const now = new Date()

    const user: User = {
      ...userData,
      id,
      created_at: now,
      updated_at: now,
    }

    this.users.set(id, user)
    this.voterIdIndex.set(userData.voter_id_hash, id)
    this.mobileIndex.set(userData.mobile, id)

    return user
  }

  static async getUserById(id: string): Promise<User | null> {
    return this.users.get(id) || null
  }

  static async getUserByVoterIdHash(voterIdHash: string): Promise<User | null> {
    const userId = this.voterIdIndex.get(voterIdHash)
    return userId ? this.users.get(userId) || null : null
  }

  static async getUserByMobile(mobile: string): Promise<User | null> {
    const userId = this.mobileIndex.get(mobile)
    return userId ? this.users.get(userId) || null : null
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    for (const user of this.users.values()) {
      if (user.email === email) {
        return user
      }
    }
    return null
  }

  static async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    const user = this.users.get(id)
    if (!user) return null

    const updatedUser = {
      ...user,
      ...updates,
      updated_at: new Date(),
    }

    this.users.set(id, updatedUser)
    return updatedUser
  }

  // OTP operations
  static async createOTP(mobile: string, otp: string, expiresInMinutes = 10): Promise<OTPRecord> {
    const id = crypto.randomUUID()
    const now = new Date()
    const expiresAt = new Date(now.getTime() + expiresInMinutes * 60 * 1000)

    const otpRecord: OTPRecord = {
      id,
      mobile,
      otp,
      expires_at: expiresAt,
      is_used: false,
      attempts: 0,
      created_at: now,
    }

    this.otpRecords.set(id, otpRecord)
    return otpRecord
  }

  static async getValidOTP(mobile: string, otp: string): Promise<OTPRecord | null> {
    const now = new Date()

    for (const record of this.otpRecords.values()) {
      if (
        record.mobile === mobile &&
        record.otp === otp &&
        !record.is_used &&
        record.expires_at > now &&
        record.attempts < 3
      ) {
        return record
      }
    }

    return null
  }

  static async markOTPAsUsed(id: string): Promise<void> {
    const record = this.otpRecords.get(id)
    if (record) {
      record.is_used = true
      this.otpRecords.set(id, record)
    }
  }

  static async incrementOTPAttempts(mobile: string, otp: string): Promise<void> {
    for (const [id, record] of this.otpRecords.entries()) {
      if (record.mobile === mobile && record.otp === otp) {
        record.attempts += 1
        this.otpRecords.set(id, record)
        break
      }
    }
  }

  // Session operations
  static async createSession(userId: string, token: string, expiresInHours = 24): Promise<Session> {
    const id = crypto.randomUUID()
    const now = new Date()
    const expiresAt = new Date(now.getTime() + expiresInHours * 60 * 60 * 1000)

    const session: Session = {
      id,
      user_id: userId,
      token,
      expires_at: expiresAt,
      created_at: now,
    }

    this.sessions.set(id, session)
    return session
  }

  static async getValidSession(token: string): Promise<Session | null> {
    const now = new Date()

    for (const session of this.sessions.values()) {
      if (session.token === token && session.expires_at > now) {
        return session
      }
    }

    return null
  }

  static async deleteSession(token: string): Promise<void> {
    for (const [id, session] of this.sessions.entries()) {
      if (session.token === token) {
        this.sessions.delete(id)
        break
      }
    }
  }

  // Cleanup expired records
  static async cleanupExpiredRecords(): Promise<void> {
    const now = new Date()

    // Cleanup expired OTPs
    for (const [id, record] of this.otpRecords.entries()) {
      if (record.expires_at <= now) {
        this.otpRecords.delete(id)
      }
    }

    // Cleanup expired sessions
    for (const [id, session] of this.sessions.entries()) {
      if (session.expires_at <= now) {
        this.sessions.delete(id)
      }
    }
  }
}
