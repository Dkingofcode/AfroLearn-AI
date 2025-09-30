"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, ThumbsUp, Eye, Clock, TrendingUp, Users, Search, Plus, Pin, CheckCircle2 } from "lucide-react"
import Link from "next/link"

// Mock forum data
const forumCategories = [
  { id: 1, name: "General Discussion", count: 234, icon: MessageSquare },
  { id: 2, name: "Technical Help", count: 156, icon: Users },
  { id: 3, name: "Project Showcase", count: 89, icon: TrendingUp },
  { id: 4, name: "Study Groups", count: 67, icon: Users },
]

const trendingTopics = [
  {
    id: 1,
    title: "How to optimize Solana transaction fees?",
    author: "Kwame_Dev",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    category: "Technical Help",
    replies: 23,
    views: 456,
    likes: 34,
    isPinned: true,
    isSolved: true,
    timeAgo: "2 hours ago",
  },
  {
    id: 2,
    title: "Built my first NFT marketplace on Solana!",
    author: "Amara_Codes",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    category: "Project Showcase",
    replies: 45,
    views: 892,
    likes: 67,
    isPinned: false,
    isSolved: false,
    timeAgo: "5 hours ago",
  },
  {
    id: 3,
    title: "Study group for Anchor framework - Join us!",
    author: "Chidi_Learn",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    category: "Study Groups",
    replies: 12,
    views: 234,
    likes: 28,
    isPinned: false,
    isSolved: false,
    timeAgo: "1 day ago",
  },
  {
    id: 4,
    title: "Understanding Program Derived Addresses (PDAs)",
    author: "Zara_Blockchain",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    category: "Technical Help",
    replies: 18,
    views: 567,
    likes: 42,
    isPinned: false,
    isSolved: true,
    timeAgo: "2 days ago",
  },
  {
    id: 5,
    title: "Best practices for Solana smart contract security",
    author: "Kofi_Security",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    category: "General Discussion",
    replies: 31,
    views: 723,
    likes: 56,
    isPinned: true,
    isSolved: false,
    timeAgo: "3 days ago",
  },
]

const recentActivity = [
  {
    id: 1,
    user: "Amina_Dev",
    action: "replied to",
    topic: "Solana vs Ethereum gas fees",
    timeAgo: "5 minutes ago",
  },
  {
    id: 2,
    user: "Tunde_Code",
    action: "created",
    topic: "Help with Metaplex NFT minting",
    timeAgo: "15 minutes ago",
  },
  {
    id: 3,
    user: "Fatima_Web3",
    action: "liked",
    topic: "My first DeFi protocol",
    timeAgo: "30 minutes ago",
  },
]

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showNewTopicForm, setShowNewTopicForm] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-balance">Community Forum</h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Connect, collaborate, and learn together with fellow Solana developers
              </p>
            </div>
            <Button onClick={() => setShowNewTopicForm(!showNewTopicForm)}>
              <Plus className="h-4 w-4 mr-2" />
              New Topic
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search topics, questions, or users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* New Topic Form */}
        {showNewTopicForm && (
          <Card className="mb-8 border-border bg-card">
            <CardHeader>
              <CardTitle>Create New Topic</CardTitle>
              <CardDescription>Start a discussion or ask a question</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Title</label>
                <Input placeholder="What's your topic about?" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                  <option>General Discussion</option>
                  <option>Technical Help</option>
                  <option>Project Showcase</option>
                  <option>Study Groups</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea placeholder="Provide details about your topic..." rows={6} />
              </div>
              <div className="flex gap-2">
                <Button>Post Topic</Button>
                <Button variant="outline" onClick={() => setShowNewTopicForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="trending" className="w-full">
              <TabsList className="w-full justify-start mb-6">
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
              </TabsList>

              <TabsContent value="trending" className="space-y-4">
                {trendingTopics.map((topic) => (
                  <Card key={topic.id} className="border-border bg-card hover:border-primary/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={topic.authorAvatar || "/placeholder.svg"} />
                          <AvatarFallback>{topic.author[0]}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                {topic.isPinned && <Pin className="h-4 w-4 text-primary" />}
                                <Link
                                  href={`/community/topic/${topic.id}`}
                                  className="text-lg font-semibold hover:text-primary transition-colors text-balance"
                                >
                                  {topic.title}
                                </Link>
                                {topic.isSolved && <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>{topic.author}</span>
                                <span>•</span>
                                <Badge variant="secondary" className="text-xs">
                                  {topic.category}
                                </Badge>
                                <span>•</span>
                                <Clock className="h-3 w-3" />
                                <span>{topic.timeAgo}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" />
                              <span>{topic.replies}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              <span>{topic.views}</span>
                            </div>
                            <Button variant="ghost" size="sm" className="h-auto p-0 hover:bg-transparent">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              <span>{topic.likes}</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="recent" className="space-y-4">
                <p className="text-muted-foreground text-center py-8">Recent topics will appear here</p>
              </TabsContent>

              <TabsContent value="unanswered" className="space-y-4">
                <p className="text-muted-foreground text-center py-8">Unanswered questions will appear here</p>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Categories */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {forumCategories.map((category) => {
                  const Icon = category.icon
                  return (
                    <Link
                      key={category.id}
                      href={`/community/category/${category.id}`}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-primary" />
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <Badge variant="secondary">{category.count}</Badge>
                    </Link>
                  )
                })}
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Community Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Topics</span>
                  <span className="text-lg font-bold">546</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Active Members</span>
                  <span className="text-lg font-bold">1,234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Posts Today</span>
                  <span className="text-lg font-bold">89</span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="text-sm">
                    <p>
                      <span className="font-medium">{activity.user}</span>{" "}
                      <span className="text-muted-foreground">{activity.action}</span>{" "}
                      <Link href="#" className="text-primary hover:underline">
                        {activity.topic}
                      </Link>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.timeAgo}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
