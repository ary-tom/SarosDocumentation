import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function SDKComparisonPage() {
  const sdks = [
    {
      name: "@saros-finance/sdk",
      type: "TypeScript",
      description: "Complete SDK for AMM, Staking, and Farming operations on Saros",
      bestFor: [
        "General DeFi applications",
        "Token swaps",
        "Liquidity provision",
        "Staking and farming"
      ],
      features: [
        "Simple API for common operations",
        "Built-in error handling",
        "Comprehensive documentation",
        "Active community support"
      ],
      performance: "Good",
      easeOfUse: "High",
      ecosystem: "Broad",
      icon: "🔷"
    },
    {
      name: "@saros-finance/dlmm-sdk",
      type: "TypeScript",
      description: "Dynamic Liquidity Market Maker for advanced trading strategies",
      bestFor: [
        "Advanced trading applications",
        "Concentrated liquidity",
        "Reduced slippage",
        "Capital efficiency"
      ],
      features: [
        "Dynamic liquidity bins",
        "Advanced position management",
        "Optimized price discovery",
        "Real-time market data"
      ],
      performance: "Excellent",
      easeOfUse: "Medium",
      ecosystem: "Specialized",
      icon: "⚡"
    },
    {
      name: "saros-dlmm-sdk-rs",
      type: "Rust",
      description: "High-performance Rust SDK for DLMM operations",
      bestFor: [
        "High-frequency trading",
        "Server-side applications",
        "Performance-critical systems",
        "Native Solana integration"
      ],
      features: [
        "Zero-cost abstractions",
        "Memory safety",
        "High-performance trading",
        "Native Solana integration"
      ],
      performance: "Exceptional",
      easeOfUse: "Low",
      ecosystem: "Specialized",
      icon: "🦀"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-8">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="font-heading text-4xl font-bold mb-4">SDK Comparison Guide</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the right Saros SDK for your project based on your specific needs, technical requirements, and development expertise.
            </p>
          </div>

          {/* Comparison Table */}
          <Card className="mb-12 overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl font-heading">Side-by-Side Comparison</CardTitle>
              <CardDescription>Detailed comparison of features, performance, and use cases</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-semibold">Feature</th>
                      {sdks.map((sdk) => (
                        <th key={sdk.name} className="text-center p-4 font-semibold">
                          <div className="flex flex-col items-center">
                            <span className="text-2xl mb-2">{sdk.icon}</span>
                            <span className="font-heading">{sdk.name}</span>
                            <Badge variant="secondary" className="mt-1">{sdk.type}</Badge>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="p-4 font-medium">Performance</td>
                      {sdks.map((sdk) => (
                        <td key={sdk.name} className="p-4 text-center">
                          <Badge variant={sdk.performance === "Exceptional" ? "default" : sdk.performance === "Excellent" ? "secondary" : "outline"}>
                            {sdk.performance}
                          </Badge>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="p-4 font-medium">Ease of Use</td>
                      {sdks.map((sdk) => (
                        <td key={sdk.name} className="p-4 text-center">
                          <Badge variant={sdk.easeOfUse === "High" ? "default" : sdk.easeOfUse === "Medium" ? "secondary" : "outline"}>
                            {sdk.easeOfUse}
                          </Badge>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="p-4 font-medium">Ecosystem</td>
                      {sdks.map((sdk) => (
                        <td key={sdk.name} className="p-4 text-center">
                          <Badge variant={sdk.ecosystem === "Broad" ? "default" : "secondary"}>
                            {sdk.ecosystem}
                          </Badge>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="p-4 font-medium">Best For</td>
                      {sdks.map((sdk) => (
                        <td key={sdk.name} className="p-4 text-center align-top">
                          <ul className="space-y-1 text-sm">
                            {sdk.bestFor.map((item, index) => (
                              <li key={index} className="flex items-start">
                                <span className="mr-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="p-4 font-medium">Key Features</td>
                      {sdks.map((sdk) => (
                        <td key={sdk.name} className="p-4 text-center align-top">
                          <ul className="space-y-1 text-sm">
                            {sdk.features.map((feature, index) => (
                              <li key={index} className="flex items-start">
                                <span className="mr-1">•</span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Quick Start</td>
                      {sdks.map((sdk) => (
                        <td key={sdk.name} className="p-4 text-center">
                          <Button asChild size="sm">
                            <Link href={`/quickstart/${sdk.name.includes("dlmm-sdk") ? "dlmm" : sdk.name.includes("rust") ? "rust" : "sdk"}`}>
                              Get Started
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Link>
                          </Button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Descriptions */}
          <div className="grid gap-8 md:grid-cols-3 mb-12">
            {sdks.map((sdk) => (
              <Card key={sdk.name} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center text-xl font-heading">
                        <span className="text-2xl mr-2">{sdk.icon}</span>
                        {sdk.name}
                      </CardTitle>
                      <CardDescription>{sdk.type}</CardDescription>
                    </div>
                    <Badge variant="outline">{sdk.performance} Performance</Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground mb-4">{sdk.description}</p>
                  <h3 className="font-semibold mb-2">Best For:</h3>
                  <ul className="space-y-1 mb-4">
                    {sdk.bestFor.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <h3 className="font-semibold mb-2">Key Features:</h3>
                  <ul className="space-y-1">
                    {sdk.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button asChild className="w-full">
                    <Link href={`/quickstart/${sdk.name.includes("dlmm-sdk") ? "dlmm" : sdk.name.includes("rust") ? "rust" : "sdk"}`}>
                      Quick Start Guide
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Decision Guide */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-heading">How to Choose the Right SDK</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-heading text-lg mb-2">1. Consider Your Project Requirements</h3>
                <p className="text-muted-foreground">
                  If you're building a general DeFi application with standard swap and liquidity features, 
                  the <code className="bg-muted px-1 rounded">@saros-finance/sdk</code> is the best choice. 
                  For advanced trading strategies that require concentrated liquidity and reduced slippage, 
                  consider the <code className="bg-muted px-1 rounded">@saros-finance/dlmm-sdk</code>. 
                  For high-performance, server-side applications, the Rust SDK is optimal.
                </p>
              </div>
              <div>
                <h3 className="font-heading text-lg mb-2">2. Evaluate Your Team's Expertise</h3>
                <p className="text-muted-foreground">
                  The TypeScript SDKs are easier to use and have extensive documentation, making them 
                  suitable for teams with JavaScript/TypeScript experience. The Rust SDK requires 
                  knowledge of Rust and Solana's low-level concepts but offers superior performance.
                </p>
              </div>
              <div>
                <h3 className="font-heading text-lg mb-2">3. Think About Performance Needs</h3>
                <p className="text-muted-foreground">
                  For most applications, the performance of the TypeScript SDKs is sufficient. However, 
                  if you're building high-frequency trading systems or applications that require 
                  maximum throughput, the Rust SDK's zero-cost abstractions and memory safety 
                  provide significant advantages.
                </p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-heading text-lg mb-2">Pro Tip</h3>
                <p className="text-muted-foreground">
                  You can combine SDKs in a single project. For example, use the TypeScript SDK for 
                  frontend interactions and the Rust SDK for backend services that require high performance.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}