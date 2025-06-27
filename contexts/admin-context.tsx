"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface AdminContextType {
  isAdminLoggedIn: boolean
  adminLogin: (username: string, password: string) => Promise<boolean>
  adminLogout: () => void
  adminUser: AdminUser | null
}

interface AdminUser {
  id: string
  username: string
  role: string
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider")
  }
  return context
}

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)

  useEffect(() => {
    // Check if admin is already logged in
    const adminToken = localStorage.getItem("adminToken")
    const storedAdminUser = localStorage.getItem("adminUser")

    if (adminToken && storedAdminUser) {
      setIsAdminLoggedIn(true)
      setAdminUser(JSON.parse(storedAdminUser))
    }
  }, [])

  const adminLogin = async (username: string, password: string): Promise<boolean> => {
    // Mock admin credentials - in production, this would be a secure API call
    const validCredentials = [
      { username: "admin", password: "admin123", id: "1", role: "Super Admin" },
      { username: "election_admin", password: "election2024", id: "2", role: "Election Admin" },
    ]

    const admin = validCredentials.find((cred) => cred.username === username && cred.password === password)

    if (admin) {
      const adminUser: AdminUser = {
        id: admin.id,
        username: admin.username,
        role: admin.role,
      }

      setIsAdminLoggedIn(true)
      setAdminUser(adminUser)

      // Store in localStorage
      localStorage.setItem("adminToken", "mock-admin-token")
      localStorage.setItem("adminUser", JSON.stringify(adminUser))

      return true
    }

    return false
  }

  const adminLogout = () => {
    setIsAdminLoggedIn(false)
    setAdminUser(null)
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminUser")
  }

  return (
    <AdminContext.Provider value={{ isAdminLoggedIn, adminLogin, adminLogout, adminUser }}>
      {children}
    </AdminContext.Provider>
  )
}
