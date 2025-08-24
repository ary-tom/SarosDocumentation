"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Zap, AlertTriangle, CheckCircle, XCircle, Lightbulb, Loader2, Code } from "lucide-react"

export default function AICheckerPage() {
  const [code, setCode] = useState("")
  const [analysis, setAnalysis] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyzeCode = async () => {
    if (!code.trim()) return

    setIsAnalyzing(true)
    setAnalysis(null)

    try {
      const response = await fetch("/api/ai-checker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze code")
      }

      const analysisResult = await response.json()
      setAnalysis(analysisResult)
    } catch (error) {
      console.error(error)
      // Handle error state if needed
    } finally {
      setIsAnalyzing(false)
    }
  }

  const sampleCode = `import { getSwapAmountSaros, swapSaros } from '@saros-finance/sdk';

async function performSwap() {
  const result = await swapSaros(
    connection,
    fromToken,
    toToken,
    amount,
    minAmount,
    null,
    poolAddress,
    programAddress,
    wallet,
    fromMint,
    toMint
  );
  
  console.log(result.hash);
}`

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-8">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">
                <Zap className="mr-1 h-3 w-3" />
                AI-Powered Analysis
              </Badge>
              <Badge variant="outline">Beta</Badge>
            </div>
            <h1 className="font-heading text-4xl font-bold mb-4">AI Code Checker</h1>
            <p className="text-xl text-muted-foreground">
              Get instant feedback on your Saros SDK code. Our AI analyzes your code for best practices, potential
              issues, and optimization opportunities.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Code Input */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Code className="mr-2 h-5 w-5" />
                    Your Code
                  </CardTitle>
                  <CardDescription>Paste your Saros SDK code here for analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder={sampleCode}
                    className="min-h-[400px] font-mono text-sm"
                  />
                  <div className="flex gap-2 mt-4">
                    <Button onClick={analyzeCode} disabled={!code.trim() || isAnalyzing} className="flex-1">
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Zap className="mr-2 h-4 w-4" />
                          Analyze Code
                        </>
                      )}
                    </Button>
                    <Button variant="outline" onClick={() => setCode(sampleCode)}>
                      Load Sample
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Analysis Results */}
            <div>
              {!analysis && !isAnalyzing && (
                <Card>
                  <CardHeader>
                    <CardTitle>Analysis Results</CardTitle>
                    <CardDescription>Your code analysis will appear here</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center h-[400px] text-muted-foreground">
                    <div className="text-center">
                      <Zap className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Paste your code and click "Analyze Code" to get started</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {isAnalyzing && (
                <Card>
                  <CardHeader>
                    <CardTitle>Analyzing Your Code</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center h-[400px]">
                    <div className="text-center">
                      <Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin text-primary" />
                      <p className="text-muted-foreground">AI is reviewing your code...</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {analysis && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Analysis Results</CardTitle>
                      <Badge
                        variant={analysis.score >= 90 ? "default" : analysis.score >= 70 ? "secondary" : "destructive"}
                      >
                        Score: {analysis.score}/100
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="issues" className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="issues">Issues</TabsTrigger>
                        <TabsTrigger value="suggestions">Tips</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                        <TabsTrigger value="performance">Performance</TabsTrigger>
                      </TabsList>

                      <TabsContent value="issues" className="mt-4 space-y-3">
                        {analysis.issues.map((issue: any, index: number) => (
                          <Alert
                            key={index}
                            className={
                              issue.type === "error"
                                ? "border-destructive"
                                : issue.type === "warning"
                                  ? "border-yellow-500"
                                  : "border-blue-500"
                            }
                          >
                            {issue.type === "error" && <XCircle className="h-4 w-4" />}
                            {issue.type === "warning" && <AlertTriangle className="h-4 w-4" />}
                            {issue.type === "info" && <CheckCircle className="h-4 w-4" />}
                            <AlertDescription>
                              <div className="font-medium mb-1">
                                Line {issue.line}: {issue.message}
                              </div>
                              <div className="text-sm text-muted-foreground">{issue.suggestion}</div>
                            </AlertDescription>
                          </Alert>
                        ))}
                      </TabsContent>

                      <TabsContent value="suggestions" className="mt-4 space-y-2">
                        {analysis.suggestions.map((suggestion: string, index: number) => (
                          <div key={index} className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
                            <Lightbulb className="h-4 w-4 mt-0.5 text-yellow-500" />
                            <span className="text-sm">{suggestion}</span>
                          </div>
                        ))}
                      </TabsContent>

                      <TabsContent value="security" className="mt-4 space-y-2">
                        {analysis.security.map((item: string, index: number) => (
                          <div
                            key={index}
                            className="flex items-start gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-950/20"
                          >
                            <AlertTriangle className="h-4 w-4 mt-0.5 text-red-500" />
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </TabsContent>

                      <TabsContent value="performance" className="mt-4 space-y-2">
                        {analysis.performance.map((item: string, index: number) => (
                          <div
                            key={index}
                            className="flex items-start gap-2 p-3 rounded-lg bg-green-50 dark:bg-green-950/20"
                          >
                            <Zap className="h-4 w-4 mt-0.5 text-green-500" />
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          

          {/* Features */}
          <div className="grid gap-6 md:grid-cols-3 mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Code Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Analyzes your code structure, naming conventions, and adherence to best practices.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Security Checks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Identifies potential security vulnerabilities and suggests safer alternatives.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Performance Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Provides optimization suggestions to improve your code's efficiency and speed.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
