import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Code, Zap, Wrench } from "lucide-react"

export default function QuickStartPage() {
  const sdks = [
    {
      name: "@saros-finance/sdk",
      description: "TypeScript SDK for AMM, Stake, and Farm functionality",
      icon: <Code className="h-6 w-6" />,
      href: "/quickstart/sdk",
      features: ["Token Swapping", "Liquidity Management", "Staking", "Farming"],
      badge: "TypeScript",
    },
    {
      name: "@saros-finance/dlmm-sdk",
      description: "Dynamic Liquidity Market Maker SDK for advanced trading",
      icon: <Zap className="h-6 w-6" />,
      href: "/quickstart/dlmm",
      features: ["DLMM Pools", "Dynamic Fees", "Concentrated Liquidity", "Price Discovery"],
      badge: "TypeScript",
    },
    {
      name: "saros-dlmm-sdk-rs",
      description: "Rust SDK for DLMM with high performance and safety",
      icon: <Wrench className="h-6 w-6" />,
      href: "/quickstart/rust",
      features: ["Native Performance", "Memory Safety", "Zero-cost Abstractions", "DLMM Integration"],
      badge: "Rust",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-heading font-bold mb-4">Quick Start Guides</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose your preferred SDK and get started building on Saros in minutes. Each guide includes installation,
              setup, and your first integration.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
            {sdks.map((sdk) => (
              <Card
                key={sdk.name}
                className="relative overflow-hidden border-2 hover:border-primary/50 transition-colors"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {sdk.icon}
                      <Badge variant="secondary">{sdk.badge}</Badge>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-heading">{sdk.name}</CardTitle>
                  <CardDescription className="text-base">{sdk.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-muted-foreground">Key Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {sdk.features.map((feature) => (
                        <Badge key={feature} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button asChild className="w-full">
                    <Link href={sdk.href}>Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-heading font-bold mb-4">Need Help Choosing?</h2>
            <p className="text-muted-foreground mb-6">
              Not sure which SDK is right for your project? Check out our comparison guide.
            </p>
            <Button variant="outline" asChild>
              <Link href="/guides/comparison">Compare SDKs</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
