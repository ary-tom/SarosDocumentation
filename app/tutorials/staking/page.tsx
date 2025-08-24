import { Header } from "@/components/header"
import { CodeBlock } from "@/components/code-block"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Package, Zap, Code, Terminal, Coins } from "lucide-react"
import Link from "next/link"

export default function StakingTutorialPage() {
  const prerequisitesCode = `// Install the required packages
npm install @saros-finance/sdk @solana/web3.js

// Import the necessary modules
import sarosSdk, { genConnectionSolana } from '@saros-finance/sdk';
import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';

// Extract the services we need
const { SarosFarmService, SarosStakeServices } = sarosSdk;`

  const connectionCode = `// Generate a connection to the Solana network
const connection = genConnectionSolana();

// Define your wallet address (in a real app, this would come from a connected wallet)
const accountSol = 'YOUR_WALLET_PUBLIC_KEY';

// Define the payer account object
const payerAccount = { publicKey: new PublicKey(accountSol) };`

  const farmConfigCode = `// Configure the farm parameters
const SAROS_FARM_ADDRESS = new PublicKey('SFarmWM5wLFNEw1q5ofqL7CrwBMwdcqQgK6oQuoBGZJ');

const farmParam = {
  lpAddress: 'HVUeNVH93PAFwJ67ENJwPWFU9cWcM57HEAmkFLFTcZkj',
  poolAddress: 'FW9hgAiUsFYpqjHaGCGw4nAvejz4tAp9qU7kFpYr1fQZ',
  poolLpAddress: '2wUvdZA8ZsY714Y5wUL9fkFmupJGGwzui2N74zqJWgty',
  rewards: [
    {
      address: 'C98A4nkJXhpVZNAZdHUA95RpTF3T4whtQubL3YobiUX9',
      poolRewardAddress: 'AC3FyChJwuU7EY9h4BqzjcN8CtGD7YRrAbeRdjcqe1AW',
      rewardPerBlock: 6600000,
      rewardTokenAccount: 'F6aHSR3ChwCXD67wrX2ZBHMkmmU9Gfm9QQmiTBrKvsmJ',
      id: 'coin98'
    },
  ],
  token0: 'C98A4nkJXhpVZNAZdHUA95RpTF3T4whtQubL3YobiUX9',
  token1: 'EPjFWdd5AufqSSqeM2qN1zzybapC8G4wEGGkZwyTDt1v',
  token0Id: 'coin98',
  token1Id: 'usd-coin'
};`

  const listFarmsCode = `// Get a list of available farms
try {
  const response = await SarosFarmService.getListPool({page: 1, size: 10});
  console.log('Available Farms:', response);
  return response;
} catch(err) {
  console.error('Error fetching farms:', err);
  return [];
}`

  const stakeTokensCode = `// Stake LP tokens in a farm
const stakeAmount = new BN(100 * 1e6); // 100 tokens (6 decimals)

const hash = await SarosFarmService.stakePool(
  connection,
  payerAccount,
  new PublicKey(farmParam.poolAddress),
  stakeAmount,
  SAROS_FARM_ADDRESS,
  farmParam.rewards,
  new PublicKey(farmParam.lpAddress)
);

console.log(\`Staking successful! Transaction hash: \${hash}\`);`

  const unStakeTokensCode = `// Unstake LP tokens from a farm
const unStakeAmount = new BN(50 * 1e6); // 50 tokens (6 decimals)

const hash = await SarosFarmService.unStakePool(
  connection,
  payerAccount,
  new PublicKey(farmParam.poolAddress),
  new PublicKey(farmParam.lpAddress),
  unStakeAmount,
  SAROS_FARM_ADDRESS,
  farmParam.rewards,
  false // Set to true if want to unstake full balance
);

console.log(\`Unstaking successful! Transaction hash: \${hash}\`);`

  const claimRewardsCode = `// Claim rewards from a farm
const poolRewardAddress = farmParam.rewards[0].poolRewardAddress;
const mintAddress = farmParam.rewards[0].address;

const hash = await SarosFarmService.claimReward(
  connection,
  payerAccount,
  new PublicKey(poolRewardAddress),
  new PublicKey(SAROS_FARM_ADDRESS),
  new PublicKey(mintAddress)
);

console.log(\`Rewards claimed! Transaction hash: \${hash}\`);`

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Coins className="h-6 w-6 text-primary" />
              <h1 className="font-heading text-4xl font-bold">Staking & Farming Tutorial</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Learn how to stake tokens and earn rewards using the Saros SDK with this comprehensive guide.
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
                This tutorial will guide you through the process of staking LP tokens in farms and claiming rewards using the Saros SDK. 
                Staking allows you to earn additional tokens as rewards for supporting the protocol.
              </p>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold">40 min</div>
                  <div className="text-sm text-muted-foreground">Estimated Time</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold">Intermediate</div>
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
              <li>Basic knowledge of TypeScript/JavaScript</li>
              <li>A Solana wallet with some SOL for transaction fees</li>
              <li>LP tokens to stake (obtained by providing liquidity to pools)</li>
              <li>Understanding of staking and farming concepts (recommended)</li>
            </ul>
            <CodeBlock code={prerequisitesCode} language="bash" title="Install Dependencies" />
          </div>

          <Separator className="my-8" />

          {/* Step 1: Set up Connection */}
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold mb-4">2. Set up Connection</h2>
            <p className="text-muted-foreground mb-4">
              First, we need to establish a connection to the Solana network and configure our wallet.
            </p>
            <CodeBlock code={connectionCode} language="typescript" title="Connection Setup" />
          </div>

          <Separator className="my-8" />

          {/* Step 2: Configure Farm */}
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold mb-4">3. Configure Farm</h2>
            <p className="text-muted-foreground mb-4">
              Set up the farm parameters for staking operations. You'll need to know the farm address and reward information.
            </p>
            <CodeBlock code={farmConfigCode} language="typescript" title="Farm Configuration" />
          </div>

          <Separator className="my-8" />

          {/* Step 3: List Available Farms */}
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold mb-4">4. List Available Farms</h2>
            <p className="text-muted-foreground mb-4">
              Retrieve a list of available farms to see what staking opportunities are available.
            </p>
            <CodeBlock code={listFarmsCode} language="typescript" title="List Farms" />
          </div>

          <Separator className="my-8" />

          {/* Step 4: Stake Tokens */}
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold mb-4">5. Stake Tokens</h2>
            <p className="text-muted-foreground mb-4">
              Stake your LP tokens in a farm to begin earning rewards.
            </p>
            <CodeBlock code={stakeTokensCode} language="typescript" title="Stake Tokens" />

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Understanding Staking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <strong>1. Prepare Amount:</strong> We specify the amount of LP tokens to stake using BN (BigNumber) for precision.
                </div>
                <div>
                  <strong>2. Execute Staking:</strong> We use <code className="bg-muted px-1 rounded">SarosFarmService.stakePool</code> to stake tokens in the farm.
                </div>
                <div>
                  <strong>3. Receive Confirmation:</strong> The function returns a transaction hash to confirm the staking operation.
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-8" />

          {/* Step 5: Unstake Tokens */}
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold mb-4">6. Unstake Tokens</h2>
            <p className="text-muted-foreground mb-4">
              Unstake your LP tokens from a farm when you want to stop earning rewards.
            </p>
            <CodeBlock code={unStakeTokensCode} language="typescript" title="Unstake Tokens" />

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Understanding Unstaking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <strong>1. Prepare Amount:</strong> We specify the amount of LP tokens to unstake.
                </div>
                <div>
                  <strong>2. Execute Unstaking:</strong> We use <code className="bg-muted px-1 rounded">SarosFarmService.unStakePool</code> to unstake tokens from the farm.
                </div>
                <div>
                  <strong>3. Receive Tokens:</strong> The LP tokens are returned to your wallet.
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-8" />

          {/* Step 6: Claim Rewards */}
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold mb-4">7. Claim Rewards</h2>
            <p className="text-muted-foreground mb-4">
              Claim the rewards you've earned from staking your LP tokens.
            </p>
            <CodeBlock code={claimRewardsCode} language="typescript" title="Claim Rewards" />

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Understanding Rewards</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <strong>1. Calculate Rewards:</strong> The protocol calculates the rewards you've earned based on your stake and time.
                </div>
                <div>
                  <strong>2. Execute Claim:</strong> We use <code className="bg-muted px-1 rounded">SarosFarmService.claimReward</code> to claim your rewards.
                </div>
                <div>
                  <strong>3. Receive Tokens:</strong> The reward tokens are sent to your wallet.
                </div>
              </CardContent>
            </Card>
          </div>

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
                  <Link href="/examples/staking">
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
                <strong>Lock-up Periods:</strong> Some farms may have lock-up periods during which you cannot unstake your tokens.
              </div>
              <div>
                <strong>Reward Calculation:</strong> Rewards are typically calculated based on your share of the pool and the time you've been staking.
              </div>
              <div>
                <strong>Compound Rewards:</strong> Consider reinvesting your rewards to maximize your earnings over time.
              </div>
              <div>
                <strong>Risk Management:</strong> Understand the risks associated with staking, including smart contract risks and impermanent loss.
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