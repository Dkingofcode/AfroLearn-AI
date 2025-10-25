"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, CheckCircle2, XCircle, Lightbulb, Eye, EyeOff } from "lucide-react"
import type { Exercise } from "@/lib/course-data"
import { useLanguage } from "@/contexts/language-context"

interface CodeEditorProps {
  exercise: Exercise
}

export function CodeEditor({ exercise }: CodeEditorProps) {
  const { tc } = useLanguage()
  const [code, setCode] = useState(exercise.starterCode)
  const [showSolution, setShowSolution] = useState(false)
  const [showHints, setShowHints] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const getDifficultyStars = (difficulty: number) => {
    return "🌟".repeat(difficulty)
  }

  const runCode = () => {
    // Simulate code execution
    // In a real implementation, this would compile and run the Rust code
    const isCorrect = code.trim() === exercise.solution.trim()

    setResult({
      success: isCorrect,
      message: isCorrect
        ? "✅ Success! Your code compiles and passes all tests!"
        : "❌ Your code doesn't compile yet. Check the hints or try again!",
    })
  }

  const resetCode = () => {
    setCode(exercise.starterCode)
    setResult(null)
    setShowSolution(false)
    setShowHints(false)
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-balance">{exercise.title}</CardTitle>
              <Badge variant="secondary">
                {getDifficultyStars(exercise.difficulty)} {tc(`difficulty.${exercise.difficulty}`)}
              </Badge>
            </div>
            <CardDescription className="text-pretty">{exercise.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="editor" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="editor">Code Editor</TabsTrigger>
            <TabsTrigger value="hints">
              <Lightbulb className="h-4 w-4 mr-2" />
              {tc("lesson.hints")} ({exercise.hints.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="space-y-4">
            {/* Code Editor */}
            <div className="relative">
              <textarea
                value={showSolution ? exercise.solution : code}
                onChange={(e) => !showSolution && setCode(e.target.value)}
                className="w-full h-96 p-4 font-mono text-sm bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                spellCheck={false}
                disabled={showSolution}
              />
              {showSolution && (
                <div className="absolute top-2 right-2">
                  <Badge variant="default">{tc("lesson.solution")}</Badge>
                </div>
              )}
            </div>

            {/* Result */}
            {result && (
              <Card
                className={`border-2 ${result.success ? "border-primary bg-primary/5" : "border-destructive bg-destructive/5"}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {result.success ? (
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                    )}
                    <p className="text-sm">{result.message}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2 flex-wrap">
              <Button onClick={runCode} disabled={showSolution}>
                <Play className="h-4 w-4 mr-2" />
                {tc("lesson.runCode")}
              </Button>
              <Button variant="outline" onClick={resetCode}>
                {tc("lesson.resetCode")}
              </Button>
              <Button variant="outline" onClick={() => setShowSolution(!showSolution)}>
                {showSolution ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                {showSolution ? tc("lesson.hideSolution") : tc("lesson.showSolution")}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="hints" className="space-y-4">
            <Card className="border-border bg-muted/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  {tc("lesson.hints")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {exercise.hints.map((hint, index) => (
                  <div key={index} className="flex gap-3">
                    <Badge variant="outline" className="shrink-0">
                      {index + 1}
                    </Badge>
                    <p className="text-sm text-pretty">{hint}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
