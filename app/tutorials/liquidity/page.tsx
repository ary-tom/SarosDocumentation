import { Header } from "@/components/header"
import { CodeBlock } from "@/components/code-block"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Package, Zap, Code, Terminal, Droplets } from "lucide-react"
import Link from "next/link"

export default function LiquidityTutorialPage() {
  const prerequisitesCode = `// Install the required packages
npm install @saros-finance/sdk @solana/web3.js

// Import the necessary modules
import { 
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
import BN from 'bn.js';`

  const connectionCode = `// Generate a connection to the Solana network
const connection = genConnectionSolana();

// Define your wallet address (in a real app, this would come from a connected wallet)
const accountSol = 'YOUR_WALLET_PUBLIC_KEY';

// Define the payer account object
const payerAccount = { publicKey: new PublicKey(accountSol) };`

  const tokenConfigCode = `// Configure the tokens for the liquidity pool
// Example: C98-USDC liquidity pool

const USDC_TOKEN = {
  id: 'usd-coin',
  mintAddress: 'EPjFWdd5AufqSSqeM2qN1zzybapC8G4wEGGkZwyTDt1v',
  symbol: 'usdc',
  name: 'USD Coin',
  decimals: '6',
  addressSPL: 'FXRiEosEvHnpc3XZY1NS7an2PB1SunnYW1f5zppYhXb3',
};

const C98_TOKEN = {
  id: 'coin98',
  mintAddress: 'C98A4nkJXhpVZNAZdHUA95RpTF3T4whtQubL3YobiUX9',
  symbol: 'C98',
  name: 'Coin98',
  decimals: '6',
  addressSPL: 'EKCdCBjfQ6t5FBfDC2zvmr27PgfVVZU37C8LUE4UenKb',
};`

  const poolConfigCode = `// Configure the pool parameters
const poolParams = {
  address: '2wUvdZA8ZsY714Y5wUL9fkFmupJGGwzui2N74zqJWgty',
  tokens: {
    C98A4nkJXhpVZNAZdHUA95RpTF3T4whtQubL3YobiUX9: {
      ...C98_TOKEN,
    },
    EPjFWdd5AufqSSqeM2qN1zzybapC8G4wEGGkZwyTDt1v: {
      ...USDC_TOKEN,
    },
  },
  tokenIds: [
    'C98A4nkJXhpVZNAZdHUA95RpTF3T4whtQubL3YobiUX9',
    'EPjFWdd5AufqSSqeM2qN1zzybapC8G4wEGGkZwyTDt1v',
  ],
};`

  const getPoolInfoCode = `// Get information about the liquidity pool
const poolAccountInfo = await getPoolInfo(
  connection,
  new PublicKey(poolParams.address)
);

console.log('Pool Info:', poolAccountInfo);`

  const addLiquidityCode = `// Add liquidity to the pool
const SLIPPAGE = 0.5; // 0.5% slippage tolerance

// Get pool LP token mint information
const newPoolLpMintInfo = await getTokenMintInfo(
  connection,
  poolAccountInfo.lpTokenMint
);

// Calculate LP token supply
const lpTokenSupply = newPoolLpMintInfo.supply
  ? newPoolLpMintInfo.supply.toNumber()
  : 0;

// Convert token amounts
const convertFromAmount = convertBalanceToWei(1, USDC_TOKEN.decimals);
const newPoolToken0AccountInfo = await getTokenAccountInfo(
  connection,
  poolAccountInfo.token0Account
);

// Calculate LP token amount to receive
const lpTokenAmount =
  (parseFloat(convertFromAmount) * lpTokenSupply) /
  newPoolToken0AccountInfo.amount.toNumber();

// Add liquidity to the pool
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

// Handle the result
if (result.isError) {
  console.log(\`Add liquidity failed: \${result.mess}\`);
} else {
  console.log(\`Liquidity added successfully! Transaction hash: \${result.hash}\`);
}`

  const removeLiquidityCode = `// Remove liquidity from the pool
// Get LP token information
const lpTokenMint = poolAccountInfo.lpTokenMint.toString();
const newPoolToken0AccountInfo = await getTokenAccountInfo(
  connection,
  poolAccountInfo.token0Account
);

// Calculate LP token amount to redeem
const lpTokenAmount =
  (parseFloat(1) * lpTokenSupply) /
  newPoolToken0AccountInfo.amount.toNumber();

// Get user's LP token account
const infoLpUser = await getInfoTokenByMint(lpTokenMint, accountSol);

// Remove liquidity from the pool
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

// Handle the result
if (result.isError) {
  console.log(\`Remove liquidity failed: \${result.mess}\`);
} else {
  console.log(\`Liquidity removed successfully! Transaction hash: \${result.hash}\`);
}`

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Droplets className="h-6 w-6 text-primary" />
              <h1 className="font-heading text-4xl font-bold">Liquidity Management Tutorial</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Learn how to add and remove liquidity from pools using the Saros SDK with this comprehensive guide.
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
                This tutorial will guide you through the process of providing liquidity to pools and withdrawing it using the Saros SDK. 
                Liquidity providers earn fees from trades that occur in their pools.
              </p>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold">45 min</div>
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
              <li>Token accounts for the tokens you want to provide as liquidity</li>
              <li>Understanding of how liquidity pools work (recommended)</li>
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

          {/* Step 2: Configure Tokens */}
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold mb-4">3. Configure Tokens</h2>
            <p className="text-muted-foreground mb-4">
              Define the tokens for your liquidity pool, including their mint addresses and SPL token accounts.
            </p>
            <CodeBlock code={tokenConfigCode} language="typescript" title="Token Configuration" />
          </div>

          <Separator className="my-8" />

          {/* Step 3: Configure Pool */}
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold mb-4">4. Configure Pool</h2>
            <p className="text-muted-foreground mb-4">
              Set up the pool parameters for liquidity operations. You'll need to know the pool address and token information.
            </p>
            <CodeBlock code={poolConfigCode} language="typescript" title="Pool Configuration" />
          </div>

          <Separator className="my-8" />

          {/* Step 4: Get Pool Information */}
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold mb-4">5. Get Pool Information</h2>
            <p className="text-muted-foreground mb-4">
              Retrieve information about the liquidity pool to understand its current state.
            </p>
            <CodeBlock code={getPoolInfoCode} language="typescript" title="Get Pool Information" />
          </div>

          <Separator className="my-8" />

          {/* Step 5: Add Liquidity */}
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold mb-4">6. Add Liquidity</h2>
            <p className="text-muted-foreground mb-4">
              Add liquidity to the pool by depositing tokens and receiving LP tokens in return.
            </p>
            <CodeBlock code={addLiquidityCode} language="typescript" title="Add Liquidity" />

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Understanding Add Liquidity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <strong>1. Calculate Amounts:</strong> We calculate the LP token amount the user will receive based on their deposit.
                </div>
                <div>
                  <strong>2. Execute Deposit:</strong> We use <code className="bg-muted px-1 rounded">depositAllTokenTypes</code> to add liquidity to the pool.
                </div>
                <div>
                  <strong>3. Receive LP Tokens:</strong> The user receives LP tokens proportional to their share of the pool.
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-8" />

          {/* Step 6: Remove Liquidity */}
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold mb-4">7. Remove Liquidity</h2>
            <p className="text-muted-foreground mb-4">
              Remove liquidity from the pool by burning LP tokens and receiving the underlying tokens back.
            </p>
            <CodeBlock code={removeLiquidityCode} language="typescript" title="Remove Liquidity" />

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Understanding Remove Liquidity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <strong>1. Calculate Amounts:</strong> We calculate the token amounts the user will receive based on their LP token burn.
                </div>
                <div>
                  <strong>2. Execute Withdrawal:</strong> We use <code className="bg-muted px-1 rounded">withdrawAllTokenTypes</code> to remove liquidity from the pool.
                </div>
                <div>
                  <strong>3. Receive Tokens:</strong> The user receives the underlying tokens proportional to their LP token burn.
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
                  <Link href="/tutorials/staking">
                    <Zap className="mr-2 h-4 w-4" />
                    Staking & Farming
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/examples/liquidity">
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
                <strong>Impermanent Loss:</strong> Understand the concept of impermanent loss when providing liquidity.
              </div>
              <div>
                <strong>Fee Earnings:</strong> Liquidity providers earn a portion of the trading fees generated by the pool.
              </div>
              <div>
                <strong>Slippage Protection:</strong> Use slippage protection when adding or removing liquidity to prevent unfavorable trades.
              </div>
              <div>
                <strong>Pool Selection:</strong> Research pools carefully before providing liquidity to understand the risks and rewards.
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