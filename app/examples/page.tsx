import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/code-block"
import { ArrowRight, Play, Copy, Wheat } from "lucide-react"

export default function ExamplesPage() {
  const examples = [
    {
      title: "Simple Token Swap",
      description: "Swap tokens using the Saros SDK",
      sdk: "@saros-finance/sdk",
      difficulty: "Beginner",
      href: "/examples/swap",
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

async function performSwap() {
  try {
    // Get swap quote
    const estSwap = await getSwapAmountSaros(
      connection,
      C98_TOKEN.mintAddress,
      USDC_TOKEN.mintAddress,
      1, // 1 C98
      0.5, // 0.5% slippage
      poolParams
    );

    // Execute swap
    const result = await swapSaros(
      connection,
      C98_TOKEN.addressSPL,
      USDC_TOKEN.addressSPL,
      1,
      estSwap.amountOutWithSlippage,
      null,
      new PublicKey(poolParams.address),
      new PublicKey('PROGRAM_ADDRESS'),
      accountSol,
      C98_TOKEN.mintAddress,
      USDC_TOKEN.mintAddress
    );

    if (result.isError) {
      console.log(\`Swap failed: \${result.mess}\`);
    } else {
      console.log(\`Swap successful! Hash: \${result.hash}\`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}`,
    },
    {
      title: "Add Liquidity to Pool",
      description: "Provide liquidity to earn trading fees",
      sdk: "@saros-finance/sdk",
      difficulty: "Intermediate",
      href: "/examples/liquidity",
      code: `import { 
  getPoolInfo, 
  depositAllTokenTypes, 
  getTokenMintInfo, 
  getTokenAccountInfo,
  genConnectionSolana,
  convertBalanceToWei
} from '@saros-finance/sdk';
import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';

const connection = genConnectionSolana();
const accountSol = 'YOUR_WALLET_PUBLIC_KEY';
const SLIPPAGE = 0.5;

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
      new PublicKey('PROGRAM_ADDRESS'),
      C98_TOKEN.mintAddress,
      USDC_TOKEN.mintAddress,
      SLIPPAGE
    );

    if (result.isError) {
      console.log(\`Add liquidity failed: \${result.mess}\`);
    } else {
      console.log(\`Liquidity added! Hash: \${result.hash}\`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}`,
    },
    {
      title: "DLMM Pool Operations",
      description: "Dynamic liquidity market maker operations",
      sdk: "@saros-finance/dlmm-sdk",
      difficulty: "Advanced",
      href: "/examples/dlmm",
      code: `import { LiquidityBookServices, MODE } from "@saros-finance/dlmm-sdk";
import { PublicKey } from "@solana/web3.js";

const liquidityBookServices = new LiquidityBookServices({
  mode: MODE.MAINNET,
});

const YOUR_WALLET = "YOUR_WALLET_PUBLIC_KEY";

async function getDLMMQuote() {
  try {
    const quoteData = await liquidityBookServices.getQuote({
      amount: BigInt(1000000), // 1 USDC
      isExactInput: true,
      swapForY: true,
      pair: new PublicKey("POOL_ADDRESS"),
      tokenBase: new PublicKey("TOKEN_BASE"),
      tokenQuote: new PublicKey("TOKEN_QUOTE"),
      tokenBaseDecimal: 6,
      tokenQuoteDecimal: 6,
      slippage: 0.5
    });

    console.log('DLMM Quote:', {
      amountIn: quoteData.amountIn.toString(),
      amountOut: quoteData.amountOut.toString(),
      priceImpact: quoteData.priceImpact,
    });

    return quoteData;
  } catch (error) {
    console.error('Error getting DLMM quote:', error);
  }
}

async function executeDLMMSwap() {
  try {
    const quote = await getDLMMQuote();
    if (!quote) return;

    const transaction = await liquidityBookServices.swap({
      amount: quote.amount,
      tokenMintX: new PublicKey("TOKEN_MINT_X"),
      tokenMintY: new PublicKey("TOKEN_MINT_Y"),
      otherAmountOffset: quote.otherAmountOffset,
      isExactInput: true,
      swapForY: true,
      pair: new PublicKey("POOL_ADDRESS"),
      payer: new PublicKey(YOUR_WALLET)
    });

    console.log('DLMM swap transaction created:', transaction);
  } catch (error) {
    console.error('Error executing DLMM swap:', error);
  }
}`,
    },
    {
      title: "Stake Tokens",
      description: "Stake tokens to earn rewards",
      sdk: "@saros-finance/sdk",
      difficulty: "Beginner",
      href: "/examples/staking",
      code: `import sarosSdk from '@saros-finance/sdk';
import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';

const { SarosFarmService } = sarosSdk;

const connection = genConnectionSolana();
const payerAccount = { publicKey: new PublicKey('YOUR_WALLET_PUBLIC_KEY') };

const SAROS_FARM_ADDRESS = new PublicKey('SFarmWM5wLFNEw1q5ofqL7CrwBMwdcqQgK6oQuoBGZJ');

async function stakeTokens() {
  try {
    const stakeAmount = new BN(100 * 1e6); // 100 tokens

    const hash = await SarosFarmService.stakePool(
      connection,
      payerAccount,
      new PublicKey(farmParams.poolAddress),
      stakeAmount,
      SAROS_FARM_ADDRESS,
      farmParams.rewards,
      new PublicKey(farmParams.lpAddress)
    );

    console.log('Staking successful! Hash:', hash);
  } catch (error) {
    console.error('Staking failed:', error);
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
      new PublicKey(SAROS_FARM_ADDRESS),
      new PublicKey(mintAddress)
    );

    console.log('Rewards claimed! Hash:', hash);
  } catch (error) {
    console.error('Claim failed:', error);
  }
}`,
    },
    {
      title: "Yield Farming",
      description: "Participate in yield farming programs",
      sdk: "@saros-finance/sdk",
      difficulty: "Intermediate",
      href: "/examples/farming",
      code: `import sarosSdk from '@saros-finance/sdk';
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

async function farmTokens() {
  try {
    const farmAmount = new BN(100 * 1e6); // 100 LP tokens

    const hash = await SarosFarmService.stakePool(
      connection,
      payerAccount,
      new PublicKey(farmParams.poolAddress),
      farmAmount,
      SAROS_FARM_ADDRESS,
      farmParams.rewards,
      new PublicKey(farmParams.lpAddress)
    );

    console.log('Farming started! Hash:', hash);
    return { success: true, hash };
  } catch (error) {
    console.error('Farming failed:', error);
    return { success: false, message: error.message };
  }
}

async function unStakeTokens() {
  try {
    const unStakeAmount = new BN(50 * 1e6); // 50 LP tokens

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

    console.log('Tokens unstaked! Hash:', hash);
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

    console.log('Rewards claimed! Hash:', hash);
    return { success: true, hash };
  } catch (error) {
    console.error('Claim failed:', error);
    return { success: false, message: error.message };
  }
}`,
    },
    {
      title: "Rust DLMM Integration",
      description: "High-performance DLMM operations in Rust",
      sdk: "saros-dlmm-sdk-rs",
      difficulty: "Advanced",
      href: "/examples/rust",
      code: `use saros_dlmm_sdk::DlmmClient;
use solana_sdk::pubkey::Pubkey;
use anyhow::Result;

#[tokio::main]
async fn main() -> Result<()> {
    // Initialize the client
    let client = DlmmClient::new("https://api.devnet.solana.com".to_string())?;
    
    // Get all pools
    let pools = client.get_all_pools().await?;
    println!("Found {} pools", pools.len());
    
    for pool in pools.iter().take(3) {
        println!("Pool: {}, TVL: {}", pool.address, pool.tvl);
    }
    
    // Get a specific pool
    let pool_address = "POOL_ADDRESS".parse()?;
    let pool = client.get_pool(pool_address).await?;
    
    // Get a quote for a swap
    let amount = 1_000_000u64; // 1 USDC (6 decimals)
    let is_exact_input = true;
    let swap_for_y = true;
    let pair = pool_address;
    let token_base = "TOKEN_BASE".parse()?;
    let token_quote = "TOKEN_QUOTE".parse()?;
    let token_base_decimal = 6;
    let token_quote_decimal = 6;
    let slippage = 0.5;
    
    let quote = client.get_quote(
        amount,
        is_exact_input,
        swap_for_y,
        pair,
        token_base,
        token_quote,
        token_base_decimal,
        token_quote_decimal,
        slippage
    ).await?;
    
    println!("Quote: {:?}", quote);
    
    Ok(())
}`,
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-heading font-bold mb-4">Code Examples</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready-to-use code examples for common Saros SDK operations. Copy, paste, and customize for your project.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {examples.map((example) => (
              <Card key={example.title} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{example.sdk}</Badge>
                    <Badge className={getDifficultyColor(example.difficulty)}>{example.difficulty}</Badge>
                  </div>
                  <CardTitle className="text-xl font-heading flex items-center">
                    {example.title.includes("Farming") && <Wheat className="mr-2 h-5 w-5" />}
                    {example.title}
                  </CardTitle>
                  <CardDescription>{example.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <CodeBlock code={example.code} language={example.sdk.includes("rust") ? "rust" : "typescript"} />
                  </div>
                  <div className="flex gap-2">
                    <Button asChild className="flex-1">
                      <Link href={example.href}>
                        <Play className="mr-2 h-4 w-4" />
                        Run Example
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-heading font-bold mb-4">Want to Try Live Code?</h2>
            <p className="text-muted-foreground mb-6">
              Use our interactive playground to experiment with Saros SDKs in real-time.
            </p>
            <Button asChild>
              <Link href="/playground">
                Open Playground
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}