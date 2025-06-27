"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, Circle, LogOut, User, Vote } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { VoteProtection } from "@/components/vote-protection"

// Mock candidate data with translations
const getCandidates = (t: (key: string) => string) => [
  {
    id: 1,
    name: "राहुल शर्मा / Rahul Sharma",
    party: "Indian National Congress",
    symbol: "🤚",
    description: "Experienced leader focused on development and education",
    age: 45,
    education: "M.A. Political Science",
  },
  {
    id: 2,
    name: "प्रिया पटेल / Priya Patel",
    party: "Bharatiya Janata Party",
    symbol: "🪷",
    description: "Young leader committed to digital India and job creation",
    age: 38,
    education: "MBA, B.Tech",
  },
  {
    id: 3,
    name: "अमित कुमार / Amit Kumar",
    party: "Aam Aadmi Party",
    symbol: "🧹",
    description: "Anti-corruption activist working for transparent governance",
    age: 42,
    education: "LLB, Social Work",
  },
  {
    id: 4,
    name: "सुनीता देवी / Sunita Devi",
    party: "Independent",
    symbol: "⚖️",
    description: "Local leader focused on women empowerment and rural development",
    age: 50,
    education: "M.A. Sociology",
  },
]

export default function DashboardPage() {
  const { t } = useLanguage()
  const [hasVoted, setHasVoted] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null)
  const [votingInProgress, setVotingInProgress] = useState(false)
  const router = useRouter()

  const candidates = getCandidates(t)

  useEffect(() => {
    // Check if user has already voted
    const hasVotedStatus = localStorage.getItem("hasVoted")
    const selectedCandidateId = localStorage.getItem("selectedCandidate")

    if (hasVotedStatus === "true") {
      setHasVoted(true)
      if (selectedCandidateId) {
        setSelectedCandidate(Number.parseInt(selectedCandidateId))
      }
    }
  }, [])

  const handleVote = async (candidateId: number) => {
    setVotingInProgress(true)
    setSelectedCandidate(candidateId)

    // Simulate blockchain transaction
    setTimeout(() => {
      const selectedCandidateData = candidates.find((c) => c.id === candidateId)
      const voteData = {
        transactionId: `0x${Math.random().toString(16).substr(2, 40)}`,
        blockNumber: `#${Math.floor(Math.random() * 1000000)}`,
        timestamp: new Date().toLocaleString(),
        candidateName: selectedCandidateData?.name || "Unknown",
        candidateId: candidateId,
      }

      // Store vote data and voting status
      localStorage.setItem("hasVoted", "true")
      localStorage.setItem("voteData", JSON.stringify(voteData))
      localStorage.setItem("selectedCandidate", candidateId.toString())

      setHasVoted(true)
      setVotingInProgress(false)

      // Redirect to thank you page
      router.push("/thank-you")
    }, 3000)
  }

  return (
    <VoteProtection>
      <div className="min-h-screen bg-gradient-primary">
        {/* Header */}
        <header className="border-b header-backdrop">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Vote className="h-8 w-8 text-orange-600" />
              <div>
                <h1 className="text-xl font-bold">{t("dashboard.title")}</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <ThemeToggle />
              <Link href="/">
                <Button variant="outline" size="sm" className="btn-outline">
                  <LogOut className="h-4 w-4 mr-2" />
                  {t("nav.logout")}
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Voter Info */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" />
                  <AvatarFallback>
                    <User className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{t("dashboard.welcome")}</CardTitle>
                  <CardDescription>
                    {t("dashboard.voterid")}: ABC123456789 | {t("dashboard.constituency")}: Mumbai North
                  </CardDescription>
                  <div className="flex items-center mt-2">
                    {hasVoted ? (
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        {t("dashboard.voted")}
                      </Badge>
                    ) : (
                      <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                        <Circle className="h-4 w-4 mr-1" />
                        {t("dashboard.not.voted")}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Voting Status */}
          {hasVoted && (
            <Card className="mb-8 border-green-200 bg-green-50 dark:bg-green-900/20">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2 text-green-800 dark:text-green-200">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">{t("dashboard.vote.success")}</span>
                </div>
                <p className="text-sm text-green-600 dark:text-green-300 mt-2">
                  Transaction ID: 0x1234567890abcdef... | Block: #789456
                </p>
              </CardContent>
            </Card>
          )}

          {/* Candidates */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t("dashboard.candidates.title")}</h2>

            <div className="grid gap-6">
              {candidates.map((candidate) => (
                <Card
                  key={candidate.id}
                  className={`transition-all ${selectedCandidate === candidate.id ? "ring-2 ring-orange-500" : ""}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="text-4xl">{candidate.symbol}</div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{candidate.name}</h3>
                          <p className="text-orange-600 font-medium">{candidate.party}</p>
                          <p className="text-gray-600 dark:text-gray-400 mt-2">{candidate.description}</p>
                          <div className="flex space-x-4 mt-2 text-sm text-gray-500">
                            <span>
                              {t("common.age")}: {candidate.age}
                            </span>
                            <span>
                              {t("common.education")}: {candidate.education}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        {!hasVoted ? (
                          <Button
                            onClick={() => handleVote(candidate.id)}
                            disabled={votingInProgress}
                            className="btn-primary"
                          >
                            {votingInProgress && selectedCandidate === candidate.id
                              ? t("dashboard.voting")
                              : t("dashboard.vote.button")}
                          </Button>
                        ) : selectedCandidate === candidate.id ? (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            {t("dashboard.your.vote")}
                          </Badge>
                        ) : null}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Blockchain Info */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>{t("dashboard.blockchain.title")}</CardTitle>
              <CardDescription>{t("dashboard.blockchain.desc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-medium">{t("dashboard.network.status")}</p>
                  <p className="text-green-600">{t("dashboard.connected")}</p>
                </div>
                <div>
                  <p className="font-medium">{t("dashboard.last.block")}</p>
                  <p className="text-gray-600">#789456</p>
                </div>
                <div>
                  <p className="font-medium">{t("dashboard.gas.fee")}</p>
                  <p className="text-gray-600">0.001 ETH</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </VoteProtection>
  )
}
