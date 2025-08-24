import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, BookOpen, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function ResourcesPage() {
  const resources = [
    {
      title: "Saros SDK Documentation",
      description: "Complete API reference and guides for all Saros SDKs",
      icon: <BookOpen className="h-6 w-6" />,
      href: "/api",
      badge: "Docs"
    },
    {
      title: "GitHub Repositories",
      description: "Source code, issues, and contributions for all SDKs",
      icon: <Github className="h-6 w-6" />,
      href: "https://github.com/coin98",
      badge: "Code"
    },
    {
      title: "Saros Discord Community",
      description: "Join our developer community for support and discussions",
      icon: <MessageCircle className="h-6 w-6" />,
      href: "https://discord.gg/saros",
      badge: "Community"
    },
    {
      title: "Solana Documentation",
      description: "Official Solana documentation for blockchain development",
      icon: <BookOpen className="h-6 w-6" />,
      href: "https://docs.solana.com/",
      badge: "External"
    }
  ]

  const guides = [
    {
      title: "Getting Started with Solana Development",
      description: "A beginner's guide to building on Solana",
      href: "https://solana.com/docs",
      badge: "Beginner"
    },
    {
      title: "Understanding Liquidity Pools",
      description: "Deep dive into how AMMs and liquidity pools work",
      href: "#",
      badge: "Intermediate"
    },
    {
      title: "Advanced Trading Strategies",
      description: "Leveraging DLMM for sophisticated trading approaches",
      href: "#",
      badge: "Advanced"
    },
    {
      title: "Security Best Practices",
      description: "Essential security considerations for DeFi applications",
      href: "#",
      badge: "Security"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-8">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="font-heading text-4xl font-bold mb-4">Developer Resources</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A curated collection of resources to help you build amazing applications with Saros SDKs.
            </p>
          </div>

          {/* Core Resources */}
          <div className="grid gap-6 md:grid-cols-2 mb-12">
            {resources.map((resource) => (
              <Card key={resource.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {resource.icon}
                      </div>
                      <div>
                        <CardTitle className="font-heading">{resource.title}</CardTitle>
                        <CardDescription>{resource.description}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary">{resource.badge}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href={resource.href} {...(resource.href.startsWith('http') ? { target: "_blank" } : {})}>
                      {resource.href.startsWith('http') ? "Visit Resource" : "Explore"}
                      {resource.href.startsWith('http') && <ExternalLink className="ml-2 h-4 w-4" />}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Guides */}
          <div className="mb-12">
            <h2 className="font-heading text-2xl font-bold mb-6">Learning Guides</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {guides.map((guide) => (
                <Card key={guide.title}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="font-heading text-lg">{guide.title}</CardTitle>
                      <Badge variant="outline">{guide.badge}</Badge>
                    </div>
                    <CardDescription>{guide.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" asChild>
                      <Link href={guide.href}>
                        Read Guide
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-2xl">Frequently Asked Questions</CardTitle>
              <CardDescription>Common questions and answers for Saros SDK developers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">What's the difference between the SDKs?</h3>
                <p className="text-muted-foreground">
                  The <code className="bg-muted px-1 rounded">@saros-finance/sdk</code> is a general-purpose SDK for 
                  standard DeFi operations. The <code className="bg-muted px-1 rounded">@saros-finance/dlmm-sdk</code> is 
                  specialized for Dynamic Liquidity Market Maker operations with advanced features. The{" "}
                  <code className="bg-muted px-1 rounded">saros-dlmm-sdk-rs</code> is a high-performance Rust implementation 
                  for server-side applications. Check out our <Link href="/guides/comparison" className="text-primary hover:underline">comparison guide</Link> for more details.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">How do I get test tokens for development?</h3>
                <p className="text-muted-foreground">
                  You can get test SOL and other tokens from the <a href="https://solfaucet.com/" target="_blank" className="text-primary hover:underline">Solana faucet</a>. 
                  For other tokens, you can use the <a href="https://spl-token-faucet.com/" target="_blank" className="text-primary hover:underline">SPL Token Faucet</a> or mint your own tokens for testing.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Where can I get help with integration?</h3>
                <p className="text-muted-foreground">
                  Join our <a href="https://discord.gg/saros" target="_blank" className="text-primary hover:underline">Discord community</a> where you can ask questions, 
                  share your projects, and get help from other developers and the Saros team.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Are there any code examples I can reference?</h3>
                <p className="text-muted-foreground">
                  Yes! We have a comprehensive collection of code examples in our <Link href="/examples" className="text-primary hover:underline">examples section</Link>. 
                  You can also find examples in the README files of each SDK repository on GitHub.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}