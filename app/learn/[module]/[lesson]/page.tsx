// pages/learn/[module]/[lesson]/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Code, Play } from "lucide-react"
import { getModuleBySlug, getLessonById, Lesson } from "@/lib/course-data"
import { useLanguage } from "@/contexts/language-context"
import Markdown from "react-markdown" // For rendering markdown content
import remarkGfm from "remark-gfm" // For GitHub-flavored markdown support
import rehypeRaw from "rehype-raw" // For rendering raw HTML in markdown

export default function LessonPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const params = useParams()
  const moduleSlug = params.module as string
  const lessonId = params.lesson as string
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [moduleTitle, setModuleTitle] = useState<string>("")

  useEffect(() => {
    const module = getModuleBySlug(moduleSlug)
    if (module) {
      setModuleTitle(module.title)
      const lessonData = getLessonById(moduleSlug, lessonId)
      if (lessonData) {
        setLesson(lessonData)
      } else {
        // Redirect to 404 or module page if lesson not found
        router.push(`/learn/${moduleSlug}`)
      }
    } else {
      // Redirect to 404 or dashboard if module not found
      router.push("/dashboard")
    }
  }, [moduleSlug, lessonId, router])

  if (!lesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/dashboard?tab=modules`)}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to {moduleTitle}
          </Button>
          <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{lesson.duration}</span>
            <span>•</span>
            <span>{lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)}</span>
          </div>
        </header>

        {/* Lesson Content */}
        <Card className="border-border bg-card p-6 mb-8">
          <div className="prose dark:prose-invert max-w-none">
            <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {lesson.content}
            </Markdown>
          </div>
        </Card>

        {/* Exercises/Quizzes Section */}
        {lesson.exercises.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Practice Exercises</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {lesson.exercises.map((exercise) => (
                <Card key={exercise.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold mb-2">{exercise.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Difficulty: {["Easy", "Medium", "Hard", "Super Hard"][exercise.difficulty - 1]}
                      </p>
                      <p className="text-sm mb-4">{exercise.description}</p>
                    </div>
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <Button
                    size="sm"
                    onClick={() => {
                      // TODO: Navigate to a practice page or open a code editor
                      // For now, we'll log the exercise ID (replace with actual navigation)
                      console.log(`Start exercise: ${exercise.id}`)
                      // Example: router.push(`/learn/${moduleSlug}/${lessonId}/practice/${exercise.id}`)
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

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          <Button
            variant="outline"
            onClick={() => router.push(`/dashboard?tab=modules`)}
          >
            Back to Lessons
          </Button>
          {lesson.exercises.length > 0 && (
            <Button
              onClick={() => {
                // Navigate to the first exercise or a practice page
                console.log(`Start first exercise: ${lesson.exercises[0].id}`)
                // Example: router.push(`/learn/${moduleSlug}/${lessonId}/practice/${lesson.exercises[0].id}`)
              }}
            >
              Start Practice
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}