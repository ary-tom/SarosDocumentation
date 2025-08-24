import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, BookOpen, ArrowRight, Wheat } from "lucide-react"

export default function TutorialsPage() {
  const tutorials = [
    {
      title: "Your First Token Swap",
      description: "Learn how to swap tokens using the Saros AMM with step-by-step instructions",
      duration: "10 min",
      difficulty: "Beginner",
      students: "1.2k",
      href: "/tutorials/swap",
      topics: ["Setup", "Connection", "Swap Execution", "Error Handling"],
      sdk: "@saros-finance/sdk",
    },
    {
      title: "Liquidity Provider Guide",
      description: "Become a liquidity provider and earn fees from trading activity",
      duration: "15 min",
      difficulty: "Intermediate",
      students: "856",
      href: "/tutorials/liquidity",
      topics: ["Pool Selection", "Risk Assessment", "Adding Liquidity", "Monitoring Returns"],
      sdk: "@saros-finance/sdk",
    },
    {
      title: "Staking for Rewards",
      description: "Stake your tokens to earn rewards and participate in governance",
      duration: "12 min",
      difficulty: "Beginner",
      students: "2.1k",
      href: "/tutorials/staking",
      topics: ["Staking Pools", "Reward Calculation", "Unstaking", "Compound Strategies"],
      sdk: "@saros-finance/sdk",
    },
    {
      title: "DLMM Pool Management",
      description: "Master dynamic liquidity market making with concentrated liquidity",
      duration: "25 min",
      difficulty: "Advanced",
      students: "423",
      href: "/tutorials/dlmm",
      topics: ["DLMM Concepts", "Pool Creation", "Bin Management", "Fee Optimization"],
      sdk: "@saros-finance/dlmm-sdk",
    },
    {
      title: "Yield Farming Strategies",
      description: "Maximize your returns with advanced farming techniques",
      duration: "20 min",
      difficulty: "Intermediate",
      students: "634",
      href: "/tutorials/farming",
      topics: ["Farm Selection", "Risk Management", "Compounding", "Exit Strategies"],
      sdk: "@saros-finance/sdk",
      icon: <Wheat className="h-4 w-4" />,
    },
    {
      title: "Rust SDK Integration",
      description: "Build high-performance applications with the Rust SDK",
      duration: "30 min",
      difficulty: "Advanced",
      students: "289",
      href: "/tutorials/rust",
      topics: ["Environment Setup", "Client Configuration", "Error Handling", "Performance Tips"],
      sdk: "saros-dlmm-sdk-rs",
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-heading font-bold mb-4">Step-by-Step Tutorials</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive guides that take you from concept to implementation. Learn by doing with real-world examples
              and best practices.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {tutorials.map((tutorial) => (
              <Card key={tutorial.title} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {tutorial.sdk}
                    </Badge>
                    <Badge className={getDifficultyColor(tutorial.difficulty)}>{tutorial.difficulty}</Badge>
                  </div>
                  <CardTitle className="text-xl font-heading flex items-center">
                    {tutorial.icon && <span className="mr-2">{tutorial.icon}</span>}
                    {tutorial.title}
                  </CardTitle>
                  <CardDescription className="text-base">{tutorial.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {tutorial.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {tutorial.students} students
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">What you'll learn:</h4>
                    <div className="flex flex-wrap gap-1">
                      {tutorial.topics.map((topic) => (
                        <Badge key={topic} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button asChild className="w-full">
                    <Link href={tutorial.href}>
                      <BookOpen className="mr-2 h-4 w-4" />
                      Start Tutorial
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 bg-muted/50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-heading font-bold mb-4">Learning Path Recommendations</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              New to Saros? Follow our recommended learning path to master the SDKs step by step.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <Badge variant="outline">1. Token Swap</Badge>
              <ArrowRight className="h-4 w-4 mt-1 text-muted-foreground" />
              <Badge variant="outline">2. Liquidity Provider</Badge>
              <ArrowRight className="h-4 w-4 mt-1 text-muted-foreground" />
              <Badge variant="outline">3. Staking</Badge>
              <ArrowRight className="h-4 w-4 mt-1 text-muted-foreground" />
              <Badge variant="outline">4. Yield Farming</Badge>
              <ArrowRight className="h-4 w-4 mt-1 text-muted-foreground" />
              <Badge variant="outline">5. Advanced DLMM</Badge>
            </div>
            <Button variant="outline" asChild>
              <Link href="/tutorials/swap">Start Learning Path</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
