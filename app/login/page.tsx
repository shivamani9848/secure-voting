"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, CreditCard, Mail, Phone } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import { useLanguage } from "@/contexts/language-context"

export default function LoginPage() {
  const { t } = useLanguage()
  const [loginData, setLoginData] = useState({
    voterID: "",
    email: "",
    password: "",
    mobile: "",
    otp: "",
  })
  const [showOTP, setShowOTP] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would integrate with your backend authentication
    console.log("Login data:", loginData)
    router.push("/dashboard")
  }

  const requestOTP = async () => {
    // Here you would call your OTP service
    console.log("Requesting OTP for:", loginData.mobile)
    setShowOTP(true)
  }

  return (
    <div className="min-h-screen bg-gradient-primary">
      {/* Header */}
      <header className="border-b header-backdrop">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <ArrowLeft className="h-5 w-5" />
            <span>{t("common.back")}</span>
          </Link>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{t("login.title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="voter-id" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="voter-id">{t("login.voterid.tab")}</TabsTrigger>
                  <TabsTrigger value="email">{t("login.email.tab")}</TabsTrigger>
                </TabsList>

                <TabsContent value="voter-id">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="voterID">{t("register.voterid")}</Label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="voterID"
                          placeholder={t("register.voterid.placeholder")}
                          value={loginData.voterID}
                          onChange={(e) => setLoginData({ ...loginData, voterID: e.target.value })}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mobile-voter">{t("login.mobile")}</Label>
                      <div className="flex space-x-2">
                        <div className="relative flex-1">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="mobile-voter"
                            placeholder={t("register.mobile.placeholder")}
                            value={loginData.mobile}
                            onChange={(e) => setLoginData({ ...loginData, mobile: e.target.value })}
                            className="pl-10"
                            required
                          />
                        </div>
                        <Button type="button" onClick={requestOTP} variant="outline" className="btn-outline">
                          {t("login.otp.button")}
                        </Button>
                      </div>
                    </div>

                    {showOTP && (
                      <div className="space-y-2">
                        <Label htmlFor="otp">{t("login.otp")}</Label>
                        <Input
                          id="otp"
                          placeholder={t("login.otp.placeholder")}
                          value={loginData.otp}
                          onChange={(e) => setLoginData({ ...loginData, otp: e.target.value })}
                          maxLength={6}
                          required
                        />
                      </div>
                    )}

                    <Button type="submit" className="w-full btn-primary">
                      {t("login.voterid.button")}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="email">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">{t("register.email")}</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder={t("register.email.placeholder")}
                          value={loginData.email}
                          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">{t("register.password")}</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder={t("register.password.placeholder")}
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full btn-primary">
                      {t("login.email.button")}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-4 text-center text-sm">
                <Link href="/register" className="text-orange-600 hover:underline">
                  {t("login.register.link")}
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
