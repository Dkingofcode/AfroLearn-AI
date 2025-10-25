import { type NextRequest, NextResponse } from "next/server"
import { communityStore } from "@/lib/community-store"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get("category")
    const sort = searchParams.get("sort") || "recent"

    let questions = communityStore.getAllQuestions()

    // Filter by category
    if (category) {
      questions = questions.filter((q) => q.category === category)
    }

    // Sort questions
    switch (sort) {
      case "recent":
        questions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "votes":
        questions.sort((a, b) => {
          const aVotes = communityStore.getVoteCount(a.id).total
          const bVotes = communityStore.getVoteCount(b.id).total
          return bVotes - aVotes
        })
        break
      case "views":
        questions.sort((a, b) => b.views - a.views)
        break
      case "unanswered":
        questions = questions.filter((q) => {
          const answers = communityStore.getAnswers(q.id)
          return answers.length === 0
        })
        break
    }

    // Add vote counts to each question
    const questionsWithVotes = questions.map((q) => ({
      ...q,
      votes: communityStore.getVoteCount(q.id),
      answerCount: communityStore.getAnswers(q.id).length,
    }))

    return NextResponse.json({ questions: questionsWithVotes })
  } catch (error) {
    console.error("[v0] Error fetching questions:", error)
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, author, authorAvatar, authorReputation, category, tags } = body

    if (!title || !content || !author || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const question = communityStore.createQuestion({
      title,
      content,
      author,
      authorAvatar: authorAvatar || "/placeholder.svg?height=40&width=40",
      authorReputation: authorReputation || 0,
      category,
      tags: tags || [],
      isPinned: false,
    })

    return NextResponse.json({ question }, { status: 201 })
  } catch (error) {
    console.error("[v0] Error creating question:", error)
    return NextResponse.json({ error: "Failed to create question" }, { status: 500 })
  }
}
