"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Sparkles,
  BookOpen,
  Code,
  Award,
  TrendingUp,
  Clock,
  Target,
  CheckCircle2,
  Lock,
  ArrowRight,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"
import { WalletButton } from "@/components/wallet-button"

const learningModules = [
  {
    id: 1,
    title: "Solana Fundamentals",
    description: "Learn the basics of Solana blockchain architecture",
    progress: 100,
    status: "completed",
    lessons: 8,
    duration: "2 hours",
    icon: BookOpen,
  },
  {
    id: 2,
    title: "Rust Programming Basics",
    description: "Master Rust fundamentals for Solana development",
    progress: 65,
    status: "in-progress",
    lessons: 12,
    duration: "4 hours",
    icon: Code,
  },
  {
    id: 3,
    title: "Smart Contracts with Anchor",
    description: "Build your first Solana programs using Anchor framework",
    progress: 30,
    status: "in-progress",
    lessons: 15,
    duration: "6 hours",
    icon: Code,
  },
  {
    id: 4,
    title: "Token Programs & SPL",
    description: "Create and manage tokens on Solana",
    progress: 0,
    status: "locked",
    lessons: 10,
    duration: "3 hours",
    icon: Award,
  },
  {
    id: 5,
    title: "NFT Development",
    description: "Build NFT minting and marketplace features",
    progress: 0,
    status: "locked",
    lessons: 12,
    duration: "5 hours",
    icon: Award,
  },
  {
    id: 6,
    title: "DeFi Protocols",
    description: "Advanced DeFi concepts and implementation",
    progress: 0,
    status: "locked",
    lessons: 18,
    duration: "8 hours",
    icon: TrendingUp,
  },
]

const recentActivity = [
  {
    id: 1,
    type: "lesson",
    title: "Completed: Program Derived Addresses",
    time: "2 hours ago",
    icon: CheckCircle2,
  },
  {
    id: 2,
    type: "chat",
    title: "Asked AI Tutor about account validation",
    time: "5 hours ago",
    icon: MessageSquare,
  },
  {
    id: 3,
    type: "achievement",
    title: "Earned: Rust Basics Certificate",
    time: "1 day ago",
    icon: Award,
  },
]

