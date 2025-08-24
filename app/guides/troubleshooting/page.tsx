"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Copy, Check } from "lucide-react"
import { useState } from "react"

export default function TroubleshootingGuide() {
  const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({})

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedStates({ ...copiedStates, [key]: true })
    setTimeout(() => {
      setCopiedStates({ ...copiedStates, [key]: false })
    }, 2000)
  }

  const commonIssues = [
    {
      category: "Connection Issues",
      issues: [
        {
          title: "Cannot connect to Solana network",
          problem: "Your application fails to establish a connection to the Solana network.",
          solution: `Ensure you're using the correct RPC endpoint:

// For Devnet
const connection = new Connection(clusterApiUrl('devnet'));

// For Mainnet
const connection = new Connection(clusterApiUrl('mainnet-beta'));

// For a custom RPC provider
const connection = new Connection('https://your-rpc-provider.com');`,
          command: "clusterApiUrl('devnet')"
        },
        {
          title: "Slow or timeout connections",
          problem: "Transactions are taking too long or timing out.",
          solution: `Try using a more reliable RPC endpoint or a dedicated provider:

// Try different endpoints
const connection = new Connection('https://solana-devnet.g.alchemy.com/solana/v1/xyz123');

// Or use a local validator for development
// solana-test-validator (run in terminal)`,
          command: "solana-test-validator"
        }
      ]
    },
    {
      category: "Wallet Issues",
      issues: [
        {
          title: "Wallet not connecting",
          problem: "The wallet connection process fails or the wallet is not detected.",
          solution: `Ensure you have a wallet adapter properly configured:

import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { useWallet } from '@solana/wallet-adapter-react';

// Initialize wallets
const wallets = useMemo(
  () => [
    new PhantomWalletAdapter(),
    // Add other wallet adapters here
  ],
  []
);

// Use the wallet in your component
const { connected, publicKey } = useWallet();`,
          command: "useWallet()"
        },
        {
          title: "Insufficient funds for transaction fees",
          problem: "Transactions fail with an insufficient funds error.",
          solution: `Check your wallet balance and get more SOL if needed:

// Check balance
const balance = await connection.getBalance(wallet.publicKey);

// Get Devnet SOL
// Visit https://solfaucet.com/ or use:
// solana airdrop 1 <WALLET_ADDRESS> --url devnet`,
          command: "solana airdrop 1"
        }
      ]
    },
    {
      category: "Token and Pool Issues",
      issues: [
        {
          title: "Token accounts not found",
          problem: "Operations fail because token accounts don't exist.",
          solution: `Create token accounts before using tokens:

import { getOrCreateAssociatedTokenAccount } from '@solana/spl-token';

const tokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  payer, // Transaction payer
  mint, // Token mint address
  owner // Token owner
);`,
          command: "getOrCreateAssociatedTokenAccount"
        },
        {
          title: "Invalid pool addresses",
          problem: "Swap or liquidity operations fail with invalid pool errors.",
          solution: `Verify pool addresses are correct for the network:

// For Devnet, use Devnet pool addresses
// For Mainnet, use Mainnet pool addresses

// You can query available pools:
const pools = await SarosFarmService.getListPool({ page: 1, size: 10 });`,
          command: "getListPool"
        }
      ]
    },
    {
      category: "Transaction Issues",
      issues: [
        {
          title: "Transaction simulation failed",
          problem: "Transactions fail during simulation with generic errors.",
          solution: `Check transaction parameters and account balances:

1. Verify all account addresses are correct
2. Ensure sufficient token balances
3. Check slippage settings
4. Verify pool parameters

// Add detailed error logging
try {
  const result = await someSarosOperation();
} catch (error) {
  console.error('Transaction error:', error);
  console.error('Error code:', error.code);
  console.error('Error message:', error.message);
}`,
          command: "console.error(error)"
        },
        {
          title: "Slippage tolerance exceeded",
          problem: "Swap transactions fail due to slippage protection.",
          solution: `Increase slippage tolerance or try with smaller amounts:

// Adjust slippage tolerance (in percentage)
const slippage = 1.0; // 1% instead of 0.5%

// Or break large swaps into smaller transactions
const amount = 0.1; // Smaller amount`,
          command: "slippage = 1.0"
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="font-heading text-4xl font-bold mb-4">Troubleshooting Guide</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Solutions to common issues when working with Saros SDKs and Solana development.
            </p>
          </div>

          {/* Introduction */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-heading">Getting Help</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                If you're experiencing issues not covered in this guide, here are the best ways to get help:
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <ExternalLink className="mr-2 h-5 w-5" />
                      Discord Community
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Join our Discord server to ask questions and get help from other developers.
                    </p>
                    <Button asChild>
                      <a href="https://discord.gg/saros" target="_blank">
                        Join Discord
                      </a>
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <ExternalLink className="mr-2 h-5 w-5" />
                      GitHub Issues
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Report bugs or request features on our GitHub repositories.
                    </p>
                    <Button asChild variant="outline">
                      <a href="https://github.com/coin98/saros-sdk/issues" target="_blank">
                        View Issues
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Common Issues */}
          <div className="mb-12">
            <h2 className="font-heading text-2xl font-bold mb-6">Common Issues and Solutions</h2>
            <div className="space-y-6">
              {commonIssues.map((category) => (
                <div key={category.category}>
                  <h3 className="font-heading text-xl font-semibold mb-4 flex items-center">
                    <Badge variant="secondary" className="mr-2">{category.category}</Badge>
                  </h3>
                  <div className="space-y-4">
                    {category.issues.map((issue, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle className="text-lg">{issue.title}</CardTitle>
                          <CardDescription>Problem: {issue.problem}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="mb-4">
                            <h4 className="font-semibold mb-2">Solution:</h4>
                            <div className="bg-muted rounded-lg p-4">
                              <pre className="text-sm font-mono whitespace-pre-wrap">{issue.solution}</pre>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <code className="bg-muted px-2 py-1 rounded text-sm">{issue.command}</code>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(issue.solution, `${category.category}-${index}`)}
                            >
                              {copiedStates[`${category.category}-${index}`] ? (
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
              ))}
            </div>
          </div>

          {/* Debugging Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-heading">Debugging Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">1. Enable Detailed Logging</h3>
                <p className="text-muted-foreground">
                  Add console.log statements throughout your code to track the flow of execution and identify where issues occur.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">2. Use Solana Explorer</h3>
                <p className="text-muted-foreground">
                  Check transaction details on <a href="https://explorer.solana.com/" target="_blank" className="text-primary hover:underline">Solana Explorer</a> to see error messages and transaction information.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">3. Test with Smaller Amounts</h3>
                <p className="text-muted-foreground">
                  When testing swaps or liquidity operations, start with small token amounts to reduce the impact of errors.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">4. Validate Addresses</h3>
                <p className="text-muted-foreground">
                  Ensure all Solana addresses (wallets, tokens, pools) are valid and exist on the correct network.
                </p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Pro Tip</h3>
                <p className="text-muted-foreground">
                  Use the <a href="/playground" className="text-primary hover:underline">Saros Playground</a> to test code snippets in isolation before integrating them into your application.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}