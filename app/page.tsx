import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { CodeBlock } from "@/components/code-block"
import { ArrowRight, Code, Zap, BookOpen, Terminal, Sparkles, Github, ExternalLink, TestTube } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  const quickInstall = `npm install @saros-finance/sdk @saros-finance/dlmm-sdk`

  const quickExample = `import { LiquidityBookServices } from "@saros-finance/dlmm-sdk";

const liquidityBookServices = new LiquidityBookServices({
  mode: MODE.MAINNET,
});

// Get quote for swap
const quoteData = await liquidityBookServices.getQuote({
  amount: BigInt(1000000), // 1 USDC
  isExactInput: true,
  swapForY: true,
  pair: new PublicKey("EwsqJeioGAXE5EdZHj1QvcuvqgVhJDp9729H5wjh28DD"),
  // ... other params
});`

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-20 sm:py-32"
        style={{
          backgroundImage: "url(/saros-doc-hero.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="container relative">
          <div className="mx-auto max-w-4xl text-center">
            {/* <Badge variant="secondary" className="mb-4">
              <Sparkles className="mr-1 h-3 w-3" />
              Fast-Track Your Solana Development
            </Badge> */}
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Build on{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Saros</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
              Comprehensive developer documentation for Saros Finance SDKs. From zero to shipping in minutes with our
              interactive guides, code playground, and AI-powered tools.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg" className="text-base">
                <Link href="/quickstart/sdk">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" asChild className="text-white border-white border-2 bg-transparent">
                <Link href="/playground">
                  <Terminal className="mr-2 h-4 w-4" />
                  Try Playground
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Install */}
      <section className="py-16 p-4">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-heading text-2xl font-bold text-center mb-8">Quick Install</h2>
            <CodeBlock code={quickInstall} language="bash" />
          </div>
        </div>
      </section>

      {/* SDK Cards */}
      <section className="py-16 p-4">
        <div className="container">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-heading text-3xl font-bold text-center mb-12">Choose Your SDK</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="relative overflow-hidden border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-heading">@saros-finance/sdk</CardTitle>
                    <Badge variant="secondary"> <Image src="/icons8-typescript-48.png" alt="TS logo" height={20} width={20}/> TypeScript</Badge>
                  </div>
                  <CardDescription>Complete SDK for AMM, Staking, and Farming operations on Saros</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                    <li>• Token swapping</li>
                    <li>• Pool creation & management</li>
                    <li>• Staking & farming rewards</li>
                    <li>• Comprehensive utilities</li>
                  </ul>
                  <div className="flex gap-2">
                    <Button asChild size="sm" className="flex-1">
                      <Link href="/quickstart/sdk">Quick Start</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/examples/sdk">
                        <Code className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-heading">@saros-finance/dlmm-sdk</CardTitle>
                    <Badge variant="secondary"> <Image src="/icons8-typescript-48.png" alt="TS logo" height={20} width={20}/> TypeScript</Badge>
                  </div>
                  <CardDescription>Dynamic Liquidity Market Maker for advanced trading strategies</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                    <li>• Dynamic liquidity bins</li>
                    <li>• Advanced position management</li>
                    <li>• Optimized price discovery</li>
                    <li>• Real-time market data</li>
                  </ul>
                  <div className="flex gap-2">
                    <Button asChild size="sm" className="flex-1">
                      <Link href="/quickstart/dlmm">Quick Start</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/examples/dlmm">
                        <Code className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-heading">saros-dlmm-sdk-rs</CardTitle>
                    <Badge variant="secondary"> <Image src="/icons8-rust-programming-language.gif" alt="TS logo" className="rounded-lg" height={20} width={20}/> Rust</Badge>
                  </div>
                  <CardDescription>High-performance Rust SDK for DLMM operations</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                    <li>• Zero-cost abstractions</li>
                    <li>• Memory safety</li>
                    <li>• High-performance trading</li>
                    <li>• Native Solana integration</li>
                  </ul>
                  <div className="flex gap-2">
                    <Button asChild size="sm" className="flex-1">
                      <Link href="/quickstart/rust">Quick Start</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/examples/rust">
                        <Code className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16  p-4 bg-muted/30">
        <div className="container">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-heading text-3xl font-bold text-center mb-12">This Guide Includes:</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="font-heading font-semibold mb-2">Interactive Guides</h3>
                <p className="text-sm text-muted-foreground">Step-by-step tutorials with live code examples</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Terminal className="h-6 w-6" />
                </div>
                <h3 className="font-heading font-semibold mb-2">Code Playground</h3>
                <p className="text-sm text-muted-foreground">Test and experiment with SDK features instantly</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="font-heading font-semibold mb-2">AI Code Checker</h3>
                <p className="text-sm text-muted-foreground">Get instant feedback on your code quality</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <TestTube className="h-6 w-6" />
                </div>
                <h3 className="font-heading font-semibold mb-2">Devnet Testing</h3>
                <p className="text-sm text-muted-foreground">Test with real transactions on Solana Devnet</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Preview */}
      <section className="py-16  p-4">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-heading text-3xl font-bold text-center mb-8">See It In Action</h2>
            <p className="text-center text-muted-foreground mb-8">
              Get started with a simple swap operation using the DLMM SDK
            </p>
            <CodeBlock code={quickExample} language="typescript" title="Quick Swap Example" />
            <div className="mt-8 text-center">
              <Button asChild>
                <Link href="/examples">
                  View More Examples
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contribute */}
      <section className="py-16 p-4">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-heading text-3xl font-bold mb-8">Contribute to Saros</h2>
            <p className="text-lg text-muted-foreground mb-8">
              The Saros SDKs are open-source and community-driven. We welcome contributions from developers of all levels.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild variant="outline">
                <Link href="https://github.com/coin98/saros-sdk" target="_blank">
                  <Github className="mr-2 h-4 w-4" />
                  Contribute to the TS SDK
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="https://github.com/coin98/saros-dlmm-sdk-rs" target="_blank">
                  <Github className="mr-2 h-4 w-4" />
                  Contribute to the Rust SDK
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16  p-4 bg-muted/30">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-heading text-3xl font-bold mb-8">Additional Resources</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Github className="mr-2 h-5 w-5" />
                    GitHub
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Explore the source code and contribute to the SDKs
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="https://github.com/coin98/saros-sdk" target="_blank">
                      View Repository
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="mr-2 h-5 w-5" />
                    API Reference
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Complete API documentation for all SDK methods</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/api">
                      Browse API
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TestTube className="mr-2 h-5 w-5" />
                    Devnet Testing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Learn how to test with real transactions</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/guides/devnet-testing">
                      Get Started
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t  p-4 py-12">
        <div className="container">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 md:grid-cols-4">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                                    <Image src="/logo.png" className="rounded-lg" alt="Saros SDK Logo" width={24} height={24} />
                  <span className="font-heading font-bold">Saros SDK Docs</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Build the future of DeFi on Solana with Saros Finance SDKs.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Documentation</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>                    <Link href="/quickstart/sdk" className="hover:text-foreground">                      Quick Start                    </Link>                  </li>
                  <li>
                    <Link href="/tutorials" className="hover:text-foreground">
                      Tutorials
                    </Link>
                  </li>
                  <li>
                    <Link href="/examples" className="hover:text-foreground">
                      Examples
                    </Link>
                  </li>
                  <li>
                    <Link href="/api" className="hover:text-foreground">
                      API Reference
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Tools</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link href="/playground" className="hover:text-foreground">
                      Playground
                    </Link>
                  </li>
                  <li>
                    <Link href="/ai-checker" className="hover:text-foreground">
                      AI Checker
                    </Link>
                  </li>
                  <li>
                    <Link href="/guides" className="hover:text-foreground">
                      Guides
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Community</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link href="https://github.com/coin98/saros-sdk" className="hover:text-foreground">
                      GitHub
                    </Link>
                  </li>
                  <li>
                    <Link href="https://discord.gg/saros" className="hover:text-foreground">
                      Discord
                    </Link>
                  </li>
                  <li>
                    <Link href="/resources" className="hover:text-foreground">
                      Resources
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
              <p>&copy; 2025 Saros Finance. Built by <Link className="text-purple-700" href={"https://x.com/0xFloch"}>Floch</Link> for the developer community.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
