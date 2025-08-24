"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { CodeBlock } from "@/components/code-block"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Play, Copy, Check, ExternalLink } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function StakingExamplePage() {
  const { toast } = useToast()
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)

  const exampleCode = `import sarosSdk, { genConnectionSolana } from '@saros-finance/sdk';
import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';

const { SarosFarmService } = sarosSdk;

const connection = genConnectionSolana();
const payerAccount = { publicKey: new PublicKey('YOUR_WALLET_PUBLIC_KEY') };

const SAROS_FARM_ADDRESS = new PublicKey('SFarmWM5wLFNEw1q5ofqL7CrwBMwdcqQgK6oQuoBGZJ');

const farmParams = {
  poolAddress: 'FW9hgAiUsFYpqjHaGCGw4nAvejz4tAp9qU7kFpYr1fQZ',
  lpAddress: 'HVUeNVH93PAFwJ67ENJwPWFU9cWcM57HEAmkFLFTcZkj',
  rewards: [{
    address: 'C98A4nkJXhpVZNAZdHUA95RpTF3T4whtQubL3YobiUX9',
    poolRewardAddress: 'AC3FyChJwuU7EY9h4BqzjcN8CtGD7YRrAbeRdjcqe1AW',
    rewardPerBlock: 6600000,
    rewardTokenAccount: 'F6aHSR3ChwCXD67wrX2ZBHMkmmU9Gfm9QQmiTBrKvsmJ',
  }]
};

async function stakeTokens() {
  try {
    const stakeAmount = new BN(100 * 1e6); // 100 tokens (6 decimals)

    const hash = await SarosFarmService.stakePool(
      connection,
      payerAccount,
      new PublicKey(farmParams.poolAddress),
      stakeAmount,
      SAROS_FARM_ADDRESS,
      farmParams.rewards,
      new PublicKey(farmParams.lpAddress)
    );

    console.log('Staking successful! Transaction hash:', hash);
    return { success: true, hash };
  } catch (error) {
    console.error('Staking failed:', error);
    return { success: false, message: error.message };
  }
}

async function unStakeTokens() {
  try {
    const unStakeAmount = new BN(50 * 1e6); // 50 tokens (6 decimals)

    const hash = await SarosFarmService.unStakePool(
      connection,
      payerAccount,
      new PublicKey(farmParams.poolAddress),
      new PublicKey(farmParams.lpAddress),
      unStakeAmount,
      SAROS_FARM_ADDRESS,
      farmParams.rewards,
      false // Set to true if want to unstake full balance
    );

    console.log('Unstaking successful! Transaction hash:', hash);
    return { success: true, hash };
  } catch (error) {
    console.error('Unstaking failed:', error);
    return { success: false, message: error.message };
  }
}

async function claimRewards() {
  try {
    const poolRewardAddress = farmParams.rewards[0].poolRewardAddress;
    const mintAddress = farmParams.rewards[0].address;

    const hash = await SarosFarmService.claimReward(
      connection,
      payerAccount,
      new PublicKey(poolRewardAddress),
      SAROS_FARM_ADDRESS,
      new PublicKey(mintAddress)
    );

    console.log('Rewards claimed! Transaction hash:', hash);
    return { success: true, hash };
  } catch (error) {
    console.error('Claim failed:', error);
    return { success: false, message: error.message };
  }
}

// Execute the operations
stakeTokens().then(result => {
  if (result.success) {
    console.log("Tokens staked with hash:", result.hash);
  } else {
    console.log("Staking failed:", result.message);
  }
});

unStakeTokens().then(result => {
  if (result.success) {
    console.log("Tokens unstaked with hash:", result.hash);
  } else {
    console.log("Unstaking failed:", result.message);
  }
});

claimRewards().then(result => {
  if (result.success) {
    console.log("Rewards claimed with hash:", result.hash);
  } else {
    console.log("Claim failed:", result.message);
  }
});`

  const runCode = async () => {
    setIsRunning(true)
    setOutput("Running staking simulation...\n")

    // Simulate code execution
    setTimeout(() => {
      const mockOutput = `🥩 Staking Simulation Results:
• Operation: Stake Tokens
• Amount Staked: 100 LP Tokens
• Pool APY: 24.5%
• Estimated Transaction Hash: 5N44444444444444444444444444444444444444444
• Status: Success

🔄 Unstaking Simulation Results:
• Operation: Unstake Tokens
• Amount Unstaked: 50 LP Tokens
• Estimated Transaction Hash: 5O55555555555555555555555555555555555555555
• Status: Success

💰 Rewards Claim Simulation Results:
• Operation: Claim Rewards
• Rewards Claimed: 2.45 C98 Tokens
• Estimated Transaction Hash: 5P66666666666666666666666666666666666666666
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
            <h1 className="font-heading text-4xl font-bold mb-4">Staking & Farming Example</h1>
            <p className="text-xl text-muted-foreground">
              Learn how to stake tokens and claim rewards using the Saros SDK with this complete example.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-xl font-heading">Staking Operations Implementation</CardTitle>
                <CardDescription>Complete code example for staking and farming</CardDescription>
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
                <CardDescription>Simulate the staking operations</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={runCode} disabled={isRunning} className="w-full">
                  <Play className="mr-2 h-4 w-4" />
                  {isRunning ? "Running..." : "Run Staking Simulation"}
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  This simulation demonstrates the expected behavior of staking, unstaking, and claiming rewards.
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
                    {output || "Click 'Run Staking Simulation' to see the output here..."}
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
                  <h3 className="font-semibold mb-1">SarosFarmService</h3>
                  <p className="text-sm text-muted-foreground">
                    The main service for interacting with Saros farms and staking pools.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Stake Tokens</h3>
                  <p className="text-sm text-muted-foreground">
                    <code className="bg-muted px-1 rounded">SarosFarmService.stakePool</code> stakes LP tokens in a farm.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Unstake Tokens</h3>
                  <p className="text-sm text-muted-foreground">
                    <code className="bg-muted px-1 rounded">SarosFarmService.unStakePool</code> unstakes LP tokens from a farm.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Claim Rewards</h3>
                  <p className="text-sm text-muted-foreground">
                    <code className="bg-muted px-1 rounded">SarosFarmService.claimReward</code> claims accumulated rewards.
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
                  <a href="/tutorials/staking">
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