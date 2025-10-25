"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Code, Lightbulb, Eye, Play } from "lucide-react"
import { getModuleBySlug, getLessonById, Exercise } from "@/lib/course-data"
import { useLanguage } from "@/contexts/language-context"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"

export default function PracticePage() {
  const { t } = useLanguage()
  const router = useRouter()
  const params = useParams()
  const moduleSlug = params.module as string
  const lessonId = params.lessonId as string
  const exerciseId = params.exerciseId as string
  const [exercise, setExercise] = useState<Exercise | null>(null)
  const [moduleTitle, setModuleTitle] = useState<string>("")
  const [lessonTitle, setLessonTitle] = useState<string>("")
  const [code, setCode] = useState<string>("")
  const [testResults, setTestResults] = useState<string[]>([])
  const [showHints, setShowHints] = useState(false)
  const [showSolution, setShowSolution] = useState(false)

  useEffect(() => {
    const module = getModuleBySlug(moduleSlug)
    if (module) {
      setModuleTitle(module.title)
      const lesson = getLessonById(moduleSlug, lessonId)
      if (lesson) {
        setLessonTitle(lesson.title)
        const foundExercise = lesson.exercises.find((ex) => ex.id === exerciseId)
        if (foundExercise) {
          setExercise(foundExercise)
          setCode(foundExercise.starterCode)
        } else {
          router.push(`/learn/${moduleSlug}/practice/${lessonId}`)
        }
      } else {
        router.push(`/learn/${moduleSlug}`)
      }
    } else {
      router.push("/dashboard")
    }
  }, [moduleSlug, lessonId, exerciseId, router])

  const runTests = () => {
    if (!exercise || !exercise.testCases) {
      setTestResults(["No test cases provided for this exercise."])
      return
    }

    const results: string[] = []
    exercise.testCases.forEach((testCase, index) => {
      // Mock test execution (replace with actual runtime evaluation)
      if (code.trim() === exercise.solution.trim()) {
        results.push(`Test ${index + 1}: Passed (Input: ${testCase.input}, Expected: ${testCase.expectedOutput})`)
      } else {
        results.push(`Test ${index + 1}: Failed (Input: ${testCase.input}, Expected: ${testCase.expectedOutput})`)
      }
    })
    setTestResults(results)
  }

  if (!exercise) {
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
            onClick={() => router.push(`/learn/${moduleSlug}/practice/${lessonId}`)}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Practice Questions
          </Button>
          <h1 className="text-3xl font-bold mb-2">{exercise.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Lesson: {lessonTitle}</span>
            <span>•</span>
            <span>Module: {moduleTitle}</span>
            <span>•</span>
            <span>Difficulty: {["Easy", "Medium", "Hard", "Super Hard"][exercise.difficulty - 1]}</span>
          </div>
        </header>

        {/* Exercise Description */}
        <Card className="border-border bg-card p-6 mb-6">
          <div className="prose dark:prose-invert max-w-none">
            <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {exercise.description}
            </Markdown>
          </div>
        </Card>

        {/* Code Editor */}
        <Card className="border-border bg-card p-6 mb-6">
          <h2 className="text-lg font-bold mb-4">Code Editor</h2>
          <textarea
            className="w-full h-64 p-4 bg-muted rounded font-mono text-sm"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Write your code here..."
          />
          <div className="flex gap-4 mt-4">
            <Button onClick={runTests}>
              Run Tests
              <Play className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={() => setShowHints(!showHints)}>
              <Lightbulb className="mr-2 h-4 w-4" />
              {showHints ? "Hide Hints" : "Show Hints"}
            </Button>
            <Button variant="outline" onClick={() => setShowSolution(!showSolution)}>
              <Eye className="mr-2 h-4 w-4" />
              {showSolution ? "Hide Solution" : "Show Solution"}
            </Button>
          </div>
        </Card>

        {/* Hints */}
        {showHints && (
          <Card className="border-border bg-card p-6 mb-6">
            <h2 className="text-lg font-bold mb-4">Hints</h2>
            <ul className="list-disc pl-4">
              {exercise.hints.map((hint, index) => (
                <li key={index} className="text-sm text-muted-foreground">{hint}</li>
              ))}
            </ul>
          </Card>
        )}

        {/* Solution */}
        {showSolution && (
          <Card className="border-border bg-card p-6 mb-6">
            <h2 className="text-lg font-bold mb-4">Solution</h2>
            <pre className="bg-muted p-4 rounded">
              <code>{exercise.solution}</code>
            </pre>
          </Card>
        )}

        {/* Test Results */}
        {testResults.length > 0 && (
          <Card className="border-border bg-card p-6">
            <h2 className="text-lg font-bold mb-4">Test Results</h2>
            <ul className="list-disc pl-4">
              {testResults.map((result, index) => (
                <li
                  key={index}
                  className={`text-sm ${result.includes("Passed") ? "text-green-600" : "text-red-600"}`}
                >
                  {result}
                </li>
              ))}
            </ul>
          </Card>
        )}
      </div>
    </div>
  )
}