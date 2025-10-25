// pages/learn/solana-fundamentals/page.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Code, Play } from "lucide-react"
import { courseModules, Module, Lesson } from "@/lib/course-data"
import { useLanguage } from "@/contexts/language-context"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"

// Find the Solana Fundamentals module
const solanaModule = courseModules.find((module) => module.slug === "solana-fundamentals")

export default function SolanaFundamentalsPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null)

  if (!solanaModule) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Module not found</p>
      </div>
    )
  }

  const toggleLesson = (lessonId: string) => {
    setExpandedLesson(expandedLesson === lessonId ? null : lessonId)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/dashboard?tab=modules")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold mb-2">{solanaModule.title}</h1>
          <p className="text-muted-foreground mb-4">{solanaModule.description}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{solanaModule.lessons.length} lessons</span>
            <span>•</span>
            <span>{solanaModule.duration}</span>
          </div>
        </header>

        {/* Lessons List */}
        <div className="space-y-6">
          {solanaModule.lessons.map((lesson) => (
            <Card key={lesson.id} className="border-border bg-card p-6">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleLesson(lesson.id)}
              >
                <div>
                  <h2 className="text-xl font-bold mb-2">{lesson.title}</h2>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{lesson.duration}</span>
                    <span>•</span>
                    <span>{lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  {expandedLesson === lesson.id ? "Collapse" : "Expand"}
                </Button>
              </div>

              {expandedLesson === lesson.id && (
                <div className="mt-4">
                  {/* Lesson Content */}
                  <div className="prose dark:prose-invert max-w-none mb-6">
                    <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                      {lesson.content}
                    </Markdown>
                  </div>

                  {/* Exercises Section */}
                  {lesson.exercises.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold mb-4">Practice Exercises</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        {lesson.exercises.map((exercise) => (
                          <Card key={exercise.id} className="p-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-semibold mb-2">{exercise.title}</h4>
                                <p className="text-sm text-muted-foreground mb-2">
                                  Difficulty: {["Easy", "Medium", "Hard", "Super Hard"][exercise.difficulty - 1]}
                                </p>
                                <p className="text-sm mb-4">{exercise.description}</p>
                              </div>
                              <Code className="h-6 w-6 text-primary" />
                            </div>
                            <pre className="bg-muted p-4 rounded mb-4">
                              <code>{exercise.starterCode}</code>
                            </pre>
                            <div className="mb-4">
                              <h5 className="font-semibold mb-2">Hints</h5>
                              <ul className="list-disc pl-4">
                                {exercise.hints.map((hint, index) => (
                                  <li key={index} className="text-sm text-muted-foreground">{hint}</li>
                                ))}
                              </ul>
                            </div>
                            <Button
                              size="sm"
                              onClick={() => {
                                // TODO: Navigate to a practice page or open a code editor
                                console.log(`Start exercise: ${exercise.id}`)
                                // Example: router.push(`/learn/solana-fundamentals/practice/${lesson.id}/${exercise.id}`)
                              }}
                            >
                              Start Exercise
                              <Play className="ml-2 h-4 w-4" />
                            </Button>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}