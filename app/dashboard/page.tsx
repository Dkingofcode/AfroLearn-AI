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
  ArrowLeft as ArrowLeftIcon,
} from "lucide-react"
import Link from "next/link"
import { WalletButton } from "@/components/wallet-button"
import {
  SolanaSignAndSendTransaction,
  SolanaSignIn,
  SolanaSignMessage,
  SolanaSignTransaction,
  type SolanaSignAndSendTransactionFeature,
  type SolanaSignInFeature,
  type SolanaSignMessageFeature,
  type SolanaSignTransactionFeature,
} from '@solana/wallet-standard-features'
import {
  StandardConnect,
  StandardDisconnect,
  type StandardConnectFeature,
  type StandardDisconnectFeature,
} from '@wallet-standard/core'
import { isSolanaChain } from '@solana/wallet-standard-chains'
import { getWalletFeature, useWallets, type UiWallet, type UiWalletAccount } from '@wallet-standard/react'
import {
  getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  getWalletForHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
} from '@wallet-standard/ui-registry'
import {
  address,
  getBase58Decoder,
  getPublicKeyFromAddress,
  getUtf8Encoder,
  signatureBytes,
  verifySignature,
} from '@solana/kit'
import { useLanguage } from "@/contexts/language-context"
import { courseModules, getModuleBySlug, getLessonById, Module, Lesson } from "@/lib/course-data" // Import from course-data
//import { useRouter } from "next/router"
import { useRouter } from "next/navigation"


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
  const wallets = useWallets()
  const solanaWallets = wallets.filter(({ chains }) => chains.some((chain) => isSolanaChain(chain)))
  const [wallet, setWallet] = useState<UiWallet | undefined>(undefined)
  const [account, setAccount] = useState<UiWalletAccount | undefined>(undefined)
  const { t } = useLanguage()

  const [selectedModule, setSelectedModule] = useState<Module | null>(null)
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)

  const overallProgress = Math.round(
    courseModules.reduce((acc, module) => acc + module.id || 0, 0) / courseModules.length,
  )

  const router = useRouter();

  const handleModuleClick = (module: Module) => {
    setSelectedModule(module)
    setSelectedLesson(null)
  }

  const handleLessonClick = (lesson: Lesson) => {
    setSelectedLesson(lesson)
  }

  const handleBackToModules = () => {
    setSelectedModule(null)
    setSelectedLesson(null)
  }

  const handleBackToLessons = () => {
    setSelectedLesson(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container  mx-auto px-4 py-2">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">AfroLearn AI</span>
              </Link>
            </div>
            <div className="flex items-center  gap-4">
              <Link href="/tutor">
                <Button variant="ghost" size="sm">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  AI Tutor
                </Button>
              </Link>
              <div className="max-h-screen bg-black  p-2 text-white">
                <div className="max-w-xl mx-auto text-center">
                  <h1 className="text-4xl font-bold mb-8">Wallets</h1>
                  {wallet ? (
                    <div className="flex flex-col gap-4">
                      {account ? (
                        <div className="mb-4">
                          <p>Wallet: {wallet.name}</p>
                          <p>Account Address: {account.address && "connected"  }</p>
                        </div>
                      ) : null}
                      <div className="flex  gap-2">
                      {wallet.features.map((feature) => {
                        switch (feature) {
                          case StandardConnect: {
                            if (account) {
                              return null
                            }
                            const { connect } = getWalletFeature(
                              wallet,
                              StandardConnect,
                            ) as StandardConnectFeature[typeof StandardConnect]
                            return (
                              <Button
                                key={feature}
                                onClick={async () => {
                                  const response = await connect()
                                  setAccount(
                                    getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED(
                                      getWalletForHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED(wallet),
                                      response.accounts[0],
                                    ),
                                  )
                                }}
                              >
                                Connect
                              </Button>
                            )
                          }
                          case StandardDisconnect: {
                            if (!account) {
                              return null
                            }
                            const { disconnect } = getWalletFeature(
                              wallet,
                              StandardDisconnect,
                            ) as StandardDisconnectFeature[typeof StandardDisconnect]
                            return (
                              <Button key={feature} onClick={() => disconnect()}>
                                Disconnect
                              </Button>
                            )
                          }
                          case SolanaSignIn: {
                            if (!account) {
                              return null
                            }
                            const { signIn } = getWalletFeature(wallet, SolanaSignIn) as SolanaSignInFeature[typeof SolanaSignIn]
                            return (
                              <Button key={feature} onClick={() => signIn()}>
                                Sign In
                              </Button>
                            )
                          }
                          default:
                            return null
                        }
                      })}
                      </div>
                    </div>
                  ) : (
                    <>
                      {solanaWallets.length ? (
                        <div className="flex flex-col gap-4">
                          {solanaWallets.map((wallet) => (
                            <Button key={wallet.icon} onClick={() => setWallet(wallet)}>
                              {wallet.icon && <img src={wallet.icon} alt={wallet.name} className="size-5" />}
                              <span className="text-left">{wallet.name}</span>
                            </Button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xl text-white/70">No wallets found</p>
                      )}
                    </>
                  )}
                </div>
              </div>
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
                <p className="text-3xl font-bold">1/3</p> {/* Updated to 3 modules */}
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
                    <Button onClick={() => router.push('/learn/rust-programming-basics')}>
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

                <Card onClick={() => router.push('/learn/rust-fundamentals/practice/rust-1-1')} className="cursor-pointer border-border bg-card p-6 transition-colors hover:bg-accent">
                  <Code className="mb-3 h-8 w-8 text-primary" />
                  <h3 className="mb-1 font-bold">Practice Coding</h3>
                  <p className="text-sm text-muted-foreground">Work on interactive exercises</p>
                </Card>

                <Card onClick={() => router.push('/certificates')} className="cursor-pointer border-border bg-card p-6 transition-colors hover:bg-accent">
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
              {courseModules.map((module) => {
                const Icon = module.icon
                const isLocked = module.id === 0 && module.slug === "locked" // Use progress or status from data
                return (
                  <Card
                    key={module.id}
                    className={`border-border bg-card p-6 ${isLocked ? "opacity-60" : "cursor-pointer hover:bg-accent"}`}
                    onClick={() => !isLocked && router.push(`/learn/${module.slug}`)}
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          {isLocked ? (
                            <Lock className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <Icon  />
                          )}
                        </div>
                        <div>
                          <h3 className="mb-1 font-bold">{module.title}</h3>
                          <p className="text-sm text-muted-foreground">{module.description}</p>
                        </div>
                      </div>
                      {module.slug === "completed" && <CheckCircle2 className="h-5 w-5 text-primary" />}
                    </div>

                    <div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{module.lessons.length} lessons</span>
                      <span>•</span>
                      <span>{module.duration}</span>
                    </div>

                    {!isLocked && (
                      <>
                        <Progress value={module.id} className="mb-2" />
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{module.id}% complete</span>
                          {module.slug === "in-progress" && (
                            <Button size="sm" variant="ghost">
                              Continue
                              <ArrowRight className="ml-2 h-3 w-3" />
                            </Button>
                          )}
                          {module.slug === "completed" && (
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

            {/* Lessons List for Selected Module */}
            {selectedModule && !selectedLesson && (
              <div className="mt-8">
                <div className="flex items-center gap-4 mb-4">
                  <Button variant="ghost" size="sm" onClick={handleBackToModules}>
                    <ArrowLeftIcon className="mr-2 h-4 w-4" />
                    Back to Modules
                  </Button>
                  <h2 className="text-xl font-bold">{selectedModule.title} Lessons</h2>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {selectedModule.lessons.map((lesson) => (
                    <Card
                      key={lesson.id}
                      className="border-border bg-card p-6 cursor-pointer hover:bg-accent"
                      onClick={() => router.push(`/learn/${selectedModule.slug}/${lesson.id}`)}
                    >
                      <h3 className="mb-2 font-bold">{lesson.title}</h3>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{lesson.duration}</span>
                        <span>•</span>
                        <span>{lesson.type}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Lesson Detail for Selected Lesson */}
            {selectedLesson && (
              <div className="mt-8">
                <div className="flex items-center gap-4 mb-4">
                  <Button variant="ghost" size="sm" onClick={handleBackToLessons}>
                    <ArrowLeftIcon className="mr-2 h-4 w-4" />
                    Back to Lessons
                  </Button>
                  <h2 className="text-xl font-bold">{selectedLesson.title}</h2>
                </div>
                <Card className="border-border bg-card p-6">
                  <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: selectedLesson.content }} />
                  <h3 className="mt-6 mb-4 text-lg font-bold">Exercises</h3>
                  {selectedLesson.exercises.map((exercise) => (
                    <Card key={exercise.id} className="mt-4 p-4">
                      <h4 className="font-semibold">{exercise.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">Difficulty: {exercise.difficulty}</p>
                      <p className="mb-4">{exercise.description}</p>
                      <pre className="bg-muted p-4 rounded mb-4">
                        <code>{exercise.starterCode}</code>
                      </pre>
                      <div className="mt-4">
                        <h5 className="font-semibold mb-2">Hints</h5>
                        <ul className="list-disc pl-4">
                          {exercise.hints.map((hint, index) => (
                            <li key={index} className="text-sm text-muted-foreground">{hint}</li>
                          ))}
                        </ul>
                      </div>
                      {/* You can add a toggle for solution if needed */}
                      {/* <details className="mt-4">
                        <summary className="cursor-pointer font-semibold">Show Solution</summary>
                        <pre className="bg-muted p-4 rounded mt-2">
                          <code>{exercise.solution}</code>
                        </pre>
                      </details> */}
                    </Card>
                  ))}
                </Card>
              </div>
            )}
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