const achievements = [
  { id: 1, title: "First Steps", description: "Complete your first lesson", earned: true },
  { id: 2, title: "Rust Novice", description: "Finish Rust Basics module", earned: true },
  { id: 3, title: "Code Warrior", description: "Write 10 Solana programs", earned: false },
  { id: 4, title: "AI Enthusiast", description: "Chat with AI Tutor 50 times", earned: false },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const overallProgress = Math.round(
    learningModules.reduce((acc, module) => acc + module.progress, 0) / learningModules.length,
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">AfroLearn AI</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/tutor">
                <Button variant="ghost" size="sm">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  AI Tutor
                </Button>
              </Link>
              <WalletButton />
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Welcome back, Learner!</h1>
          <p className="text-muted-foreground">Continue your journey to becoming a Solana developer</p>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <Card className="border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overall Progress</p>
                <p className="text-3xl font-bold">{overallProgress}%</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Modules Completed</p>
                <p className="text-3xl font-bold">1/6</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Learning Streak</p>
                <p className="text-3xl font-bold">7 days</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Time Invested</p>
                <p className="text-3xl font-bold">12h</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Clock className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="modules">Learning Modules</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Continue Learning */}
              <div className="lg:col-span-2">
                <h2 className="mb-4 text-xl font-bold">Continue Learning</h2>
                <Card className="border-border bg-card p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <Badge className="mb-2">In Progress</Badge>
                      <h3 className="mb-1 text-xl font-bold">Rust Programming Basics</h3>
                      <p className="text-sm text-muted-foreground">Lesson 8 of 12: Ownership and Borrowing</p>
                    </div>
                    <Code className="h-8 w-8 text-primary" />
                  </div>
                  <Progress value={65} className="mb-4" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">65% complete</span>
                    <Button>
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Recent Activity */}
              <div>
                <h2 className="mb-4 text-xl font-bold">Recent Activity</h2>
                <Card className="border-border bg-card p-6">
                  <div className="space-y-4">
                    {recentActivity.map((activity) => {
                      const Icon = activity.icon
                      return (
                        <div key={activity.id} className="flex gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.title}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </Card>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="mb-4 text-xl font-bold">Quick Actions</h2>
              <div className="grid gap-4 md:grid-cols-3">
                <Link href="/tutor">
                  <Card className="cursor-pointer border-border bg-card p-6 transition-colors hover:bg-accent">
                    <MessageSquare className="mb-3 h-8 w-8 text-primary" />
                    <h3 className="mb-1 font-bold">Ask AI Tutor</h3>
                    <p className="text-sm text-muted-foreground">Get instant help with your questions</p>
                  </Card>
                </Link>

                <Card className="cursor-pointer border-border bg-card p-6 transition-colors hover:bg-accent">
                  <Code className="mb-3 h-8 w-8 text-primary" />
                  <h3 className="mb-1 font-bold">Practice Coding</h3>
                  <p className="text-sm text-muted-foreground">Work on interactive exercises</p>
                </Card>

                <Card className="cursor-pointer border-border bg-card p-6 transition-colors hover:bg-accent">
                  <Award className="mb-3 h-8 w-8 text-primary" />
                  <h3 className="mb-1 font-bold">View Certificates</h3>
                  <p className="text-sm text-muted-foreground">See your earned credentials</p>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Modules Tab */}
          <TabsContent value="modules" className="space-y-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Learning Path</h2>
              <p className="text-sm text-muted-foreground">Complete modules in order to unlock new content</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {learningModules.map((module) => {
                const Icon = module.icon
                const isLocked = module.status === "locked"
                return (
                  <Card
                    key={module.id}
                    className={`border-border bg-card p-6 ${isLocked ? "opacity-60" : "cursor-pointer hover:bg-accent"}`}
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          {isLocked ? (
                            <Lock className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <Icon className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <div>
                          <h3 className="mb-1 font-bold">{module.title}</h3>
                          <p className="text-sm text-muted-foreground">{module.description}</p>
                        </div>
                      </div>
                      {module.status === "completed" && <CheckCircle2 className="h-5 w-5 text-primary" />}
                    </div>

                    <div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{module.lessons} lessons</span>
                      <span>•</span>
                      <span>{module.duration}</span>
                    </div>

                    {!isLocked && (
                      <>
                        <Progress value={module.progress} className="mb-2" />
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{module.progress}% complete</span>
                          {module.status === "in-progress" && (
                            <Button size="sm" variant="ghost">
                              Continue
                              <ArrowRight className="ml-2 h-3 w-3" />
                            </Button>
                          )}
                          {module.status === "completed" && (
                            <Button size="sm" variant="ghost">
                              Review
                            </Button>
                          )}
                        </div>
                      </>
                    )}

                    {isLocked && (
                      <Badge variant="secondary" className="w-full justify-center">
                        Complete previous modules to unlock
                      </Badge>
                    )}
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-4">
            <div className="mb-4">
              <h2 className="mb-2 text-xl font-bold">Your Achievements</h2>
              <p className="text-sm text-muted-foreground">Earn badges and certificates as you progress</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {achievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className={`border-border bg-card p-6 text-center ${achievement.earned ? "" : "opacity-50"}`}
                >
                  <div
                    className={`mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full ${achievement.earned ? "bg-primary/10" : "bg-muted"}`}
                  >
                    <Award className={`h-8 w-8 ${achievement.earned ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <h3 className="mb-1 font-bold">{achievement.title}</h3>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  {achievement.earned && (
                    <Badge className="mt-3" variant="default">
                      Earned
                    </Badge>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
