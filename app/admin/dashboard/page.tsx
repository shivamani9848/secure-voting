"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Users,
  Vote,
  UserCheck,
  BarChart3,
  LogOut,
  Search,
  Plus,
  Edit,
  Trash2,
  Shield,
  TrendingUp,
  PieChart,
} from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import { useLanguage } from "@/contexts/language-context"
import { useAdmin } from "@/contexts/admin-context"
import { AdminProtection } from "@/components/admin-protection"
import { useRouter } from "next/navigation"

// Mock data
const mockVoters = [
  {
    id: "1",
    voterID: "ABC123456789",
    name: "राज कुमार / Raj Kumar",
    email: "raj.kumar@email.com",
    mobile: "+91 9876543210",
    state: "Maharashtra",
    constituency: "Mumbai North",
    status: "verified",
    hasVoted: true,
  },
  {
    id: "2",
    voterID: "DEF987654321",
    name: "प्रिया शर्मा / Priya Sharma",
    email: "priya.sharma@email.com",
    mobile: "+91 9876543211",
    state: "Maharashtra",
    constituency: "Mumbai North",
    status: "verified",
    hasVoted: false,
  },
  {
    id: "3",
    voterID: "GHI456789123",
    name: "अमित पटेल / Amit Patel",
    email: "amit.patel@email.com",
    mobile: "+91 9876543212",
    state: "Gujarat",
    constituency: "Ahmedabad East",
    status: "pending",
    hasVoted: false,
  },
]

const mockCandidates = [
  {
    id: 1,
    name: "राहुल शर्मा / Rahul Sharma",
    party: "Indian National Congress",
    symbol: "🤚",
    description: "Experienced leader focused on development and education",
    age: 45,
    education: "M.A. Political Science",
    constituency: "Mumbai North",
    votes: 1250,
  },
  {
    id: 2,
    name: "प्रिया पटेल / Priya Patel",
    party: "Bharatiya Janata Party",
    symbol: "🪷",
    description: "Young leader committed to digital India and job creation",
    age: 38,
    education: "MBA, B.Tech",
    constituency: "Mumbai North",
    votes: 980,
  },
  {
    id: 3,
    name: "अमित कुमार / Amit Kumar",
    party: "Aam Aadmi Party",
    symbol: "🧹",
    description: "Anti-corruption activist working for transparent governance",
    age: 42,
    education: "LLB, Social Work",
    constituency: "Mumbai North",
    votes: 750,
  },
]

