// app/api/community/questions/[id]/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { communityStore } from "@/lib/community-store"

// Define the expected params type
interface RouteParams {
  params: { id: string }
}

export async function GET(request: NextRequest,  ) {
  try {
    const question = communityStore.getQuestion('')

    if (!question) {
      return NextResponse.json({ error: "Question not found" }, { status: 404 })
    }

    // Increment view count
    communityStore.incrementViews('')

    // Get answers and votes
    const answers = communityStore.getAnswers('')
    const votes = communityStore.getVoteCount('')

    // Add vote counts to answers
    const answersWithVotes = answers.map((a) => ({
      ...a,
      votes: communityStore.getVoteCount(a.id),
    }))

    return NextResponse.json({
      question: {
        ...question,
        votes,
        answers: answersWithVotes,
      },
    })
  } catch (error) {
    console.error("[v0] Error fetching question:", error)
    return NextResponse.json({ error: "Failed to fetch question" }, { status: 500 })
  }
}