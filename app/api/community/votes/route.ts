import { type NextRequest, NextResponse } from "next/server"
import { communityStore } from "@/lib/community-store"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { targetId, targetType, userId, voteType } = body

    if (!targetId || !targetType || !userId || !voteType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (voteType !== "up" && voteType !== "down") {
      return NextResponse.json({ error: "Invalid vote type" }, { status: 400 })
    }

    const vote = communityStore.addVote({
      targetId,
      targetType,
      userId,
      voteType,
    })

    const voteCount = communityStore.getVoteCount(targetId)

    return NextResponse.json({ vote, voteCount }, { status: 201 })
  } catch (error) {
    console.error("[v0] Error adding vote:", error)
    return NextResponse.json({ error: "Failed to add vote" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const targetId = searchParams.get("targetId")
    const userId = searchParams.get("userId")

    if (!targetId || !userId) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    communityStore.removeVote(targetId, userId)
    const voteCount = communityStore.getVoteCount(targetId)

    return NextResponse.json({ voteCount })
  } catch (error) {
    console.error("[v0] Error removing vote:", error)
    return NextResponse.json({ error: "Failed to remove vote" }, { status: 500 })
  }
}
