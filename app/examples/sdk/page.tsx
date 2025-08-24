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

export default function SDKExamplePage() {
  const { toast } = useToast()
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)

  const examples = {
    swap: {
      title: "Swap",
      description: "Swap tokens using the Saros SDK.",
      code: `import { getSwapAmountSaros, swapSaros, genConnectionSolana } from '@saros-finance/sdk';
import { PublicKey } from '@solana/web3.js';

const connection = genConnectionSolana();
const accountSol = 'YOUR_WALLET_PUBLIC_KEY';

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
  address: '2wUvdZA8ZsY714Y5wUL9fkFmupJGGwzui2N74zqJWgty',
  tokens: {
    [C98_TOKEN.mintAddress]: C98_TOKEN,
    [USDC_TOKEN.mintAddress]: USDC_TOKEN,
  },
  tokenIds: [
    'C98A4nkJXhpVZNAZdHUA95RpTF3T4whtQubL3YobiUX9',
    'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  ],
};

async function performSwap() {
  const fromTokenAccount = C98_TOKEN.addressSPL;
  const toTokenAccount = USDC_TOKEN.addressSPL;
  const fromMint = C98_TOKEN.mintAddress;
  const toMint = USDC_TOKEN.mintAddress;
  const fromAmount = 1;
  const SLIPPAGE = 0.5;

  const estSwap = await getSwapAmountSaros(
    connection,
    fromMint,
    toMint,
    fromAmount,
    SLIPPAGE,
    poolParams
  );

  const { amountOutWithSlippage } = estSwap;

  const result = await swapSaros(
    connection,
    fromTokenAccount.toString(),
    toTokenAccount.toString(),
    fromAmount,
    amountOutWithSlippage,
    null,
    new PublicKey(poolParams.address),
    new PublicKey('SSwapUtytfBdBn1b9NUGG6foMVPtcWgpRU32HToDUZr'),
    accountSol,
    fromMint,
    toMint
  );

  console.log(result);
}

performSwap();
`
    },
    addLiquidity: {
      title: "Add Liquidity",
      description: "Add liquidity to a pool.",
      code: `import { getPoolInfo, depositAllTokenTypes, genConnectionSolana, convertBalanceToWei, getTokenMintInfo, getTokenAccountInfo } from '@saros-finance/sdk';
import { PublicKey } from '@solana/web3.js';

// ... (setup connection, tokens, etc.)

async function addLiquidity() {
  const poolAccountInfo = await getPoolInfo(
    connection,
    new PublicKey(poolParams.address)
  );

  const lpTokenAmount = 1000000; // Example amount

  const result = await depositAllTokenTypes(
    connection,
    accountSol,
    new PublicKey(accountSol),
    new PublicKey(C98_TOKEN.addressSPL),
    new PublicKey(USDC_TOKEN.addressSPL),
    lpTokenAmount,
    new PublicKey(poolParams.address),
    new PublicKey('SSwapUtytfBdBn1b9NUGG6foMVPtcWgpRU32HToDUZr'),
    C98_TOKEN.mintAddress,
    USDC_TOKEN.mintAddress,
    0.5
  );

  console.log(result);
}

addLiquidity();
`
    },
    removeLiquidity: {
      title: "Remove Liquidity",
      description: "Remove liquidity from a pool.",
      code: `import { getPoolInfo, withdrawAllTokenTypes, genConnectionSolana, getInfoTokenByMint, getTokenAccountInfo } from '@saros-finance/sdk';
import { PublicKey } from '@solana/web3.js';

// ... (setup connection, tokens, etc.)

async function removeLiquidity() {
  const poolAccountInfo = await getPoolInfo(
    connection,
    new PublicKey(poolParams.address)
  );

  const lpTokenAmount = 1000000; // Example amount

  const infoLpUser = await getInfoTokenByMint(poolAccountInfo.lpTokenMint.toString(), accountSol);

  const result = await withdrawAllTokenTypes(
    connection,
    accountSol,
    infoLpUser.pubkey,
    C98_TOKEN.addressSPL,
    USDC_TOKEN.addressSPL,
    lpTokenAmount,
    new PublicKey(poolParams.address),
    new PublicKey('SSwapUtytfBdBn1b9NUGG6foMVPtcWgpRU32HToDUZr'),
    C98_TOKEN.mintAddress,
    USDC_TOKEN.mintAddress,
    0.5
  );

  console.log(result);
}

removeLiquidity();
`
    },
    staking: {
      title: "Staking",
      description: "Stake tokens and earn rewards.",
      code: `import sarosSdk, { genConnectionSolana } from '@saros-finance/sdk';
import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';

const { SarosStakeServices } = sarosSdk;
const connection = genConnectionSolana();
const accountSol = 'YOUR_WALLET_PUBLIC_KEY';

// Assuming similar staking process to farming
async function stake() {
  const stakePoolList = await SarosStakeServices.getListPool({ page: 1, size: 10 });
  const stakePool = stakePoolList[0]; // Select a pool

  const hash = await SarosStakeServices.stakePool(
    connection,
    { publicKey: new PublicKey(accountSol) },
    new PublicKey(stakePool.poolAddress),
    new BN(100),
    new PublicKey('STAKE_PROGRAM_ADDRESS'), // Replace with actual stake program address
    stakePool.rewards,
    new PublicKey(stakePool.lpAddress)
  );

  console.log(hash);
}

stake();
`
    },
    farming: {
      title: "Farming",
      description: "Farm LP tokens and earn rewards.",
      code: `import sarosSdk, { genConnectionSolana } from '@saros-finance/sdk';
import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';

const { SarosFarmService } = sarosSdk;
const connection = genConnectionSolana();
const accountSol = 'YOUR_WALLET_PUBLIC_KEY';

const farmParam = {
  lpAddress: 'HVUeNVH93PAFwJ67ENJwPWFU9cWcM57HEAmkFLFTcZkj',
  poolAddress: 'FW9hgAiUsFYpqjHaGCGw4nAvejz4tAp9qU7kFpYr1fQZ',
  rewards: [
    {
      address: 'C98A4nkJXhpVZNAZdHUA95RpTF3T4whtQubL3YobiUX9',
      poolRewardAddress: 'AC3FyChJwuU7EY9h4BqzjcN8CtGD7YRrAbeRdjcqe1AW',
      rewardPerBlock: 6600000,
      rewardTokenAccount: 'F6aHSR3ChwCXD67wrX2ZBHMkmmU9Gfm9QQmiTBrKvsmJ',
      id: 'coin98'
    },
  ],
};

async function farm() {
  const hash = await SarosFarmService.stakePool(
    connection,
    { publicKey: new PublicKey(accountSol) },
    new PublicKey(farmParam.poolAddress),
    new BN(100),
    new PublicKey('SFarmWM5wLFNEw1q5ofqL7CrwBMwdcqQgK6oQuoBGZJ'),
    farmParam.rewards,
    new PublicKey(farmParam.lpAddress)
  );

  console.log(hash);
}

farm();
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
            <h1 className="font-heading text-4xl font-bold mb-4">@saros-finance/sdk Examples</h1>
            <p className="text-xl text-muted-foreground">
              Learn how to work with the Saros SDK with these complete examples.
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