import { Header } from "@/components/header"
import { CodeBlock } from "@/components/code-block"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Package, Zap, Code, Terminal } from "lucide-react"
import Link from "next/link"

export default function SwapTutorialPage() {
  const prerequisitesCode = `// Install the required packages
npm install @saros-finance/sdk @solana/web3.js

// Import the necessary modules
import { getSwapAmountSaros, swapSaros, genConnectionSolana } from '@saros-finance/sdk';
import { PublicKey } from '@solana/web3.js';`

  const connectionCode = `// Generate a connection to the Solana network
const connection = genConnectionSolana();

// Define your wallet address (in a real app, this would come from a connected wallet)
const accountSol = 'YOUR_WALLET_PUBLIC_KEY';

// Define the payer account object
const payerAccount = { publicKey: new PublicKey(accountSol) };`

  const tokenConfigCode = `// Configure the tokens you want to swap
// Example: Swapping C98 for USDC

const USDC_TOKEN = {
  id: 'usd-coin',
  mintAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
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
    EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: {
      ...USDC_TOKEN,
    },
  },
  tokenIds: [
    'C98A4nkJXhpVZNAZdHUA95RpTF3T4whtQubL3YobiUX9',
    'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  ],
};`

  const getQuoteCode = `// Get a quote for the swap
const fromTokenAccount = C98_TOKEN.addressSPL;
const toTokenAccount = USDC_TOKEN.addressSPL;
const fromMint = C98_TOKEN.mintAddress;
const toMint = USDC_TOKEN.mintAddress;
const fromAmount = 1; // 1 C98
const SLIPPAGE = 0.5; // 0.5% slippage tolerance

// Get swap quote
const estSwap = await getSwapAmountSaros(
  connection,
  fromMint,
  toMint,
  fromAmount,
  SLIPPAGE,
  poolParams
);

console.log('Estimated swap:', estSwap);`

  const executeSwapCode = `// Execute the swap
const { amountOutWithSlippage } = estSwap;

const result = await swapSaros(
  connection,
  fromTokenAccount.toString(),
  toTokenAccount.toString(),
  parseFloat(fromAmount),
  parseFloat(amountOutWithSlippage),
  null, // referral account (optional)
  new PublicKey(poolParams.address),
  new PublicKey('SSwapUtytfBdBn1b9NUGG6foMVPtcWgpRU32HToDUZr'), // Program address
  accountSol,
  fromMint,
  toMint
);

// Handle the result
if (result.isError) {
  console.log(\`Swap failed: \${result.mess}\`);
} else {
  console.log(\`Swap successful! Transaction hash: \${result.hash}\`);
}`

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Package className="h-6 w-6 text-primary" />
              <h1 className="font-heading text-4xl font-bold">Token Swapping Tutorial</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Learn how to swap tokens using the Saros SDK with this comprehensive step-by-step guide.
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
                This tutorial will guide you through the process of swapping tokens using the Saros SDK. 
                We'll cover everything from setting up your environment to executing a real token swap on the Solana blockchain.
              </p>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold">30 min</div>
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
              <li>Token accounts for the tokens you want to swap</li>
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
              Define the tokens you want to swap, including their mint addresses and SPL token accounts.
            </p>
            <CodeBlock code={tokenConfigCode} language="typescript" title="Token Configuration" />
          </div>

          <Separator className="my-8" />

          {/* Step 3: Configure Pool */}
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold mb-4">4. Configure Pool</h2>
            <p className="text-muted-foreground mb-4">
              Set up the pool parameters for the swap. You'll need to know the pool address and token information.
            </p>
            <CodeBlock code={poolConfigCode} language="typescript" title="Pool Configuration" />
          </div>

          <Separator className="my-8" />

          {/* Step 4: Get Quote */}
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold mb-4">5. Get Swap Quote</h2>
            <p className="text-muted-foreground mb-4">
              Before executing a swap, get a quote to see the expected output amount and price impact.
            </p>
            <CodeBlock code={getQuoteCode} language="typescript" title="Get Swap Quote" />
          </div>

          <Separator className="my-8" />

          {/* Step 5: Execute Swap */}
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold mb-4">6. Execute Swap</h2>
            <p className="text-muted-foreground mb-4">
              Finally, execute the swap transaction with the parameters from the quote.
            </p>
            <CodeBlock code={executeSwapCode} language="typescript" title="Execute Swap" />

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Understanding the Swap Process</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <strong>1. Get Quote:</strong> We call <code className="bg-muted px-1 rounded">getSwapAmountSaros</code> to calculate the expected output
                  amount and apply slippage protection.
                </div>
                <div>
                  <strong>2. Execute Swap:</strong> We use <code className="bg-muted px-1 rounded">swapSaros</code> to perform the actual token exchange on-chain.
                </div>
                <div>
                  <strong>3. Handle Result:</strong> The function returns a result object with transaction hash or error information.
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
                  <Link href="/tutorials/liquidity">
                    <Code className="mr-2 h-4 w-4" />
                    Liquidity Management
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/tutorials/staking">
                    <Zap className="mr-2 h-4 w-4" />
                    Staking & Farming
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/examples/swap">
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
                <strong>Wallet Connection:</strong> In a real application, you'll need to connect a wallet like Phantom to get the user's public key.
              </div>
              <div>
                <strong>Token Accounts:</strong> Ensure you have valid SPL token accounts for both the input and output tokens.
              </div>
              <div>
                <strong>Slippage Protection:</strong> Always use slippage protection to prevent unfavorable trades due to price changes.
              </div>
              <div>
                <strong>Error Handling:</strong> Implement proper error handling to manage transaction failures gracefully.
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