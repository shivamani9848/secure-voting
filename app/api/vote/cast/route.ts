import { type NextRequest, NextResponse } from "next/server"
import { votingBlockchain } from "@/lib/blockchain"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { voterID, candidateID } = body

    if (!voterID || !candidateID) {
      return NextResponse.json({ success: false, message: "Voter ID and Candidate ID are required" }, { status: 400 })
    }

    // Cast vote on blockchain
    const transaction = await votingBlockchain.castVote(voterID, candidateID)

    return NextResponse.json({
      success: true,
      transaction,
      message: "Vote cast successfully",
    })
  } catch (error) {
    console.error("Vote casting error:", error)
    return NextResponse.json({ success: false, message: "Failed to cast vote" }, { status: 500 })
  }
}
