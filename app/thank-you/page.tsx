"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Download, Share2, Sparkles, Trophy, Vote } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import { useLanguage } from "@/contexts/language-context"
import { Confetti } from "@/components/confetti"

export default function ThankYouPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [showConfetti, setShowConfetti] = useState(true)
  const [voteData, setVoteData] = useState({
    transactionId: "0x1234567890abcdef1234567890abcdef12345678",
    blockNumber: "#789456",
    timestamp: new Date().toLocaleString(),
    candidateName: "राहुल शर्मा / Rahul Sharma",
  })

  useEffect(() => {
    // Check if user actually voted, if not redirect to dashboard
    const hasVoted = localStorage.getItem("hasVoted")
    if (!hasVoted) {
      router.push("/dashboard")
      return
    }

    // Get vote data from localStorage
    const storedVoteData = localStorage.getItem("voteData")
    if (storedVoteData) {
      setVoteData(JSON.parse(storedVoteData))
    }

    // Stop confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: t("thankyou.title"),
        text: t("thankyou.message"),
        url: window.location.origin,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`${t("thankyou.title")} - ${t("thankyou.message")} ${window.location.origin}`)
    }
  }

  const handleDownloadCertificate = () => {
    // In a real implementation, this would generate a PDF certificate
    console.log("Downloading voting certificate...")
  }

  return (
    <div className="min-h-screen bg-gradient-success relative overflow-hidden">
      {showConfetti && <Confetti />}

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-purple-200 rounded-full opacity-20 animate-bounce delay-1000"></div>
        <div className="absolute bottom-40 right-10 w-12 h-12 bg-orange-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="border-b header-backdrop relative z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Vote className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t("site.title")}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Thank You Card */}
          <Card className="mb-8 border-green-200 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 shadow-2xl">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                    <CheckCircle className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <Sparkles className="h-8 w-8 text-yellow-500 animate-spin" />
                  </div>
                </div>
              </div>
              <CardTitle className="text-4xl md:text-5xl font-bold text-green-700 dark:text-green-400 mb-2 animate-fade-in">
                {t("thankyou.title")}
              </CardTitle>
              <p className="text-xl text-green-600 dark:text-green-300 animate-fade-in-delay">
                {t("thankyou.subtitle")}
              </p>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex justify-center mb-6">
                <Trophy className="h-16 w-16 text-yellow-500 animate-bounce" />
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                {t("thankyou.message")}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button
                  onClick={handleShare}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg"
                  size="lg"
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  {t("thankyou.share")}
                </Button>
                <Button
                  onClick={handleDownloadCertificate}
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 text-lg"
                  size="lg"
                >
                  <Download className="h-5 w-5 mr-2" />
                  {t("thankyou.certificate")}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Vote Details Card */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-gray-900 dark:text-white">
                {t("thankyou.status")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="font-medium text-gray-700 dark:text-gray-300">{t("thankyou.status")}:</span>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-3 py-1">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      {t("thankyou.completed")}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <span className="font-medium text-gray-700 dark:text-gray-300">{t("thankyou.timestamp")}:</span>
                    <span className="text-gray-600 dark:text-gray-400">{voteData.timestamp}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <span className="font-medium text-gray-700 dark:text-gray-300">{t("thankyou.block")}:</span>
                    <span className="text-gray-600 dark:text-gray-400 font-mono">{voteData.blockNumber}</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Candidate:</span>
                    <span className="text-gray-600 dark:text-gray-400 font-medium">{voteData.candidateName}</span>
                  </div>
                </div>
              </div>

              {/* Transaction ID */}
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{t("thankyou.transaction")}:</span>
                  <span className="text-gray-600 dark:text-gray-400 font-mono text-sm break-all">
                    {voteData.transactionId}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Return Button */}
          <div className="text-center">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {t("thankyou.return")}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-delay {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in-delay 1s ease-out 0.3s both;
        }
      `}</style>
    </div>
  )
}
