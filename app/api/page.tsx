import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Book, Code2, Zap, Wrench } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function APIReferencePage() {
  const sdks = [
    {
      name: "@saros-finance/sdk",
      description: "Complete TypeScript SDK for AMM, Staking, and Farming",
      icon: <Code2 className="h-6 w-6" />,
      href: "/api/sdk",
      modules: ["Swap", "Pool", "Stake", "Farm", "Utils"],
      methods: 45,
      badge: "TypeScript",
    },
    {
      name: "@saros-finance/dlmm-sdk",
      description: "Dynamic Liquidity Market Maker SDK",
      icon: <Zap className="h-6 w-6" />,
      href: "/api/dlmm",
      modules: ["LiquidityBookServices", "Types"],
      methods: 32,
      badge: "TypeScript",
    },
    {
      name: "saros-dlmm-sdk-rs",
      description: "High-performance Rust SDK for DLMM",
      icon: <Wrench className="h-6 w-6" />,
      href: "/api/rust",
      modules: ["DlmmClient", "Structs"],
      methods: 28,
      badge: "Rust",
    },
  ]

  const commonMethods = [
    {
      name: "getSwapAmountSaros()",
      description: "Calculate the output amount for a swap",
      sdk: "@saros-finance/sdk",
      parameters: ["connection", "fromMint", "toMint", "fromAmount", "slippage", "pool"],
      returns: "Promise<SwapQuote>",
      example: "/examples/swap"
    },
    {
      name: "swapSaros()",
      description: "Execute a token swap",
      sdk: "@saros-finance/sdk",
      parameters: ["connection", "fromTokenAccount", "toTokenAccount", "fromAmount", "toAmount", "referral", "poolAddress", "programAddress", "owner", "fromMint", "toMint"],
      returns: "Promise<SwapResult>",
      example: "/examples/swap"
    },
    {
      name: "getQuote()",
      description: "Get a quote for a DLMM swap operation",
      sdk: "@saros-finance/dlmm-sdk",
      parameters: ["params"],
      returns: "Promise<QuoteResult>",
      example: "/examples/dlmm"
    },
    {
      name: "swap()",
      description: "Create a transaction for swapping tokens in DLMM",
      sdk: "@saros-finance/dlmm-sdk",
      parameters: ["params"],
      returns: "Promise<Transaction>",
      example: "/examples/dlmm"
    },
    {
      name: "stakePool()",
      description: "Stake LP tokens in a farming pool",
      sdk: "@saros-finance/sdk",
      parameters: ["connection", "payer", "poolAddress", "amount", "programAddress", "rewards", "lpTokenAccount"],
      returns: "Promise<string>",
      example: "/examples/staking"
    },
    {
      name: "claimReward()",
      description: "Claim rewards from a farming pool",
      sdk: "@saros-finance/sdk",
      parameters: ["connection", "payer", "poolRewardAddress", "programAddress", "mintAddress"],
      returns: "Promise<string>",
      example: "/examples/staking"
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-heading font-bold mb-4">API Reference</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Complete documentation for all Saros SDK methods, parameters, and return types. Find exactly what you need
              with our searchable reference.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-12">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search methods, parameters, or modules..." className="pl-10 h-12 text-base" />
          </div>

          {/* SDK Overview Cards */}
          <div className="grid gap-6 lg:grid-cols-3 mb-16">
            {sdks.map((sdk) => (
              <Card key={sdk.name} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {sdk.icon}
                      <Badge variant="secondary">{sdk.badge}</Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg font-heading">{sdk.name}</CardTitle>
                  <CardDescription>{sdk.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{sdk.modules.length} modules</span>
                    <span>{sdk.methods} methods</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {sdk.modules.map((module) => (
                      <Badge key={module} variant="outline" className="text-xs">
                        {module}
                      </Badge>
                    ))}
                  </div>
                  <Button asChild className="w-full">
                    <Link href={sdk.href}>
                      <Book className="mr-2 h-4 w-4" />
                      View Documentation
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Common Methods */}
          <div className="mb-16">
            <h2 className="text-2xl font-heading font-bold mb-6">Most Used Methods</h2>
            <Accordion type="single" collapsible className="w-full">
              {commonMethods.map((method, index) => (
                <AccordionItem key={method.name} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center justify-between w-full mr-4">
                      <div>
                        <span className="font-mono text-primary">{method.name}</span>
                        <p className="text-sm text-muted-foreground mt-1">{method.description}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {method.sdk}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-4">
                      <div>
                        <h4 className="font-medium mb-2">Parameters:</h4>
                        <div className="flex flex-wrap gap-2">
                          {method.parameters.map((param) => (
                            <Badge key={param} variant="secondary" className="font-mono text-xs">
                              {param}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Returns:</h4>
                        <code className="text-sm bg-muted px-2 py-1 rounded">{method.returns}</code>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={method.example}>View Example</Link>
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Quick Links */}
          <div className="bg-muted/50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-heading font-bold mb-4">Need Help?</h2>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Check out our guides and community resources.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/guides">Browse Guides</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/examples">See Examples</Link>
              </Button>
              <Button asChild>
                <Link href="https://discord.gg/saros" target="_blank">
                  Join Discord
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
