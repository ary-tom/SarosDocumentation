"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Copy, Check } from "lucide-react"
import { useState } from "react"

export default function DevnetTestingGuide() {
  const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({})

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedStates({ ...copiedStates, [key]: true })
    setTimeout(() => {
      setCopiedStates({ ...copiedStates, [key]: false })
    }, 2000)
  }

  const devnetInfo = [
    {
      title: "Devnet RPC Endpoints",
      items: [
        {
          name: "Main Devnet Endpoint",
          value: "https://api.devnet.solana.com",
          description: "Primary endpoint for Solana Devnet"
        },
        {
          name: "Alternative Endpoints",
          value: "https://solana-devnet.g.alchemy.com/solana/v1/xyz123",
          description: "Alternative endpoints for better reliability"
        }
      ]
    },
    {
      title: "Getting Devnet SOL",
      items: [
        {
          name: "Solana Faucet",
          value: "https://solfaucet.com/",
          description: "Get free SOL for testing on Devnet"
        },
        {
          name: "CLI Command",
          value: "solana airdrop 1 <WALLET_ADDRESS> --url devnet",
          description: "Airdrop SOL to your wallet using the Solana CLI"
        }
      ]
    },
    {
      title: "Getting Test SPL Tokens",
      items: [
        {
          name: "SPL Token Faucet",
          value: "https://spl-token-faucet.com/",
          description: "Get common test SPL tokens like USDC, USDT, etc."
        },
        {
          name: "Create Your Own Tokens",
          value: "spl-token create-token --url devnet",
          description: "Create your own custom SPL tokens for testing."
        }
      ]
    },
    {
      title: "Creating Test Tokens",
      items: [
        {
          name: "SPL Token CLI",
          value: "spl-token create-token --url devnet",
          description: "Create a new token on Devnet"
        },
        {
          name: "Token Faucet",
          value: "https://spl-token-faucet.com/",
          description: "Get test tokens for development"
        }
      ]
    }
  ]

  const testingSteps = [
    {
      title: "1. Set up your development environment",
      description: "Install the Solana CLI tools and set the cluster to devnet",
      code: `# Install Solana CLI
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"

# Set cluster to devnet
solana config set --url devnet

# Confirm your configuration
solana config get`,
      command: "solana config set --url devnet"
    },
    {
      title: "2. Create and fund a devnet wallet",
      description: "Generate a new wallet and get some SOL for testing",
      code: `# Create a new wallet
solana-keygen new --outfile devnet-wallet.json

# Set the wallet as default
solana config set --keypair devnet-wallet.json

# Airdrop SOL to your wallet
solana airdrop 1

# Check your balance
solana balance`,
      command: "solana airdrop 1"
    },
    {
      title: "3. Create test tokens",
      description: "Create your own tokens for testing swap and liquidity operations",
      code: `# Install SPL Token CLI
npm install -g @solana/spl-token

# Create a new token
spl-token create-token --url devnet

# Create an account for the token
spl-token create-account <TOKEN_MINT_ADDRESS> --url devnet

# Mint tokens to your account
spl-token mint <TOKEN_MINT_ADDRESS> 1000 --url devnet

# Check your token balance
spl-token balance <TOKEN_MINT_ADDRESS> --url devnet`,
      command: "spl-token create-token --url devnet"
    },
    {
      title: "4. Connect to Devnet in your code",
      description: "Configure your Saros SDK to use Devnet",
      code: `import { Connection, clusterApiUrl } from '@solana/web3.js';
import { genConnectionSolana } from '@saros-finance/sdk';

// Method 1: Using clusterApiUrl
const connection = new Connection(clusterApiUrl('devnet'));

// Method 2: Using Saros SDK utility
const connection = genConnectionSolana(); // Automatically connects to devnet in development

// Method 3: Using custom endpoint
const connection = new Connection('https://api.devnet.solana.com');`,
      command: "clusterApiUrl('devnet')"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="font-heading text-4xl font-bold mb-4">Devnet Testing Guide</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Learn how to test your Saros SDK integrations on Solana Devnet with real transactions.
            </p>
          </div>

          {/* Introduction */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-heading">Why Test on Devnet?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Solana Devnet is a replica of the main Solana blockchain specifically for testing and development. 
                It provides all the functionality of mainnet but with fake SOL tokens, making it perfect for testing 
                your Saros SDK integrations without risking real funds.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Test all Saros SDK functionality with real transactions</li>
                <li>Create and manage your own test tokens</li>
                <li>Experiment with liquidity pools and staking without financial risk</li>
                <li>Debug transaction issues in a safe environment</li>
              </ul>
            </CardContent>
          </Card>

          {/* Devnet Information */}
          <div className="grid gap-6 md:grid-cols-2 mb-12">
            {devnetInfo.map((section) => (
              <Card key={section.title}>
                <CardHeader>
                  <CardTitle className="text-xl font-heading">{section.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {section.items.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(item.value, `${section.title}-${index}`)}
                        >
                          {copiedStates[`${section.title}-${index}`] ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <code className="bg-muted p-2 rounded text-sm break-all">{item.value}</code>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Testing Steps */}
          <div className="mb-12">
            <h2 className="font-heading text-2xl font-bold mb-6">Step-by-Step Testing Guide</h2>
            <div className="space-y-6">
              {testingSteps.map((step, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Badge className="mr-3" variant="secondary">{index + 1}</Badge>
                      {step.title}
                    </CardTitle>
                    <CardDescription>{step.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted rounded-lg p-4 mb-4">
                      <pre className="text-sm font-mono whitespace-pre-wrap">{step.code}</pre>
                    </div>
                    <div className="flex justify-between items-center">
                      <code className="bg-muted px-2 py-1 rounded text-sm">{step.command}</code>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(step.code, `step-${index}`)}
                      >
                        {copiedStates[`step-${index}`] ? (
                          <>
                            <Check className="mr-2 h-4 w-4 text-green-500" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy Code
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Best Practices */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-heading">Best Practices for Devnet Testing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">1. Use Dedicated Test Wallets</h3>
                <p className="text-muted-foreground">
                  Create separate wallets specifically for Devnet testing to avoid confusion with mainnet wallets.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">2. Document Your Test Setup</h3>
                <p className="text-muted-foreground">
                  Keep track of the tokens, pools, and accounts you create during testing for reproducibility.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">3. Test Edge Cases</h3>
                <p className="text-muted-foreground">
                  Test scenarios like insufficient funds, slippage limits, and network failures to ensure 
                  your application handles them gracefully.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">4. Monitor Transaction Fees</h3>
                <p className="text-muted-foreground">
                  While Devnet SOL is free, it's still good practice to monitor transaction fees to understand 
                  costs on mainnet.
                </p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Pro Tip</h3>
                <p className="text-muted-foreground">
                  Use the <a href="/playground" className="text-primary hover:underline">Saros Playground</a> to test code snippets 
                  before implementing them in your full application. It's already configured to connect to Devnet!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}