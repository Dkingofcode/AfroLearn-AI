import { type NextRequest, NextResponse } from "next/server"
import { communityStore } from "@/lib/community-store"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { questionId, content, author, authorAvatar, authorReputation } = body

    if (!questionId || !content || !author) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const answer = communityStore.createAnswer({
      questionId,
      content,
      author,
      authorAvatar: authorAvatar || "/placeholder.svg?height=40&width=40",
      authorReputation: authorReputation || 0,
      isAccepted: false,
    })

    return NextResponse.json({ answer }, { status: 201 })
  } catch (error) {
    console.error("[v0] Error creating answer:", error)
    return NextResponse.json({ error: "Failed to create answer" }, { status: 500 })
  }
}
