import { Header } from "@/components/header"
import { CodeBlock } from "@/components/code-block"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Package, Zap, Code } from "lucide-react"
import Link from "next/link"
import { PublicKey } from "@solana/web3.js"
import { getSwapAmountSaros, swapSaros, genConnectionSolana } from "@saros-finance/sdk"

const USDC_TOKEN = {
  id: "usd-coin",
  mintAddress: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  symbol: "usdc",
  name: "USD Coin",
  decimals: "6",
  addressSPL: "FXRiEosEvHnpc3XZY1NS7an2PB1SunnYW1f5zppYhXb3",
}

const C98_TOKEN = {
  id: "coin98",
  mintAddress: "C98A4nkJXhpVZNAZdHUA95RpTF3T4whtQubL3YobiUX9",
  symbol: "C98",
  name: "Coin98",
  decimals: "6",
  addressSPL: "EKCdCBjfQ6t5FBfDC2zvmr27PgfVVZU37C8LUE4UenKb",
}

const SAROS_SWAP_PROGRAM_ADDRESS_V1 = new PublicKey("SSwapUtytfBdBn1b9NUGG6foMVPtcWgpRU32HToDUZr")

const poolParams = {
  address: "2wUvdZA8ZsY714Y5wUL9fkFmupJGGwzui2N74zqJWgty",
  tokens: {
    [C98_TOKEN.mintAddress]: C98_TOKEN,
    [USDC_TOKEN.mintAddress]: USDC_TOKEN,
  },
  tokenIds: [C98_TOKEN.mintAddress, USDC_TOKEN.mintAddress],
}

const connection = genConnectionSolana()
const accountSol = "YOUR_WALLET_PUBLIC_KEY"
let payerAccount = { publicKey: undefined };
try {
  payerAccount.publicKey = new PublicKey(accountSol);
} catch (e) {
  // ignore
}

const onSwap = async () => {
  const fromTokenAccount = C98_TOKEN.addressSPL
  const toTokenAccount = USDC_TOKEN.addressSPL
  const fromMint = C98_TOKEN.mintAddress
  const toMint = USDC_TOKEN.mintAddress
  const fromAmount = 1
  const SLIPPAGE = 0.5

  // Get swap quote
  const estSwap = await getSwapAmountSaros(connection, fromMint, toMint, fromAmount, SLIPPAGE, poolParams)

  const { amountOutWithSlippage } = estSwap

  // Execute swap
  const result = await swapSaros(
    connection,
    fromTokenAccount.toString(),
    toTokenAccount.toString(),
    Number.parseFloat(fromAmount.toString()),
    Number.parseFloat(amountOutWithSlippage),
    null,
    new PublicKey(poolParams.address),
    SAROS_SWAP_PROGRAM_ADDRESS_V1,
    accountSol,
    fromMint,
    toMint,
  )

  if (result.isError) {
    return console.log(result.mess)
  }
  return "Your transaction hash " + result.hash
}

