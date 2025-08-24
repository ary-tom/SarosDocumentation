import { Header } from "@/components/header"
import { CodeBlock } from "@/components/code-block"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Package, Zap, Code } from "lucide-react"
import Link from "next/link"

export default function DLMMQuickStartPage() {
  const installCode = `npm install @saros-finance/dlmm-sdk
# or
yarn add @saros-finance/dlmm-sdk`

  const importCode = `import {
  BIN_STEP_CONFIGS,
  LiquidityBookServices,
  MODE,
} from "@saros-finance/dlmm-sdk";
import { PublicKey, Transaction, Keypair } from "@solana/web3.js";
import {
  LiquidityShape,
  PositionInfo,
  RemoveLiquidityType,
} from "@saros-finance/dlmm-sdk/types/services";
import {
  createUniformDistribution,
  findPosition,
  getBinRange,
  getMaxBinArray,
  getMaxPosition,
} from "@saros-finance/dlmm-sdk/utils";
import bigDecimal from "js-big-decimal";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";`

  const initializeCode = `const liquidityBookServices = new LiquidityBookServices({
  mode: MODE.DEVNET, // or MODE.MAINNET
});`

  const getQuoteCode = `const quoteData = await liquidityBookServices.getQuote({
  amount: BigInt(1000000), // 1 USDC
  isExactInput: true,
  swapForY: true,
  pair: new PublicKey("EwsqJeioGAXE5EdZHj1QvcuvqgVhJDp9729H5wjh28DD"),
  tokenBase: new PublicKey("C98A4nkJXhpVZNAZdHUA95RpTF3T4whtQubL3YobiUX9"),
  tokenQuote: new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
  tokenBaseDecimal: 6,
  tokenQuoteDecimal: 6,
  slippage: 0.5
});`

  const swapCode = `const transaction = await liquidityBookServices.swap({
  amount: quoteData.amount,
  tokenMintX: new PublicKey("C98A4nkJXhpVZNAZdHUA95RpTF3T4whtQubL3YobiUX9"),
  tokenMintY: new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
  otherAmountOffset: quoteData.otherAmountOffset,
  isExactInput: true,
  swapForY: true,
  pair: new PublicKey("EwsqJeioGAXE5EdZHj1QvcuvqgVhJDp9729H5wjh28DD"),
  payer: new PublicKey("YOUR_WALLET_PUBLIC_KEY")
});

const signedTransaction = await signTransaction(transaction);

const signature = await liquidityBookServices.connection.sendRawTransaction(
  signedTransaction.serialize(),
  {
    skipPreflight: true,
    preflightCommitment: "confirmed",
  }
);

const { blockhash, lastValidBlockHeight } = await liquidityBookServices.connection.getLatestBlockhash();

await liquidityBookServices.connection.confirmTransaction({
  signature,
  blockhash,
  lastValidBlockHeight,
});`

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">
                <Package className="mr-1 h-3 w-3" />
                @saros-finance/dlmm-sdk
              </Badge>
              <Badge variant="outline">TypeScript</Badge>
            </div>
            <h1 className="font-heading text-4xl font-bold mb-4">Quick Start Guide</h1>
            <p className="text-xl text-muted-foreground">
              Get up and running with the Saros Finance DLMM SDK in minutes. This guide covers installation, basic setup, and
              your first swap operation using the Dynamic Liquidity Market Maker.
            </p>
          </div>

          {/* Prerequisites */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="mr-2 h-5 w-5" />
                Prerequisites
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Node.js 16+ and npm/yarn</li>
                <li>• Basic knowledge of TypeScript/JavaScript</li>
                <li>• Solana wallet with some SOL for transaction fees</li>
                <li>• Understanding of Solana's account model (helpful but not required)</li>
              </ul>
            </CardContent>
          </Card>

          {/* Step 1: Installation */}
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold mb-4">1. Installation</h2>
            <p className="text-muted-foreground mb-4">
              Install the Saros Finance DLMM SDK using your preferred package manager:
            </p>
            <CodeBlock code={installCode} language="bash" title="Install SDK" />
          </div>

          <Separator className="my-8" />

          {/* Step 2: Import and Initialize */}
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold mb-4">2. Import and Initialize</h2>
            <p className="text-muted-foreground mb-4">Import the necessary classes and initialize the service:</p>
            <CodeBlock code={importCode} language="typescript" title="Import SDK" />

            <div className="mt-6">
              <h3 className="font-heading text-lg font-semibold mb-3">Initialize Service</h3>
              <CodeBlock code={initializeCode} language="typescript" title="Initialize DLMM Service" />
            </div>
          </div>

          <Separator className="my-8" />

          {/* Step 3: Get a Quote */}
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold mb-4">3. Get a Swap Quote</h2>
            <p className="text-muted-foreground mb-4">Before executing a swap, get a quote for the expected output:</p>
            <CodeBlock code={getQuoteCode} language="typescript" title="Get Swap Quote" />
          </div>

          <Separator className="my-8" />

          {/* Step 4: Execute Swap */}
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold mb-4">4. Execute Swap</h2>
            <p className="text-muted-foreground mb-4">Use the quote data to create and execute the swap transaction:</p>
            <CodeBlock code={swapCode} language="typescript" title="Execute Swap" />

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Understanding the Swap Process</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <strong>1. Get Quote:</strong> First, we call{" "}
                  <code className="bg-muted px-1 rounded">liquidityBookServices.getQuote</code> to calculate the expected output
                  amount and other parameters needed for the swap.
                </div>
                <div>
                  <strong>2. Execute Swap:</strong> Then we use <code className="bg-muted px-1 rounded">liquidityBookServices.swap</code>{" "}
                  to create the transaction for the token exchange.
                </div>
                <div>
                  <strong>3. Sign and Send:</strong> In a real implementation, you would sign the transaction with your wallet
                  and send it to the network.
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Next Steps */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>🎉 Congratulations!</CardTitle>
              <CardDescription>
                You've successfully set up the Saros Finance DLMM SDK and performed your first swap.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Button asChild variant="outline">
                  <Link href="/tutorials/dlmm">
                    <Code className="mr-2 h-4 w-4" />
                    Learn about DLMM Concepts
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/tutorials/liquidity">
                    <Zap className="mr-2 h-4 w-4" />
                    Learn about Liquidity Management in DLMM
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/examples/dlmm">
                    <Package className="mr-2 h-4 w-4" />
                    View More DLMM Examples
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/playground">
                    Try in Playground
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Troubleshooting */}
          <Card>
            <CardHeader>
              <CardTitle>Troubleshooting</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <strong>Connection Issues:</strong> Make sure you have a stable internet connection and the Solana
                network is accessible.
              </div>
              <div>
                <strong>Transaction Failures:</strong> Ensure your wallet has sufficient SOL for transaction fees and
                the tokens you're trying to swap.
              </div>
              <div>
                <strong>Import Errors:</strong> Verify that you've installed all required dependencies and are using
                compatible versions.
              </div>
              <div className="pt-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/guides/troubleshooting">
                    View Full Troubleshooting Guide
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}