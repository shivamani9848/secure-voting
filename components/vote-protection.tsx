"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export function VoteProtection({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage()
  const router = useRouter()
  const [hasVoted, setHasVoted] = useState<boolean | null>(null)
  const [voteData, setVoteData] = useState<any>(null)

  useEffect(() => {
    const hasVotedStatus = localStorage.getItem("hasVoted")
    const storedVoteData = localStorage.getItem("voteData")

    setHasVoted(hasVotedStatus === "true")
    if (storedVoteData) {
      setVoteData(JSON.parse(storedVoteData))
    }
  }, [])

  if (hasVoted === null) {
    // Loading state
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600"></div>
      </div>
    )
  }

  if (hasVoted) {
    // Show voting completed message
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            <Card className="border-green-200 bg-green-50 dark:bg-green-900/20">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-green-700 dark:text-green-400">{t("dashboard.voted")}</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-gray-700 dark:text-gray-300">
                  You have already completed your vote in this election. Thank you for participating in democracy!
                </p>
                {voteData && (
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Voted for:</strong> {voteData.candidateName}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Time:</strong> {voteData.timestamp}
                    </p>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/thank-you">
                    <Button className="bg-green-600 hover:bg-green-700">View Voting Certificate</Button>
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

  // User hasn't voted yet, show the voting interface
  return <>{children}</>
}
