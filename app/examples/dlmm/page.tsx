"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { CodeBlock } from "@/components/code-block"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Play, Copy, Check, ExternalLink, Code, Zap, Droplets } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DLMMPoolExamplePage() {
  const { toast } = useToast()
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)

  const examples = {
    swap: {
      title: "DLMM Swap",
      description: "Swap tokens using the DLMM SDK.",
      code: `import { LiquidityBookServices, MODE } from "@saros-finance/dlmm-sdk";
import { PublicKey } from "@solana/web3.js";

const liquidityBookServices = new LiquidityBookServices({
  mode: MODE.DEVNET, // or MODE.MAINNET
});

async function getDLMMQuote() {
  // ... (quote logic)
}

async function executeDLMMSwap() {
  // ... (swap logic)
}

// ... (execution)
`
    },
    createPool: {
      title: "Create DLMM Pool",
      description: "Create a new DLMM pool.",
      code: `import { LiquidityBookServices, MODE, BIN_STEP_CONFIGS } from "@saros-finance/dlmm-sdk";
import { PublicKey, Keypair } from "@solana/web3.js";

const liquidityBookServices = new LiquidityBookServices({
  mode: MODE.DEVNET,
});

async function createPool() {
  const tokenX = new PublicKey("C98A4nkJXhpVZNAZdHUA95RpTF3T4whtQubL3YobiUX9");
  const tokenY = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
  const binStep = BIN_STEP_CONFIGS[3].binStep;
  const ratePrice = 1;
  const payer = new PublicKey("YOUR_WALLET_PUBLIC_KEY");

  const { tx } = await liquidityBookServices.createPairWithConfig({
    tokenBase: { mintAddress: tokenX.toBase58(), decimal: 6 },
    tokenQuote: { mintAddress: tokenY.toBase58(), decimal: 6 },
    ratePrice,
    binStep,
    payer,
  });

  // ... (transaction signing and sending)
}

createPool();
`
    },
    addLiquidity: {
      title: "Add Liquidity to DLMM",
      description: "Add liquidity to a DLMM pool.",
      code: `// ... (imports)

async function addLiquidity() {
  // ... (simplified add liquidity logic)
}

addLiquidity();
`
    },
    removeLiquidity: {
      title: "Remove Liquidity from DLMM",
      description: "Remove liquidity from a DLMM pool.",
      code: `// ... (imports)

async function removeLiquidity() {
  // ... (simplified remove liquidity logic)
}

removeLiquidity();
`
    }
  }

  const [activeTab, setActiveTab] = useState(Object.keys(examples)[0])

  const runCode = async () => {
    // ... (run code logic)
  }

  const copyToClipboard = () => {
    // ... (copy to clipboard logic)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-heading text-4xl font-bold mb-4">DLMM Pool Operations Examples</h1>
            <p className="text-xl text-muted-foreground">
              Learn how to work with DLMM pools using the Saros DLMM SDK with these complete examples.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList>
              {Object.entries(examples).map(([key, example]) => (
                <TabsTrigger key={key} value={key}>{example.title}</TabsTrigger>
              ))}
            </TabsList>
            {Object.entries(examples).map(([key, example]) => (
              <TabsContent key={key} value={key}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <div>
                      <CardTitle className="text-xl font-heading">{example.title}</CardTitle>
                      <CardDescription>{example.description}</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={copyToClipboard}>
                      {copied ? <Check className="h-4 w-4 mr-2 text-green-500" /> : <Copy className="h-4 w-4 mr-2" />}
                      {copied ? "Copied" : "Copy Code"}
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock code={example.code} language="typescript" showCopy={false} />
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>

          {/* ... (rest of the page) */}
        </div>
      </div>
    </div>
  )
}
