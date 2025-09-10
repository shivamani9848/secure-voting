"use client"

import React, { useState } from "react"

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
import { SecureVotingLogo } from "@/components/secure-voting-logo"
import { Confetti } from "@/components/confetti"
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose, DialogFooter } from "@/components/ui/dialog"

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
  const [showInvalidMobileDialog, setShowInvalidMobileDialog] = useState(false)
  const [showInvalidVoterIdDialog, setShowInvalidVoterIdDialog] = useState(false)
  const [generatedOTP, setGeneratedOTP] = useState("")
  const [showMissingOtpDialog, setShowMissingOtpDialog] = useState(false)
  const [showIncorrectOtpDialog, setShowIncorrectOtpDialog] = useState(false)
  const [resendTimer, setResendTimer] = useState(15)
  const [canResend, setCanResend] = useState(false)
  const router = useRouter()

  const isValidVoterId = (voterId: string) => {
    return /^[A-Z]{3}[0-9]{7}$/.test(voterId)
  }

  // OTP resend timer effect
  React.useEffect(() => {
    let timer: NodeJS.Timeout
    if (showOTP && !canResend) {
      setResendTimer(15)
      timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true)
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [showOTP, canResend])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValidVoterId(loginData.voterID)) {
      setShowInvalidVoterIdDialog(true)
      return
    }
    if (showOTP) {
      if (!loginData.otp) {
        setShowMissingOtpDialog(true)
        return
      }
      if (loginData.otp !== generatedOTP) {
        setShowIncorrectOtpDialog(true)
        return
      }
    }
    // Store active voter ID and mobile in localStorage
    localStorage.setItem("activeVoterId", loginData.voterID)
    localStorage.setItem("activeMobile", loginData.mobile)
    // Here you would integrate with your backend authentication
    console.log("Login data:", loginData)
    router.push("/dashboard")
  }

  // Helper function for mobile validation
  const isValidMobile = (mobile: string) => {
    return /^[6-9][0-9]{9}$/.test(mobile)
  }

  const requestOTP = async () => {
    if (!isValidMobile(loginData.mobile)) {
      setShowInvalidMobileDialog(true)
      return
    }
    // Auto-generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    setGeneratedOTP(otp)
    console.log("Generated OTP:", otp)
    setShowOTP(true)
  }

  const resendOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    setGeneratedOTP(otp)
    setCanResend(false)
    setResendTimer(15)
    setLoginData((prev) => ({ ...prev, otp: "" }))
    console.log("Resent OTP:", otp)
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col">
      <Confetti />
      <Dialog open={showInvalidMobileDialog} onOpenChange={setShowInvalidMobileDialog}>
        <DialogContent showCloseButton>
          <DialogTitle>Invalid Mobile Number</DialogTitle>
          <DialogDescription>
            The entered mobile number is invalid. It must start with 6, 7, 8, or 9 and be exactly 10 digits.
          </DialogDescription>
          <DialogClose asChild>
            <Button className="mt-4 w-full" onClick={() => setShowInvalidMobileDialog(false)}>
              OK
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
      <Dialog open={showInvalidVoterIdDialog} onOpenChange={setShowInvalidVoterIdDialog}>
        <DialogContent showCloseButton>
          <DialogTitle>Invalid Voter ID Number</DialogTitle>
          <DialogDescription>
            The entered voter ID number is invalid. It must be 10 characters: first 3 uppercase letters, next 7 digits.
          </DialogDescription>
          <DialogClose asChild>
            <Button className="mt-4 w-full" onClick={() => setShowInvalidVoterIdDialog(false)}>
              OK
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
      <Dialog open={showMissingOtpDialog} onOpenChange={setShowMissingOtpDialog}>
        <DialogContent showCloseButton>
          <DialogTitle>OTP Required</DialogTitle>
          <DialogDescription>
            Please enter the OTP.
          </DialogDescription>
          <DialogClose asChild>
            <Button className="mt-4 w-full" onClick={() => setShowMissingOtpDialog(false)}>
              OK
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
      <Dialog open={showIncorrectOtpDialog} onOpenChange={setShowIncorrectOtpDialog}>
        <DialogContent showCloseButton>
          <DialogTitle>Incorrect OTP</DialogTitle>
          <DialogDescription>
            The entered OTP is incorrect.
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => setShowIncorrectOtpDialog(false)}>
                OK
              </Button>
            </DialogClose>
            <Button onClick={resendOTP} disabled={!canResend} className="ml-2">
              {canResend ? "Resend OTP" : `Resend in ${resendTimer}s`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-10">
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

      <main className="flex-1 flex flex-col justify-center items-center py-12 px-4">
        <div className="flex flex-col items-center mb-8">
          <SecureVotingLogo size="xl" />
          <h1 className="mt-4 text-3xl md:text-4xl font-bold text-orange-600 dark:text-orange-400 text-center drop-shadow-lg">
            {t("login.welcome") || "Welcome Back!"}
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300 text-center max-w-md">
            {t("login.subtitle") || "Sign in securely to access your voting dashboard."}
          </p>
        </div>
        <div className="w-full max-w-md">
          <Card className="shadow-2xl border-orange-200 dark:border-orange-700 animate-fade-in">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl text-gray-900 dark:text-white">
                {t("login.title")}
              </CardTitle>
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
                        {generatedOTP && (
                          <div className="mt-2 text-sm text-green-600 dark:text-green-400 text-center">
                            <span>Demo OTP: <b>{generatedOTP}</b></span>
                          </div>
                        )}
                        <div className="mt-2 text-center">
                          <Button onClick={resendOTP} disabled={!canResend} variant="link" type="button">
                            {canResend ? "Resend OTP" : `Resend in ${resendTimer}s`}
                          </Button>
                        </div>
                      </div>
                    )}

                    <Button type="submit" className="w-full btn-primary" disabled={!showOTP}>
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
      </main>
    </div>
  )
}
