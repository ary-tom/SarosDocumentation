"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { CodeBlock } from "@/components/code-block"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Play, Copy, Check, ExternalLink } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function LiquidityExamplePage() {
  const { toast } = useToast()
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)

  const exampleCode = `import { 
  getPoolInfo, 
  depositAllTokenTypes, 
  withdrawAllTokenTypes, 
  getTokenMintInfo, 
  getTokenAccountInfo, 
  getInfoTokenByMint,
  genConnectionSolana,
  convertBalanceToWei
} from '@saros-finance/sdk';
import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';

const connection = genConnectionSolana();
const accountSol = 'YOUR_WALLET_PUBLIC_KEY';
const SLIPPAGE = 0.5;

// Pool example on saros C98 to USDC
const USDC_TOKEN = {
  mintAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  addressSPL: 'FXRiEosEvHnpc3XZY1NS7an2PB1SunnYW1f5zppYhXb3',
  decimals: '6'
};

const C98_TOKEN = {
  mintAddress: 'C98A4nkJXhpVZNAZdHUA95RpTF3T4whtQubL3YobiUX9',
  addressSPL: 'EKCdCBjfQ6t5FBfDC2zvmr27PgfVVZU37C8LUE4UenKb',
  decimals: '6'
};

const poolParams = {
  address: '2wUvdZA8ZsY714Y5wUL9fkFmupJGGwzui2N74zqJWgty'
};

async function addLiquidity() {
  try {
    const poolAccountInfo = await getPoolInfo(
      connection,
      new PublicKey(poolParams.address)
    );

    const newPoolLpMintInfo = await getTokenMintInfo(
      connection,
      poolAccountInfo.lpTokenMint
    );

    const lpTokenSupply = newPoolLpMintInfo.supply
      ? newPoolLpMintInfo.supply.toNumber()
      : 0;

    const convertFromAmount = convertBalanceToWei(1, USDC_TOKEN.decimals);
    const newPoolToken0AccountInfo = await getTokenAccountInfo(
      connection,
      poolAccountInfo.token0Account
    );

    const lpTokenAmount =
      (parseFloat(convertFromAmount) * lpTokenSupply) /
      newPoolToken0AccountInfo.amount.toNumber();

    const result = await depositAllTokenTypes(
      connection,
      accountSol,
      new PublicKey(accountSol),
      new PublicKey(C98_TOKEN.addressSPL),
      new PublicKey(USDC_TOKEN.addressSPL),
      lpTokenAmount,
      new PublicKey(poolParams.address),
      new PublicKey('SSwapUtytfBdBn1b9NUGG6foMVPtcWgpRU32HToDUZr'), // Program address
      C98_TOKEN.mintAddress,
      USDC_TOKEN.mintAddress,
      SLIPPAGE
    );

    if (result.isError) {
      console.error('Add liquidity failed:', result.mess);
      return { success: false, message: result.mess };
    } else {
      console.log('Liquidity added successfully! Hash:', result.hash);
      return { success: true, hash: result.hash };
    }
  } catch (error) {
    console.error('Error:', error);
    return { success: false, message: error.message };
  }
}

async function removeLiquidity() {
  try {
    const poolAccountInfo = await getPoolInfo(
      connection,
      new PublicKey(poolParams.address)
    );

    const lpTokenSupply = poolAccountInfo.supply
      ? poolAccountInfo.supply.toNumber()
      : 0;

    const lpTokenMint = poolAccountInfo.lpTokenMint.toString();
    const newPoolToken0AccountInfo = await getTokenAccountInfo(
      connection,
      poolAccountInfo.token0Account
    );

    const lpTokenAmount =
      (parseFloat(1) * lpTokenSupply) /
      newPoolToken0AccountInfo.amount.toNumber();

    const infoLpUser = await getInfoTokenByMint(lpTokenMint, accountSol);

    const result = await withdrawAllTokenTypes(
      connection,
      accountSol,
      infoLpUser.pubkey,
      C98_TOKEN.addressSPL,
      USDC_TOKEN.addressSPL,
      lpTokenAmount,
      new PublicKey(poolParams.address),
      new PublicKey('SSwapUtytfBdBn1b9NUGG6foMVPtcWgpRU32HToDUZr'), // Program address
      C98_TOKEN.mintAddress,
      USDC_TOKEN.mintAddress,
      SLIPPAGE
    );

    if (result.isError) {
      console.error('Remove liquidity failed:', result.mess);
      return { success: false, message: result.mess };
    } else {
      console.log('Liquidity removed successfully! Hash:', result.hash);
      return { success: true, hash: result.hash };
    }
  } catch (error) {
    console.error('Error:', error);
    return { success: false, message: error.message };
  }
}

// Execute the operations
addLiquidity().then(result => {
  if (result.success) {
    console.log("Liquidity added with hash:", result.hash);
  } else {
    console.log("Add liquidity failed:", result.message);
  }
});

removeLiquidity().then(result => {
  if (result.success) {
    console.log("Liquidity removed with hash:", result.hash);
  } else {
    console.log("Remove liquidity failed:", result.message);
  }
});`

  const runCode = async () => {
    setIsRunning(true)
    setOutput("Running liquidity simulation...\n")

    // Simulate code execution
    setTimeout(() => {
      const mockOutput = `💧 Liquidity Management Simulation Results:
• Operation: Add Liquidity
• Tokens Added: 1.0 C98 + 0.85 USDC
• LP Tokens Received: 0.00012345
• Price Impact: 0.05%
• Estimated Transaction Hash: 5L22222222222222222222222222222222222222222
• Status: Success

🔄 Liquidity Management Simulation Results:
• Operation: Remove Liquidity
• LP Tokens Redeemed: 0.00012345
• Tokens Received: 1.0 C98 + 0.85 USDC
• Price Impact: 0.05%
• Estimated Transaction Hash: 5M33333333333333333333333333333333333333333
• Status: Success

⚠️  Note: This is a simulation. Real transactions require proper wallet connection and sufficient funds.`

      setOutput(mockOutput)
      setIsRunning(false)
    }, 3000)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(exampleCode)
    setCopied(true)
    toast({
      title: "Copied to clipboard",
      description: "The code example has been copied to your clipboard.",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-heading text-4xl font-bold mb-4">Liquidity Management Example</h1>
            <p className="text-xl text-muted-foreground">
              Learn how to add and remove liquidity using the Saros SDK with this complete example.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-xl font-heading">Liquidity Operations Implementation</CardTitle>
                <CardDescription>Complete code example for liquidity management</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                {copied ? <Check className="h-4 w-4 mr-2 text-green-500" /> : <Copy className="h-4 w-4 mr-2" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </CardHeader>
            <CardContent>
              <CodeBlock code={exampleCode} language="typescript" showCopy={false} />
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Run Example</CardTitle>
                <CardDescription>Simulate the liquidity operations</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={runCode} disabled={isRunning} className="w-full">
                  <Play className="mr-2 h-4 w-4" />
                  {isRunning ? "Running..." : "Run Liquidity Simulation"}
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  This simulation demonstrates the expected behavior of adding and removing liquidity.
                  In a real application, this would connect to the Solana network.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Output</CardTitle>
                <CardDescription>Results of the simulation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg p-4 min-h-[150px]">
                  <pre className="text-sm font-mono whitespace-pre-wrap">
                    {output || "Click 'Run Liquidity Simulation' to see the output here..."}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-8" />

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Key Components</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1">Pool Information</h3>
                  <p className="text-sm text-muted-foreground">
                    <code className="bg-muted px-1 rounded">getPoolInfo</code> retrieves information about the liquidity pool.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Token Mint Information</h3>
                  <p className="text-sm text-muted-foreground">
                    <code className="bg-muted px-1 rounded">getTokenMintInfo</code> gets details about the LP token mint.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Add Liquidity</h3>
                  <p className="text-sm text-muted-foreground">
                    <code className="bg-muted px-1 rounded">depositAllTokenTypes</code> adds liquidity to the pool.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Remove Liquidity</h3>
                  <p className="text-sm text-muted-foreground">
                    <code className="bg-muted px-1 rounded">withdrawAllTokenTypes</code> removes liquidity from the pool.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button asChild variant="outline" className="w-full">
                  <a href="https://github.com/coin98/saros-sdk" target="_blank">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View on GitHub
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <a href="/playground">
                    Try in Playground
                  </a>
                </Button>
                <Button asChild className="w-full">
                  <a href="/tutorials/liquidity">
                    View Full Tutorial
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}