export default function AdminDashboardPage() {
  const { t } = useLanguage()
  const { adminLogout, adminUser } = useAdmin()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [candidates, setCandidates] = useState(mockCandidates)
  const [editingCandidate, setEditingCandidate] = useState<any>(null)
  const [isAddingCandidate, setIsAddingCandidate] = useState(false)
  const [newCandidate, setNewCandidate] = useState({
    name: "",
    party: "",
    symbol: "",
    description: "",
    age: "",
    education: "",
    constituency: "",
  })

  const stats = {
    totalVoters: mockVoters.length,
    totalVotes: mockVoters.filter((v) => v.hasVoted).length,
    pendingVerification: mockVoters.filter((v) => v.status === "pending").length,
    turnoutRate: Math.round((mockVoters.filter((v) => v.hasVoted).length / mockVoters.length) * 100),
  }

  const filteredVoters = mockVoters.filter(
    (voter) =>
      voter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voter.voterID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voter.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleLogout = () => {
    adminLogout()
    router.push("/")
  }

  const handleAddCandidate = () => {
    const candidate = {
      id: candidates.length + 1,
      ...newCandidate,
      age: Number.parseInt(newCandidate.age),
      votes: 0,
    }
    setCandidates([...candidates, candidate])
    setNewCandidate({
      name: "",
      party: "",
      symbol: "",
      description: "",
      age: "",
      education: "",
      constituency: "",
    })
    setIsAddingCandidate(false)
  }

  const handleEditCandidate = (candidate: any) => {
    setEditingCandidate({ ...candidate })
  }

  const handleUpdateCandidate = () => {
    setCandidates(candidates.map((c) => (c.id === editingCandidate.id ? editingCandidate : c)))
    setEditingCandidate(null)
  }

  const handleDeleteCandidate = (id: number) => {
    setCandidates(candidates.filter((c) => c.id !== id))
  }

  return (
    <AdminProtection>
      <div className="min-h-screen bg-gradient-admin">
        {/* Header */}
        <header className="border-b header-backdrop">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold">{t("admin.dashboard.title")}</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t("admin.dashboard.welcome")}, {adminUser?.username}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <ThemeToggle />
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="bg-white text-gray-900 border-gray-300"
              >
                <LogOut className="h-4 w-4 mr-2" />
                {t("nav.logout")}
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">{t("admin.overview")}</TabsTrigger>
              <TabsTrigger value="voters">{t("admin.voters")}</TabsTrigger>
              <TabsTrigger value="candidates">{t("admin.candidates")}</TabsTrigger>
              <TabsTrigger value="votes">{t("admin.votes")}</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t("admin.stats.registered")}</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalVoters.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      <TrendingUp className="h-3 w-3 inline mr-1" />
                      +12% from last election
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t("admin.stats.voted")}</CardTitle>
                    <Vote className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalVotes.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      <PieChart className="h-3 w-3 inline mr-1" />
                      {stats.turnoutRate}% turnout rate
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t("admin.stats.pending")}</CardTitle>
                    <UserCheck className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.pendingVerification}</div>
                    <p className="text-xs text-muted-foreground">Awaiting verification</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t("admin.stats.turnout.rate")}</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.turnoutRate}%</div>
                    <p className="text-xs text-muted-foreground">Above national average</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Voting Activity</CardTitle>
                  <CardDescription>Latest votes cast in the system</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockVoters
                      .filter((v) => v.hasVoted)
                      .slice(0, 5)
                      .map((voter) => (
                        <div key={voter.id} className="flex items-center space-x-4">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{voter.name}</p>
                            <p className="text-xs text-gray-500">{voter.constituency}</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Voted</Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Voters Tab */}
            <TabsContent value="voters" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("admin.voters.title")}</CardTitle>
                  <CardDescription>Manage registered voters and their verification status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 mb-4">
                    <Search className="h-4 w-4 text-gray-400" />
                    <Input
                      placeholder={t("admin.voters.search")}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="max-w-sm"
                    />
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t("admin.voters.id")}</TableHead>
                        <TableHead>{t("admin.voters.name")}</TableHead>
                        <TableHead>{t("admin.voters.email")}</TableHead>
                        <TableHead>{t("admin.voters.mobile")}</TableHead>
                        <TableHead>{t("admin.voters.constituency")}</TableHead>
                        <TableHead>{t("admin.voters.status")}</TableHead>
                        <TableHead>{t("admin.voters.actions")}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredVoters.map((voter) => (
                        <TableRow key={voter.id}>
                          <TableCell className="font-mono text-sm">{voter.voterID}</TableCell>
                          <TableCell>{voter.name}</TableCell>
                          <TableCell>{voter.email}</TableCell>
                          <TableCell>{voter.mobile}</TableCell>
                          <TableCell>{voter.constituency}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                voter.status === "verified"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {voter.status === "verified" ? t("admin.voters.verified") : t("admin.voters.pending")}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Edit className="h-3 w-3" />
                              </Button>
                              {voter.status === "pending" && (
                                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                  Verify
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Candidates Tab */}
            <TabsContent value="candidates" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{t("admin.candidates.title")}</CardTitle>
                      <CardDescription>Manage election candidates and their information</CardDescription>
                    </div>
                    <Dialog open={isAddingCandidate} onOpenChange={setIsAddingCandidate}>
                      <DialogTrigger asChild>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          <Plus className="h-4 w-4 mr-2" />
                          {t("admin.candidates.add")}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{t("admin.candidates.add")}</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>{t("admin.candidates.name")}</Label>
                            <Input
                              value={newCandidate.name}
                              onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>{t("admin.candidates.party")}</Label>
                            <Input
                              value={newCandidate.party}
                              onChange={(e) => setNewCandidate({ ...newCandidate, party: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>{t("admin.candidates.symbol")}</Label>
                            <Input
                              value={newCandidate.symbol}
                              onChange={(e) => setNewCandidate({ ...newCandidate, symbol: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>{t("common.age")}</Label>
                            <Input
                              type="number"
                              value={newCandidate.age}
                              onChange={(e) => setNewCandidate({ ...newCandidate, age: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>{t("common.education")}</Label>
                            <Input
                              value={newCandidate.education}
                              onChange={(e) => setNewCandidate({ ...newCandidate, education: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>{t("register.constituency")}</Label>
                            <Input
                              value={newCandidate.constituency}
                              onChange={(e) => setNewCandidate({ ...newCandidate, constituency: e.target.value })}
                            />
                          </div>
                          <div className="col-span-2 space-y-2">
                            <Label>{t("admin.candidates.description")}</Label>
                            <Textarea
                              value={newCandidate.description}
                              onChange={(e) => setNewCandidate({ ...newCandidate, description: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2 mt-4">
                          <Button variant="outline" onClick={() => setIsAddingCandidate(false)}>
                            {t("admin.candidates.cancel")}
                          </Button>
                          <Button onClick={handleAddCandidate} className="bg-blue-600 hover:bg-blue-700">
                            {t("admin.candidates.save")}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Symbol</TableHead>
                        <TableHead>{t("admin.candidates.name")}</TableHead>
                        <TableHead>{t("admin.candidates.party")}</TableHead>
                        <TableHead>{t("register.constituency")}</TableHead>
                        <TableHead>Votes</TableHead>
                        <TableHead>{t("admin.voters.actions")}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {candidates.map((candidate) => (
                        <TableRow key={candidate.id}>
                          <TableCell className="text-2xl">{candidate.symbol}</TableCell>
                          <TableCell>{candidate.name}</TableCell>
                          <TableCell>{candidate.party}</TableCell>
                          <TableCell>{candidate.constituency}</TableCell>
                          <TableCell>{candidate.votes.toLocaleString()}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" onClick={() => handleEditCandidate(candidate)}>
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 hover:text-red-700"
                                onClick={() => handleDeleteCandidate(candidate.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Edit Candidate Dialog */}
              <Dialog open={!!editingCandidate} onOpenChange={() => setEditingCandidate(null)}>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{t("admin.candidates.edit")}</DialogTitle>
                  </DialogHeader>
                  {editingCandidate && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>{t("admin.candidates.name")}</Label>
                        <Input
                          value={editingCandidate.name}
                          onChange={(e) => setEditingCandidate({ ...editingCandidate, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>{t("admin.candidates.party")}</Label>
                        <Input
                          value={editingCandidate.party}
                          onChange={(e) => setEditingCandidate({ ...editingCandidate, party: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>{t("admin.candidates.symbol")}</Label>
                        <Input
                          value={editingCandidate.symbol}
                          onChange={(e) => setEditingCandidate({ ...editingCandidate, symbol: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>{t("common.age")}</Label>
                        <Input
                          type="number"
                          value={editingCandidate.age}
                          onChange={(e) =>
                            setEditingCandidate({ ...editingCandidate, age: Number.parseInt(e.target.value) })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>{t("common.education")}</Label>
                        <Input
                          value={editingCandidate.education}
                          onChange={(e) => setEditingCandidate({ ...editingCandidate, education: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>{t("register.constituency")}</Label>
                        <Input
                          value={editingCandidate.constituency}
                          onChange={(e) => setEditingCandidate({ ...editingCandidate, constituency: e.target.value })}
                        />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <Label>{t("admin.candidates.description")}</Label>
                        <Textarea
                          value={editingCandidate.description}
                          onChange={(e) => setEditingCandidate({ ...editingCandidate, description: e.target.value })}
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button variant="outline" onClick={() => setEditingCandidate(null)}>
                      {t("admin.candidates.cancel")}
                    </Button>
                    <Button onClick={handleUpdateCandidate} className="bg-blue-600 hover:bg-blue-700">
                      {t("admin.candidates.save")}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </TabsContent>

            {/* Votes Tab */}
            <TabsContent value="votes" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("admin.votes.by.candidate")}</CardTitle>
                    <CardDescription>Vote distribution among candidates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {candidates.map((candidate) => (
                        <div key={candidate.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{candidate.symbol}</span>
                            <div>
                              <p className="font-medium">{candidate.name}</p>
                              <p className="text-sm text-gray-500">{candidate.party}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{candidate.votes.toLocaleString()}</p>
                            <p className="text-sm text-gray-500">
                              {Math.round((candidate.votes / stats.totalVotes) * 100)}%
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{t("admin.votes.title")}</CardTitle>
                    <CardDescription>Overall voting statistics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-blue-600">{stats.totalVotes}</div>
                        <p className="text-gray-600">{t("admin.votes.total")}</p>
                      </div>

                      <div className="text-center">
                        <div className="text-4xl font-bold text-green-600">{stats.turnoutRate}%</div>
                        <p className="text-gray-600">{t("admin.votes.turnout")}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Votes Cast</span>
                          <span>{stats.totalVotes}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Remaining Voters</span>
                          <span>{stats.totalVoters - stats.totalVotes}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${stats.turnoutRate}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminProtection>
  )
}