export default function SDKQuickStartPage() {
  const installCode = `npm install @saros-finance/sdk
# or
yarn add @saros-finance/sdk`

  const importCode = `import sarosSdk, {
  getSwapAmountSaros,
  swapSaros,
  createPool,
  getPoolInfo,
  depositAllTokenTypes,
  withdrawAllTokenTypes,
  convertBalanceToWei,
  genConnectionSolana,
} from '@saros-finance/sdk';

import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';

const { SarosFarmService, SarosStakeServices } = sarosSdk;`

  const connectionCode = `const connection = genConnectionSolana();
const accountSol = 'YOUR_WALLET_PUBLIC_KEY';
let payerAccount = { publicKey: undefined };
try {
  payerAccount.publicKey = new PublicKey(accountSol);
} catch (e) {
  // ignore
}`;

  const tokenConfigCode = `const USDC_TOKEN = {
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

  const swapCode = `const onSwap = async () => {
  const fromTokenAccount = C98_TOKEN.addressSPL;
  const toTokenAccount = USDC_TOKEN.addressSPL;
  const fromMint = C98_TOKEN.mintAddress;
  const toMint = USDC_TOKEN.mintAddress;
  const fromAmount = 1;
  const SLIPPAGE = 0.5;

  // Get swap quote
  const estSwap = await getSwapAmountSaros(
    connection,
    fromMint,
    toMint,
    fromAmount,
    SLIPPAGE,
    poolParams
  );

  const { amountOutWithSlippage } = estSwap;
  
  // Execute swap
  const result = await swapSaros(
    connection,
    fromTokenAccount.toString(),
    toTokenAccount.toString(),
    parseFloat(fromAmount.toString()),
    parseFloat(amountOutWithSlippage),
    null,
    new PublicKey(poolParams.address),
    SAROS_SWAP_PROGRAM_ADDRESS_V1,
    accountSol,
    fromMint,
    toMint
  );

  if (result.isError) {
    return console.log(result.mess);
  }
  return "Your transaction hash " + result.hash;
};`

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
                @saros-finance/sdk
              </Badge>
              <Badge variant="outline">TypeScript</Badge>
            </div>
            <h1 className="font-heading text-4xl font-bold mb-4">Quick Start Guide</h1>
            <p className="text-xl text-muted-foreground">
              Get up and running with the Saros Finance SDK in minutes. This guide covers installation, basic setup, and
              your first swap operation.
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
              Install the Saros Finance SDK using your preferred package manager:
            </p>
            <CodeBlock code={installCode} language="bash" title="Install SDK" />
          </div>

          <Separator className="my-8" />

          {/* Step 2: Import and Setup */}
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold mb-4">2. Import and Setup</h2>
            <p className="text-muted-foreground mb-4">Import the necessary functions and set up your connection:</p>
            <CodeBlock code={importCode} language="typescript" title="Import SDK" />

            <div className="mt-6">
              <h3 className="font-heading text-lg font-semibold mb-3">Connection Setup</h3>
              <CodeBlock code={connectionCode} language="typescript" title="Setup Connection" />
            </div>
          </div>

          <Separator className="my-8" />

          {/* Step 3: Token Configuration */}
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold mb-4">3. Token Configuration</h2>
            <p className="text-muted-foreground mb-4">Define your token configurations for the swap:</p>
            <CodeBlock code={tokenConfigCode} language="typescript" title="Token Configuration" />
          </div>

          {/* Finding Pool and Token Information */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Finding Pool and Token Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                To interact with a specific pool, you need its address and the mint addresses of the tokens it contains. You can find this information using a block explorer like Solscan or by using the SDK to fetch a list of available pools.
              </p>
              <div>
                <h4 className="font-semibold mb-2">Using the SDK:</h4>
                <p className="text-sm text-muted-foreground">
                  The <code className="bg-muted px-1 rounded">SarosFarmService</code> and <code className="bg-muted px-1 rounded">SarosStakeServices</code> can be used to fetch lists of available pools, which include the necessary addresses.
                </p>
              </div>
            </CardContent>
          </Card>

          <Separator className="my-8" />

          {/* Step 4: Your First Swap */}
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold mb-4">4. Your First Swap</h2>
            <p className="text-muted-foreground mb-4">Now let's perform a token swap using the SDK:</p>
            <CodeBlock code={swapCode} language="typescript" title="Token Swap Example" />

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Understanding the Swap Process</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <strong>1. Get Quote:</strong> First, we call{" "}
                  <code className="bg-muted px-1 rounded">getSwapAmountSaros</code> to calculate the expected output
                  amount and apply slippage protection.
                </div>
                <div>
                  <strong>2. Execute Swap:</strong> Then we use <code className="bg-muted px-1 rounded">swapSaros</code>{" "}
                  to perform the actual token exchange on-chain.
                </div>
                <div>
                  <strong>3. Handle Result:</strong> The function returns a result object with transaction hash or error
                  information.
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Next Steps */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>🎉 Congratulations!</CardTitle>
              <CardDescription>
                You've successfully set up the Saros Finance SDK and performed your first swap.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Button asChild variant="outline">
                  <Link href="/tutorials/liquidity">
                    <Code className="mr-2 h-4 w-4" />
                    Learn Liquidity Management
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/tutorials/staking">
                    <Zap className="mr-2 h-4 w-4" />
                    Explore Staking & Farming
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/examples/sdk">
                    <Package className="mr-2 h-4 w-4" />
                    View More Examples
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
