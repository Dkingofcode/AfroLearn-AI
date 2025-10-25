// In-memory storage for community data
// In production, replace with database

export interface Question {
  id: string
  title: string
  content: string
  author: string
  authorAvatar: string
  authorReputation: number
  category: string
  tags: string[]
  createdAt: string
  updatedAt: string
  views: number
  isPinned: boolean
}

export interface Answer {
  id: string
  questionId: string
  content: string
  author: string
  authorAvatar: string
  authorReputation: number
  createdAt: string
  updatedAt: string
  isAccepted: boolean
}

export interface Vote {
  id: string
  targetId: string // question or answer ID
  targetType: "question" | "answer"
  userId: string
  voteType: "up" | "down"
  createdAt: string
}

// In-memory stores
const questions: Map<string, Question> = new Map()
const answers: Map<string, Answer[]> = new Map()
const votes: Map<string, Vote[]> = new Map()

// Initialize with some sample data
const sampleQuestions: Question[] = [
  {
    id: "1",
    title: "How to optimize Solana transaction fees?",
    content:
      "I'm building a DeFi app and transaction fees are adding up. What are the best practices for optimizing transaction costs on Solana? I've tried batching transactions but still seeing high costs.",
    author: "Kwame_Dev",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    authorReputation: 1250,
    category: "Technical Help",
    tags: ["solana", "transactions", "optimization"],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    views: 456,
    isPinned: true,
  },
  {
    id: "2",
    title: "Built my first NFT marketplace on Solana!",
    content:
      "Just deployed my first NFT marketplace using Metaplex and Anchor. Here's what I learned during the process and some tips for beginners...",
    author: "Amara_Codes",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    authorReputation: 890,
    category: "Project Showcase",
    tags: ["nft", "marketplace", "metaplex"],
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    views: 892,
    isPinned: false,
  },
  {
    id: "3",
    title: "Understanding Program Derived Addresses (PDAs)",
    content:
      "Can someone explain PDAs in simple terms? I understand the concept but struggling with implementation in Anchor. Specifically, how do I derive PDAs correctly?",
    author: "Zara_Blockchain",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    authorReputation: 2100,
    category: "Technical Help",
    tags: ["pda", "solana", "anchor"],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    views: 567,
    isPinned: false,
  },
]

const sampleAnswers: { [key: string]: Answer[] } = {
  "1": [
    {
      id: "a1",
      questionId: "1",
      content: `Here are some proven strategies to optimize Solana transaction fees:

1. **Batch Operations**: Combine multiple instructions into a single transaction
2. **Use Compute Budget**: Set optimal compute units to avoid overpaying
3. **Optimize Account Size**: Minimize account data to reduce rent costs
4. **Reuse Accounts**: Don't create new accounts unnecessarily
5. **Priority Fees**: Only use when network is congested

Example code for setting compute budget:
\`\`\`rust
use solana_program::compute_budget::ComputeBudgetInstruction;

let compute_budget_ix = ComputeBudgetInstruction::set_compute_unit_limit(200_000);
\`\`\`

Hope this helps!`,
      author: "Kofi_Security",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      authorReputation: 3400,
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      isAccepted: true,
    },
  ],
  "3": [
    {
      id: "a2",
      questionId: "3",
      content: `PDAs are deterministic addresses derived from seeds and a program ID. Here's a simple explanation:

**What are PDAs?**
- Addresses that don't have private keys
- Only the program can sign for them
- Derived using: find_program_address(seeds, program_id)

**Example in Anchor:**
\`\`\`rust
#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + 32,
        seeds = [b"my-seed", user.key().as_ref()],
        bump
    )]
    pub my_pda: Account<'info, MyAccount>,
    
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}
\`\`\`

The key is using consistent seeds!`,
      author: "Tunde_Code",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      authorReputation: 1800,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      isAccepted: true,
    },
  ],
}

// Initialize sample data
sampleQuestions.forEach((q) => questions.set(q.id, q))
Object.entries(sampleAnswers).forEach(([qId, ans]) => answers.set(qId, ans))

// Store functions
export const communityStore = {
  // Questions
  getAllQuestions: () => Array.from(questions.values()),
  getQuestion: (id: string) => questions.get(id),
  createQuestion: (question: Omit<Question, "id" | "createdAt" | "updatedAt" | "views">) => {
    const id = Date.now().toString()
    const newQuestion: Question = {
      ...question,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
    }
    questions.set(id, newQuestion)
    return newQuestion
  },
  updateQuestion: (id: string, updates: Partial<Question>) => {
    const question = questions.get(id)
    if (!question) return null
    const updated = { ...question, ...updates, updatedAt: new Date().toISOString() }
    questions.set(id, updated)
    return updated
  },
  deleteQuestion: (id: string) => {
    questions.delete(id)
    answers.delete(id)
  },
  incrementViews: (id: string) => {
    const question = questions.get(id)
    if (question) {
      question.views++
      questions.set(id, question)
    }
  },

  // Answers
  getAnswers: (questionId: string) => answers.get(questionId) || [],
  createAnswer: (answer: Omit<Answer, "id" | "createdAt" | "updatedAt">) => {
    const id = Date.now().toString()
    const newAnswer: Answer = {
      ...answer,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    const questionAnswers = answers.get(answer.questionId) || []
    questionAnswers.push(newAnswer)
    answers.set(answer.questionId, questionAnswers)
    return newAnswer
  },
  updateAnswer: (questionId: string, answerId: string, updates: Partial<Answer>) => {
    const questionAnswers = answers.get(questionId)
    if (!questionAnswers) return null
    const answerIndex = questionAnswers.findIndex((a) => a.id === answerId)
    if (answerIndex === -1) return null
    const updated = { ...questionAnswers[answerIndex], ...updates, updatedAt: new Date().toISOString() }
    questionAnswers[answerIndex] = updated
    answers.set(questionId, questionAnswers)
    return updated
  },
  acceptAnswer: (questionId: string, answerId: string) => {
    const questionAnswers = answers.get(questionId)
    if (!questionAnswers) return false
    // Unaccept all other answers
    questionAnswers.forEach((a) => (a.isAccepted = false))
    // Accept the specified answer
    const answer = questionAnswers.find((a) => a.id === answerId)
    if (answer) {
      answer.isAccepted = true
      answers.set(questionId, questionAnswers)
      return true
    }
    return false
  },

  // Votes
  getVotes: (targetId: string) => votes.get(targetId) || [],
  addVote: (vote: Omit<Vote, "id" | "createdAt">) => {
    const id = Date.now().toString()
    const newVote: Vote = {
      ...vote,
      id,
      createdAt: new Date().toISOString(),
    }
    const targetVotes = votes.get(vote.targetId) || []
    // Remove existing vote from this user
    const filtered = targetVotes.filter((v) => v.userId !== vote.userId)
    filtered.push(newVote)
    votes.set(vote.targetId, filtered)
    return newVote
  },
  removeVote: (targetId: string, userId: string) => {
    const targetVotes = votes.get(targetId) || []
    const filtered = targetVotes.filter((v) => v.userId !== userId)
    votes.set(targetId, filtered)
  },
  getVoteCount: (targetId: string) => {
    const targetVotes = votes.get(targetId) || []
    const upvotes = targetVotes.filter((v) => v.voteType === "up").length
    const downvotes = targetVotes.filter((v) => v.voteType === "down").length
    return { upvotes, downvotes, total: upvotes - downvotes }
  },
}
