import { Header } from "@/components/header"
import { CodeBlock } from "@/components/code-block"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Package, Zap, Code, Terminal, Workflow } from "lucide-react"
import Link from "next/link"

export default function DLMMPoolTutorialPage() {
  const prerequisitesCode = `// Install the required packages
npm install @saros-finance/dlmm-sdk @solana/web3.js

// Import the necessary modules
import { LiquidityBookServices, MODE } from "@saros-finance/dlmm-sdk";
import { PublicKey } from "@solana/web3.js";`

  const initializeCode = `// Initialize the DLMM service
const liquidityBookServices = new LiquidityBookServices({
  mode: MODE.DEVNET, // or MODE.MAINNET
});

// Define your wallet address (in a real app, this would come from a connected wallet)
const YOUR_WALLET = "YOUR_WALLET_PUBLIC_KEY";`

  const getQuoteCode = `// Get a quote for a swap operation
const quoteData = await liquidityBookServices.getQuote({
  amount: BigInt(1000000), // 1 USDC (6 decimals)
  isExactInput: true,
  swapForY: true,
  pair: new PublicKey("EwsqJeioGAXE5EdZHj1QvcuvqgVhJDp9729H5wjh28DD"), // Pool address
  tokenBase: new PublicKey("C98A4nkJXhpVZNAZdHUA95RpTF3T4whtQubL3YobiUX9"), // Base token
  tokenQuote: new PublicKey("EPjFWdd5AufqSSqeM2qN1zzybapC8G4wEGGkZwyTDt1v"), // Quote token
  tokenBaseDecimal: 6,
  tokenQuoteDecimal: 6,
  slippage: 0.5 // 0.5% slippage tolerance
});

console.log('DLMM Quote:', {
  amountIn: quoteData.amountIn.toString(),
  amountOut: quoteData.amountOut.toString(),
  priceImpact: quoteData.priceImpact,
});`

  const swapCode = `// Execute a swap using the quote data
const transaction = await liquidityBookServices.swap({
  amount: quoteData.amount,
  tokenMintX: new PublicKey("C98A4nkJXhpVZNAZdHUA95RpTF3T4whtQubL3YobiUX9"), // Token X
  tokenMintY: new PublicKey("EPjFWdd5AufqSSqeM2qN1zzybapC8G4wEGGkZwyTDt1v"), // Token Y
  otherAmountOffset: quoteData.otherAmountOffset,
  isExactInput: true,
  swapForY: true,
  pair: new PublicKey("EwsqJeioGAXE5EdZHj1QvcuvqgVhJDp9729H5wjh28DD"), // Pool address
  payer: new PublicKey(YOUR_WALLET) // User's wallet
});

console.log('DLMM swap transaction created:', transaction);`

  const positionManagementCode = `// Example of position management in DLMM
// (This is a conceptual example as the actual API may vary)

// Add liquidity to a specific price range
const addLiquidityTx = await liquidityBookServices.addLiquidity({
  pair: new PublicKey("EwsqJeioGAXE5EdZHj1QvcuvqgVhJDp9729H5wjh28DD"),
  tokenXAmount: BigInt(1000000), // 1 token X
  tokenYAmount: BigInt(2000000), // 2 token Y
  binLower: -100, // Lower price bin
  binUpper: 100,  // Upper price bin
  payer: new PublicKey(YOUR_WALLET)
});

// Remove liquidity from a position
const removeLiquidityTx = await liquidityBookServices.removeLiquidity({
  position: positionPubkey, // Position NFT pubkey
  liquidityBps: 5000, // 50% of liquidity (5000 bps)
  payer: new PublicKey(YOUR_WALLET)
});`

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Workflow className="h-6 w-6 text-primary" />
              <h1 className="font-heading text-4xl font-bold">DLMM Pool Operations Tutorial</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Learn how to work with Dynamic Liquidity Market Maker pools using the Saros DLMM SDK.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="mr-2 h-5 w-5" />
                Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                This tutorial will guide you through the process of interacting with DLMM pools using the Saros DLMM SDK. 
                DLMM provides concentrated liquidity and improved capital efficiency compared to traditional AMMs.
              </p>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold">50 min</div>
                  <div className="text-sm text-muted-foreground">Estimated Time</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold">Advanced</div>
                  <div className="text-sm text-muted-foreground">Difficulty</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold">Solana</div>
                  <div className="text-sm text-muted-foreground">Blockchain</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prerequisites */}
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold mb-4">1. Prerequisites</h2>
            <p className="text-muted-foreground mb-4">
              Before starting this tutorial, ensure you have the following:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6">
              <li>Node.js 16+ and npm/yarn installed</li>
              <li>Advanced knowledge of TypeScript/JavaScript</li>
              <li>A Solana wallet with some SOL for transaction fees</li>
              <li>Understanding of liquidity provision and AMM concepts</li>
              <li>Familiarity with the concepts of concentrated liquidity (recommended)</li>
            </ul>
            <CodeBlock code={prerequisitesCode} language="bash" title="Install Dependencies" />
          </div>

          <Separator className="my-8" />

          {/* Step 1: Initialize Service */}
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold mb-4">2. Initialize DLMM Service</h2>
            <p className="text-muted-foreground mb-4">
              First, we need to initialize the LiquidityBookServices with the appropriate network mode.
            </p>
            <CodeBlock code={initializeCode} language="typescript" title="Initialize Service" />
          </div>

          <Separator className="my-8" />

          {/* Step 2: Get Quote */}
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold mb-4">3. Get Swap Quote</h2>
            <p className="text-muted-foreground mb-4">
              Before executing a swap, get a quote to see the expected output amount and price impact.
            </p>
            <CodeBlock code={getQuoteCode} language="typescript" title="Get Swap Quote" />
          </div>

          <Separator className="my-8" />

          {/* Step 3: Execute Swap */}
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold mb-4">4. Execute Swap</h2>
            <p className="text-muted-foreground mb-4">
              Execute a swap using the quote data from the previous step.
            </p>
            <CodeBlock code={swapCode} language="typescript" title="Execute Swap" />

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Understanding DLMM Swaps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <strong>1. Get Quote:</strong> We call <code className="bg-muted px-1 rounded">liquidityBookServices.getQuote</code> to calculate the expected output
                  amount and other parameters needed for the swap.
                </div>
                <div>
                  <strong>2. Execute Swap:</strong> We use <code className="bg-muted px-1 rounded">liquidityBookServices.swap</code> to create the transaction for the token exchange.
                </div>
                <div>
                  <strong>3. Concentrated Liquidity:</strong> DLMM uses concentrated liquidity bins for more efficient price discovery and reduced slippage.
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-8" />

          {/* Step 4: Position Management */}
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold mb-4">5. Position Management</h2>
            <p className="text-muted-foreground mb-4">
              Manage liquidity positions in DLMM pools by adding or removing liquidity within specific price ranges.
            </p>
            <CodeBlock code={positionManagementCode} language="typescript" title="Position Management" />

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Understanding Position Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <strong>1. Add Liquidity:</strong> Provide liquidity within a specific price range to earn fees when trades occur in that range.
                </div>
                <div>
                  <strong>2. Remove Liquidity:</strong> Remove your liquidity from a position when you want to stop earning fees or adjust your strategy.
                </div>
                <div>
                  <strong>3. Capital Efficiency:</strong> Concentrated liquidity allows for higher capital efficiency compared to traditional AMMs.
                </div>
              </CardContent>
            </Card>
          </div>

          {/* DLMM Concepts */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Workflow className="mr-2 h-5 w-5" />
                Key DLMM Concepts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Bins</h3>
                <p className="text-muted-foreground">
                  DLMM divides the price curve into discrete "bins" where liquidity is concentrated. Each bin represents a narrow price range.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Concentrated Liquidity</h3>
                <p className="text-muted-foreground">
                  Instead of spreading liquidity across the entire price curve, liquidity providers can concentrate their capital within specific price ranges.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Position NFTs</h3>
                <p className="text-muted-foreground">
                  Liquidity positions in DLMM are represented as NFTs, allowing for easy management and transfer of positions.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Reduced Slippage</h3>
                <p className="text-muted-foreground">
                  Concentrated liquidity leads to deeper markets within price ranges, resulting in reduced slippage for traders.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>📚 Next Steps</CardTitle>
              <CardDescription>
                Continue learning with these related tutorials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Button asChild variant="outline">
                  <Link href="/tutorials/swap">
                    <Code className="mr-2 h-4 w-4" />
                    Token Swapping
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/tutorials/liquidity">
                    <Zap className="mr-2 h-4 w-4" />
                    Liquidity Management
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/examples/dlmm">
                    <Package className="mr-2 h-4 w-4" />
                    View Example Code
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/playground">
                    Try in Playground
                    <Terminal className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Key Takeaways */}
          <Card>
            <CardHeader>
              <CardTitle>💡 Key Takeaways</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <strong>Capital Efficiency:</strong> DLMM's concentrated liquidity model provides higher capital efficiency compared to traditional AMMs.
              </div>
              <div>
                <strong>Price Range Selection:</strong> Carefully select price ranges for liquidity provision to maximize fee earnings while minimizing impermanent loss.
              </div>
              <div>
                <strong>Active Management:</strong> DLMM positions may require more active management to adjust to changing market conditions.
              </div>
              <div>
                <strong>Lower Slippage:</strong> Traders benefit from reduced slippage due to deeper liquidity within specific price ranges.
              </div>
              <div>
                <strong>Network Configuration:</strong> Use the correct RPC endpoints for devnet, testnet, or mainnet depending on your environment.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}