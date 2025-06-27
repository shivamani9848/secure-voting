export class ValidationService {
  // Validate Indian Voter ID format
  static validateVoterID(voterID: string): { isValid: boolean; error?: string } {
    if (!voterID) {
      return { isValid: false, error: "Voter ID is required" }
    }

    // Remove spaces and convert to uppercase
    const cleanVoterID = voterID.replace(/\s/g, "").toUpperCase()

    // Indian Voter ID format: 3 letters + 7 digits (e.g., ABC1234567)
    const voterIDPattern = /^[A-Z]{3}[0-9]{7}$/

    if (!voterIDPattern.test(cleanVoterID)) {
      return {
        isValid: false,
        error: "Invalid Voter ID format. Should be 3 letters followed by 7 digits (e.g., ABC1234567)",
      }
    }

    return { isValid: true }
  }

  // Validate Indian mobile number
  static validateMobile(mobile: string): { isValid: boolean; error?: string } {
    if (!mobile) {
      return { isValid: false, error: "Mobile number is required" }
    }

    // Remove all non-digit characters except +
    const cleanMobile = mobile.replace(/[^\d+]/g, "")

    // Check for Indian mobile number patterns
    const patterns = [
      /^\+91[6-9]\d{9}$/, // +91 followed by 10 digits starting with 6-9
      /^91[6-9]\d{9}$/, // 91 followed by 10 digits starting with 6-9
      /^[6-9]\d{9}$/, // 10 digits starting with 6-9
    ]

    const isValid = patterns.some((pattern) => pattern.test(cleanMobile))

    if (!isValid) {
      return {
        isValid: false,
        error: "Invalid mobile number. Should be a valid Indian mobile number",
      }
    }

    return { isValid: true }
  }

  // Validate email format
  static validateEmail(email: string): { isValid: boolean; error?: string } {
    if (!email) {
      return { isValid: false, error: "Email is required" }
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailPattern.test(email)) {
      return { isValid: false, error: "Invalid email format" }
    }

    return { isValid: true }
  }

  // Validate password strength
  static validatePassword(password: string): { isValid: boolean; error?: string } {
    if (!password) {
      return { isValid: false, error: "Password is required" }
    }

    if (password.length < 8) {
      return { isValid: false, error: "Password must be at least 8 characters long" }
    }

    if (password.length > 128) {
      return { isValid: false, error: "Password must be less than 128 characters" }
    }

    // Check for at least one uppercase, one lowercase, one digit, and one special character
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasDigit = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)

    if (!hasUppercase || !hasLowercase || !hasDigit || !hasSpecialChar) {
      return {
        isValid: false,
        error:
          "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
      }
    }

    return { isValid: true }
  }

  // Validate OTP format
  static validateOTP(otp: string): { isValid: boolean; error?: string } {
    if (!otp) {
      return { isValid: false, error: "OTP is required" }
    }

    const cleanOTP = otp.replace(/\s/g, "")

    if (!/^\d{6}$/.test(cleanOTP)) {
      return { isValid: false, error: "OTP must be 6 digits" }
    }

    return { isValid: true }
  }

  // Validate Indian state
  static validateState(state: string): { isValid: boolean; error?: string } {
    if (!state) {
      return { isValid: false, error: "State is required" }
    }

    const indianStates = [
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal",
      "Andaman and Nicobar Islands",
      "Chandigarh",
      "Dadra and Nagar Haveli and Daman and Diu",
      "Delhi",
      "Jammu and Kashmir",
      "Ladakh",
      "Lakshadweep",
      "Puducherry",
    ]

    if (!indianStates.includes(state)) {
      return { isValid: false, error: "Invalid state name" }
    }

    return { isValid: true }
  }

  // Normalize mobile number to standard format
  static normalizeMobile(mobile: string): string {
    const cleanMobile = mobile.replace(/[^\d+]/g, "")

    if (cleanMobile.startsWith("+91")) {
      return cleanMobile
    } else if (cleanMobile.startsWith("91") && cleanMobile.length === 12) {
      return "+" + cleanMobile
    } else if (cleanMobile.length === 10) {
      return "+91" + cleanMobile
    }

    return cleanMobile
  }

  // Normalize Voter ID to standard format
  static normalizeVoterID(voterID: string): string {
    return voterID.replace(/\s/g, "").toUpperCase()
  }
}
