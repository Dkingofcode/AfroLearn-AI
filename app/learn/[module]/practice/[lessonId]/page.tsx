"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import { getModuleBySlug, getLessonById, Exercise, courseModules } from "@/lib/course-data"
import { useLanguage } from "@/contexts/language-context"

export default function PracticeQuestionsPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const params = useParams()
  const moduleSlug = params.module as string
  const lessonId = params.lessonId as string
  const [lesson, setLesson] = useState<{ title: string; exercises: Exercise[] } | null>(null)
  const [moduleTitle, setModuleTitle] = useState<string>("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const module = getModuleBySlug(moduleSlug)
    if (module) {
      setModuleTitle(module.title)
      const foundLesson = getLessonById(moduleSlug, lessonId)
      if (foundLesson) {
        setLesson({ title: foundLesson.title, exercises: foundLesson.exercises })
      } else {
        router.push(`/learn/${moduleSlug}`)
      }
    } else {
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

  const handleExerciseSelect = (exerciseId: string) => {
    router.push(`/learn/${moduleSlug}/practice/${lessonId}/${exerciseId}`)
  }

  const handleModuleLessonSelect = (moduleSlug: string, lessonId: string, exerciseId?: string) => {
    const path = exerciseId
      ? `/learn/${moduleSlug}/practice/${lessonId}/${exerciseId}`
      : `/learn/${moduleSlug}/practice/${lessonId}`
    router.push(path)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : lesson.exercises.length - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < lesson.exercises.length - 1 ? prev + 1 : 0))
  }

  const currentExercise = lesson.exercises[currentIndex]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar for All Modules and Exercises */}
        <aside className="w-full lg:w-1/4 bg-card border-border rounded-lg p-4 h-fit sticky top-8">
          <h2 className="text-xl font-bold mb-4">All Modules & Exercises</h2>
          {courseModules.map((module) => (
            <div key={module.id} className="mb-6">
              <h3 className="font-semibold text-lg mb-2">{module.title}</h3>
              {module.lessons.map((lesson) =>
                lesson.exercises.length > 0 && (
                  <div key={lesson.id} className="ml-4 mb-2">
                    <p className="text-sm font-medium mb-1">{lesson.title}</p>
                    <ul className="list-disc pl-5 text-sm">
                      {lesson.exercises.map((exercise) => (
                        <li
                          key={exercise.id}
                          className="cursor-pointer text-muted-foreground hover:text-foreground"
                          onClick={() =>
                            handleModuleLessonSelect(module.slug, lesson.id, exercise.id)
                          }
                        >
                          {exercise.title} ({["Easy", "Medium", "Hard", "Super Hard"][exercise.difficulty - 1]})
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              )}
            </div>
          ))}
        </aside>

        {/* Main Content */}
        <div className="w-full lg:w-3/4">
          {/* Header */}
          <header className="mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push(`/learn/${moduleSlug}`)}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to {moduleTitle}
            </Button>
            <h1 className="text-3xl font-bold mb-2">Practice Questions - {lesson.title}</h1>
            <p className="text-sm text-muted-foreground">
              Select an exercise to start solving or navigate through them.
            </p>
          </header>

          {/* Exercise List */}
          <Card className="border-border bg-card mb-6">
            <CardHeader>
              <CardTitle className="text-xl">Exercises</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lesson.exercises.map((exercise, index) => (
                  <div
                    key={exercise.id}
                    className={`p-4 rounded-md cursor-pointer ${
                      currentIndex === index ? "bg-muted" : "hover:bg-muted"
                    }`}
                    onClick={() => handleExerciseSelect(exercise.id)}
                  >
                    <h3 className="font-medium">{exercise.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Difficulty: {["Easy", "Medium", "Hard", "Super Hard"][exercise.difficulty - 1]}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center mb-6">
            <Button variant="outline" onClick={handlePrev} disabled={lesson.exercises.length <= 1}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} of {lesson.exercises.length}
            </span>
            <Button variant="outline" onClick={handleNext} disabled={lesson.exercises.length <= 1}>
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Current Exercise Preview */}
          {currentExercise && (
            <Card className="border-border bg-card p-6">
              <h2 className="text-lg font-bold mb-2">{currentExercise.title}</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Difficulty: {["Easy", "Medium", "Hard", "Super Hard"][currentExercise.difficulty - 1]}
              </p>
              <p className="text-sm mb-4">{currentExercise.description}</p>
              <Button
                onClick={() => handleExerciseSelect(currentExercise.id)}
                className="mt-4"
              >
                Start Solving
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}