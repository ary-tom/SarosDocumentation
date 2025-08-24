import { Header } from "@/components/header"
import { CodeBlock } from "@/components/code-block"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Package, Zap, Code } from "lucide-react"
import Link from "next/link"

export default function RustQuickStartPage() {
  const installCode = `[dependencies]
saros-dlmm-sdk = { path = "../saros-dlmm" }`

  const importCode = `use saros_dlmm_sdk::SarosDlmm;
use jupiter_amm_interface::{Amm, AmmContext, QuoteParams, SwapParams};
use solana_sdk::pubkey::Pubkey;
use std::sync::Arc;
use std::sync::atomic::{AtomicI64, AtomicU64};`

  const initializeCode = `// Initialize the DLMM client
#[tokio::main]
async fn main() -> Result<()> {
    let client = DlmmClient::new("https://api.devnet.solana.com".to_string())?;
    // Your code here
    Ok(())
}`

  const getPoolsCode = `let pools = client.get_all_pools().await?;
for pool in pools {
    println!("Pool: {}, TVL: {}", pool.address, pool.tvl);
}`

  const getQuoteCode = `let quote_params = QuoteParams {
    amount: 1000000,
    input_mint: Pubkey::from_str("C98A4nkJXhpVZNAZdHUA95RpTF3T4whtQubL3YobiUX9").unwrap(),
    output_mint: Pubkey::from_str("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v").unwrap(),
    swap_mode: SwapMode::ExactIn,
};
let quote = saros_dlmm.quote(&quote_params)?;`

  const swapCode = `let swap_params = SwapParams {
    in_amount: 1000000,
    out_amount: quote.out_amount,
    source_mint: Pubkey::from_str("C98A4nkJXhpVZNAZdHUA95RpTF3T4whtQubL3YobiUX9").unwrap(),
    destination_mint: Pubkey::from_str("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v").unwrap(),
    source_token_account: Pubkey::from_str("YOUR_SOURCE_TOKEN_ACCOUNT").unwrap(),
    destination_token_account: Pubkey::from_str("YOUR_DESTINATION_TOKEN_ACCOUNT").unwrap(),
    token_transfer_authority: Pubkey::from_str("YOUR_WALLET_PUBLIC_KEY").unwrap(),
};
let swap_and_account_metas = saros_dlmm.get_swap_and_account_metas(&swap_params)?;`

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
                saros-dlmm-sdk-rs
              </Badge>
              <Badge variant="outline">Rust</Badge>
            </div>
            <h1 className="font-heading text-4xl font-bold mb-4">Quick Start Guide</h1>
            <p className="text-xl text-muted-foreground">
              Get up and running with the Saros Finance DLMM SDK for Rust in minutes. This guide covers installation, basic setup, and
              your first operations using the high-performance Rust SDK.
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
                <li>• Rust and Cargo installed</li>
                <li>• Basic knowledge of Rust programming</li>
                <li>• Solana wallet with some SOL for transaction fees</li>
                <li>• Understanding of Solana's account model (helpful but not required)</li>
              </ul>
            </CardContent>
          </Card>

          {/* Step 1: Installation */}
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold mb-4">1. Installation</h2>
            <p className="text-muted-foreground mb-4">
              Add the Saros Finance DLMM SDK to your Rust project's <code className="bg-muted px-1 rounded">Cargo.toml</code>:
            </p>
            <CodeBlock code={installCode} language="toml" title="Cargo.toml" />
          </div>

          <Separator className="my-8" />

          {/* Step 2: Import and Initialize */}
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold mb-4">2. Import and Initialize</h2>
            <p className="text-muted-foreground mb-4">Import the necessary modules and initialize the client:</p>
            <CodeBlock code={importCode} language="rust" title="Import SDK" />

            <div className="mt-6">
              <h3 className="font-heading text-lg font-semibold mb-3">Initialize Client</h3>
              <CodeBlock code={initializeCode} language="rust" title="Initialize DLMM Client" />
            </div>
          </div>

          <Separator className="my-8" />

          

          {/* Step 3: Get a Quote */}          <div className="mb-8">            <h2 className="font-heading text-2xl font-bold mb-4">3. Get a Swap Quote</h2>            <p className="text-muted-foreground mb-4">Before executing a swap, get a quote for the expected output:</p>            <CodeBlock code={getQuoteCode} language="rust" title="Get Swap Quote" />          </div>          <Separator className="my-8" />          {/* Step 4: Execute Swap */}          <div className="mb-8">            <h2 className="font-heading text-2xl font-bold mb-4">4. Execute Swap</h2>            <p className="text-muted-foreground mb-4">Use the quote data to create and execute the swap transaction:</p>            <CodeBlock code={swapCode} language="rust" title="Execute Swap" />

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Understanding the Swap Process</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <strong>1. Initialize Client:</strong> First, we create a <code className="bg-muted px-1 rounded">DlmmClient</code> instance
                  connected to the Solana network.
                </div>
                <div>
                  <strong>2. Get Quote:</strong> We call the <code className="bg-muted px-1 rounded">get_quote</code> method to calculate the
                  expected output amount and other parameters needed for the swap.
                </div>
                <div>
                  <strong>3. Execute Swap:</strong> Then we use the <code className="bg-muted px-1 rounded">swap</code> method to create the
                  transaction for the token exchange.
                </div>
                <div>
                  <strong>4. Sign and Send:</strong> In a real implementation, you would sign the transaction with your wallet
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
                You've successfully set up the Saros Finance DLMM SDK for Rust and performed your first operations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Button asChild variant="outline">
                  <Link href="/tutorials/rust">
                    <Code className="mr-2 h-4 w-4" />
                    Learn Rust SDK Concepts
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/tutorials/dlmm">
                    <Zap className="mr-2 h-4 w-4" />
                    Explore DLMM Concepts
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/examples/rust">
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
                <strong>Compilation Issues:</strong> Make sure you have the latest Rust toolchain installed and all dependencies
                are correctly specified in your <code className="bg-muted px-1 rounded">Cargo.toml</code>.
              </div>
              <div>
                <strong>Connection Issues:</strong> Verify that the RPC endpoint URL is correct and accessible.
              </div>
              <div>
                <strong>Transaction Failures:</strong> Ensure your wallet has sufficient SOL for transaction fees and
                the tokens you're trying to swap.
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