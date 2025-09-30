"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sparkles, Send, Code, BookOpen, Lightbulb, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const suggestedQuestions = [
  {
    icon: Code,
    question: "How do I create my first Solana program?",
    category: "Getting Started",
  },
  {
    icon: BookOpen,
    question: "Explain Solana accounts and how they work",
    category: "Concepts",
  },
  {
    icon: Lightbulb,
    question: "What's the difference between Rust and Anchor?",
    category: "Development",
  },
  {
    icon: Code,
    question: "Help me debug my token minting program",
    category: "Debugging",
  },
]

const getAIResponse = (question: string): string => {
  const lowerQuestion = question.toLowerCase()

  if (lowerQuestion.includes("first") && lowerQuestion.includes("program")) {
    return `Great question! Here's how to create your first Solana program:

1. **Set up your environment:**
   - Install Rust: curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   - Install Solana CLI: sh -c "$(curl -sSfL https://release.solana.com/stable/install)"

2. **Create a new project:**
   - cargo new my_solana_program --lib
   - Add Solana dependencies to Cargo.toml

3. **Write your program:**
   - Programs are written in Rust
   - Use the solana_program crate
   - Implement the process_instruction function

4. **Build and deploy:**
   - cargo build-bpf
   - solana program deploy target/deploy/my_program.so

Would you like me to explain any of these steps in more detail?`
  }

  if (lowerQuestion.includes("account")) {
    return `Solana accounts are fundamental to understanding the blockchain! Here's what you need to know:

**What are Solana Accounts?**
Accounts are storage units on Solana that hold data and SOL. Think of them as files in a filesystem.

**Key Properties:**
- **Address**: A unique 32-byte public key
- **Lamports**: Balance in lamports (1 SOL = 1 billion lamports)
- **Owner**: The program that can modify the account
- **Data**: Arbitrary data stored in the account
- **Executable**: Whether the account contains a program

**Types of Accounts:**
1. **System Accounts**: Hold SOL, owned by System Program
2. **Program Accounts**: Contain executable code
3. **Data Accounts**: Store program state (PDAs)

**Important Concepts:**
- Accounts must pay rent (or be rent-exempt)
- Only the owner program can modify account data
- Accounts can be created, closed, and transferred

Need help with a specific account operation?`
  }

  if (lowerQuestion.includes("rust") && lowerQuestion.includes("anchor")) {
    return `Excellent question! Let me explain the difference:

**Rust:**
- Low-level programming language for Solana
- Direct access to Solana's native APIs
- More verbose but maximum control
- Requires manual serialization/deserialization
- Better for complex, performance-critical programs

**Anchor:**
- Framework built on top of Rust
- Simplifies Solana development significantly
- Provides macros for common patterns
- Automatic serialization with Borsh
- Built-in security checks
- Easier testing and deployment

**When to use each:**
- **Use Rust** for: Maximum performance, complex programs, learning fundamentals
- **Use Anchor** for: Faster development, standard DeFi apps, most production use cases

**Example comparison:**
Rust: 200+ lines for a simple program
Anchor: 50 lines for the same program

I recommend starting with Anchor for most projects! Want to see a code example?`
  }

  if (lowerQuestion.includes("debug") || lowerQuestion.includes("token")) {
    return `I can help you debug your token minting program! Here are common issues and solutions:

**Common Token Minting Errors:**

1. **"Account not found"**
   - Ensure the mint account is initialized
   - Check you're on the correct network (devnet/mainnet)

2. **"Insufficient funds"**
   - Account needs SOL for rent
   - Mint authority must have enough SOL

3. **"Invalid authority"**
   - Verify the mint authority signature
   - Check the authority matches the mint account

**Debugging Steps:**
1. Add console.log statements to track execution
2. Use solana logs command to view program logs
3. Check account states with solana account <address>
4. Verify transaction signatures on Solana Explorer

**Example Token Mint Code:**
\`\`\`rust
use anchor_spl::token::{self, Mint, Token, TokenAccount};

pub fn mint_tokens(ctx: Context<MintTokens>, amount: u64) -> Result<()> {
    token::mint_to(
        ctx.accounts.mint_to_ctx(),
        amount,
    )?;
    Ok(())
}
\`\`\`

What specific error are you encountering?`
  }

  // Default response for other questions
  return `That's a great question about Solana development! 

Based on your question, here are some key points to consider:

**General Solana Development Tips:**
- Always test on devnet before mainnet
- Use the Solana Playground for quick prototyping
- Check the official Solana documentation
- Join the Solana Discord for community support

**Recommended Learning Path:**
1. Understand Solana's account model
2. Learn Rust basics
3. Start with Anchor framework
4. Build simple programs (counter, calculator)
5. Progress to token programs and DeFi

**Resources:**
- Solana Cookbook: solana.com/developers/cookbook
- Anchor Book: book.anchor-lang.com
- Solana Program Library: github.com/solana-labs/solana-program-library

Would you like me to dive deeper into any specific aspect? Feel free to ask more detailed questions about:
- Smart contract development
- Token creation and management
- DeFi protocols
- NFT minting
- Program deployment

I'm here to help you master Solana development!`
}

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function TutorPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    setTimeout(
      () => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: getAIResponse(userMessage.content),
        }
        setMessages((prev) => [...prev, aiResponse])
        setIsLoading(false)
      },
      1000 + Math.random() * 1000,
    ) // Random delay between 1-2 seconds
  }

  const handleSuggestedQuestion = (question: string) => {
    setInput(question)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-lg font-bold">AI Tutor</h1>
                  <p className="text-xs text-muted-foreground">Your personal Solana learning assistant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto flex flex-1 flex-col px-4 py-6">
        <div className="mx-auto w-full max-w-4xl flex-1 flex flex-col">
          {messages.length === 0 ? (
            // Welcome State
            <div className="flex flex-1 flex-col items-center justify-center py-12">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h2 className="mb-3 text-3xl font-bold text-balance text-center">Welcome to your AI Tutor</h2>
              <p className="mb-12 max-w-md text-center text-muted-foreground text-pretty">
                Ask me anything about Solana development, smart contracts, or blockchain concepts. I'm here to help you
                learn!
              </p>

              {/* Suggested Questions */}
              <div className="w-full">
                <p className="mb-4 text-sm font-semibold text-muted-foreground">Suggested questions</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {suggestedQuestions.map((item, index) => {
                    const Icon = item.icon
                    return (
                      <Card
                        key={index}
                        className="cursor-pointer border-border bg-card p-4 transition-colors hover:bg-accent"
                        onClick={() => handleSuggestedQuestion(item.question)}
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <Icon className="h-4 w-4 text-primary" />
                          <span className="text-xs font-medium text-muted-foreground">{item.category}</span>
                        </div>
                        <p className="text-sm font-medium">{item.question}</p>
                      </Card>
                    )
                  })}
                </div>
              </div>
            </div>
          ) : (
            // Chat Messages
            <div ref={scrollRef} className="flex-1 overflow-y-auto pr-4">
              <div className="space-y-6 py-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn("flex gap-3", message.role === "user" ? "justify-end" : "justify-start")}
                  >
                    {message.role === "assistant" && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
                        <Sparkles className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg px-4 py-3",
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
                      )}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    </div>
                    {message.role === "user" && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <span className="text-xs font-semibold">You</span>
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
                      <Sparkles className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="max-w-[80%] rounded-lg bg-muted px-4 py-3">
                      <div className="flex gap-1">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-foreground/50" />
                        <div className="h-2 w-2 animate-bounce rounded-full bg-foreground/50 [animation-delay:0.2s]" />
                        <div className="h-2 w-2 animate-bounce rounded-full bg-foreground/50 [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Input Form */}
          <div className="border-t border-border pt-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about Solana development..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <p className="mt-2 text-xs text-muted-foreground text-center">
              AI responses may contain errors. Always verify code before deploying.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
