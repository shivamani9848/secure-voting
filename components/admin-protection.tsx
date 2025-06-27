"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAdmin } from "@/contexts/admin-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export function AdminProtection({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage()
  const { isAdminLoggedIn } = useAdmin()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check admin authentication status
    const checkAuth = () => {
      if (!isAdminLoggedIn) {
        router.push("/admin/login")
      } else {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [isAdminLoggedIn, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            <Card className="border-red-200 bg-red-50 dark:bg-red-900/20">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-red-700 dark:text-red-400">Access Denied</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-gray-700 dark:text-gray-300">
                  You need administrator privileges to access this page.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/admin/login">
                    <Button className="bg-blue-600 hover:bg-blue-700">Admin Login</Button>
                  </Link>
                  <Link href="/">
                    <Button variant="outline" className="bg-white text-gray-900 border-gray-300">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      {t("common.back")}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
