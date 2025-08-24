import { Header } from "@/components/header"
import { CodeBlock } from "@/components/code-block"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Package, Zap, Code, Terminal, Wrench } from "lucide-react"
import Link from "next/link"

export default function RustTutorialPage() {
  const prerequisitesCode = `# Install Rust and Cargo
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Add the Saros DLMM SDK to your Cargo.toml
[dependencies]
saros-dlmm-sdk = { path = "../saros-dlmm" }

# Or if using a published version
# saros-dlmm-sdk = "0.1.0"`

  const importCode = `// Import the necessary modules
use saros_dlmm_sdk::DlmmClient;
use solana_sdk::pubkey::Pubkey;
use anyhow::Result;`

  const initializeCode = `// Initialize the DLMM client
#[tokio::main]
async fn main() -> Result<()> {
    let client = DlmmClient::new("https://api.devnet.solana.com".to_string())?;
    // Your code here
    Ok(())
}`

  const getPoolsCode = `// Get a list of all available pools
let pools = client.get_all_pools().await?;
println!("Found {} pools", pools.len());

for pool in pools.iter().take(5) {
    println!("Pool: {}, TVL: {}", pool.address, pool.tvl);
}`

  const getPoolCode = `// Get information about a specific pool
let pool_address = "EwsqJeioGAXE5EdZHj1QvcuvqgVhJDp9729H5wjh28DD".parse::<Pubkey>()?;
let pool = client.get_pool(pool_address).await?;

println!("Pool Address: {}", pool.address);
println!("Token X: {}", pool.token_x);
println!("Token Y: {}", pool.token_y);
println!("TVL: {}", pool.tvl);`

  const getQuoteCode = `// Get a quote for a swap operation
let amount = 1_000_000u64; // 1 USDC (6 decimals)
let is_exact_input = true;
let swap_for_y = true;
let pair = pool_address;
let token_base = "C98A4nkJXhpVZNAZdHUA95RpTF3T4whtQubL3YobiUX9".parse::<Pubkey>()?;
let token_quote = "EPjFWdd5AufqSSqeM2qN1zzybapC8G4wEGGkZwyTDt1v".parse::<Pubkey>()?;
let token_base_decimal = 6;
let token_quote_decimal = 6;
let slippage = 0.5; // 0.5% slippage tolerance

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

println!("Quote: {:?}", quote);`

  const swapCode = `// Create a transaction for swapping tokens
let transaction = client.swap(
    amount,
    token_base, // token_mint_x
    token_quote, // token_mint_y
    quote.other_amount_offset,
    is_exact_input,
    swap_for_y,
    pair,
    payer_pubkey // User's wallet pubkey
).await?;

println!("Transaction created: {:?}", transaction);`

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Wrench className="h-6 w-6 text-primary" />
              <h1 className="font-heading text-4xl font-bold">Rust SDK Tutorial</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Learn how to use the high-performance Saros DLMM SDK for Rust with this comprehensive guide.
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
                This tutorial will guide you through the process of using the Saros DLMM SDK for Rust. 
                The Rust SDK provides zero-cost abstractions and memory safety for high-performance DeFi applications.
              </p>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold">60 min</div>
                  <div className="text-sm text-muted-foreground">Estimated Time</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold">Advanced</div>
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
              <li>Rust and Cargo installed</li>
              <li>Basic knowledge of Rust programming</li>
              <li>Understanding of Solana's account model</li>
              <li>Familiarity with async/await in Rust</li>
              <li>Access to a Solana RPC endpoint</li>
            </ul>
            <CodeBlock code={prerequisitesCode} language="toml" title="Install Dependencies" />
          </div>

          <Separator className="my-8" />

          {/* Step 1: Import Modules */}
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold mb-4">2. Import Modules</h2>
            <p className="text-muted-foreground mb-4">
              Import the necessary modules from the Saros DLMM SDK and Solana SDK.
            </p>
            <CodeBlock code={importCode} language="rust" title="Import Modules" />
          </div>

          <Separator className="my-8" />

          {/* Step 2: Initialize Client */}
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold mb-4">3. Initialize Client</h2>
            <p className="text-muted-foreground mb-4">
              Create a new DlmmClient instance connected to a Solana RPC endpoint.
            </p>
            <CodeBlock code={initializeCode} language="rust" title="Initialize Client" />
          </div>

          <Separator className="my-8" />

          {/* Step 3: Get All Pools */}
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold mb-4">4. Get All Pools</h2>
            <p className="text-muted-foreground mb-4">
              Retrieve a list of all available DLMM pools.
            </p>
            <CodeBlock code={getPoolsCode} language="rust" title="Get All Pools" />
          </div>

          <Separator className="my-8" />

          {/* Step 4: Get Specific Pool */}
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold mb-4">5. Get Specific Pool</h2>
            <p className="text-muted-foreground mb-4">
              Retrieve information about a specific DLMM pool by its address.
            </p>
            <CodeBlock code={getPoolCode} language="rust" title="Get Specific Pool" />
          </div>

          <Separator className="my-8" />

          {/* Step 5: Get Quote */}
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold mb-4">6. Get Swap Quote</h2>
            <p className="text-muted-foreground mb-4">
              Get a quote for a swap operation to see the expected output amount and price impact.
            </p>
            <CodeBlock code={getQuoteCode} language="rust" title="Get Swap Quote" />
          </div>

          <Separator className="my-8" />

          {/* Step 6: Execute Swap */}
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold mb-4">7. Execute Swap</h2>
            <p className="text-muted-foreground mb-4">
              Create a transaction for swapping tokens using the quote data.
            </p>
            <CodeBlock code={swapCode} language="rust" title="Execute Swap" />

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Understanding Rust DLMM Operations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <strong>1. Async Operations:</strong> All operations are async and must be awaited.
                </div>
                <div>
                  <strong>2. Error Handling:</strong> Use <code className="bg-muted px-1 rounded">Result&lt;T&gt;</code> for proper error handling.
                </div>
                <div>
                  <strong>3. Type Safety:</strong> Rust's type system ensures compile-time safety for all operations.
                </div>
                <div>
                  <strong>4. Performance:</strong> Zero-cost abstractions provide maximum performance with minimal overhead.
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Rust Benefits */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wrench className="mr-2 h-5 w-5" />
                Benefits of the Rust SDK
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Zero-Cost Abstractions</h3>
                <p className="text-muted-foreground">
                  The Rust SDK provides high-level abstractions without runtime overhead, resulting in performance comparable to hand-written C code.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Memory Safety</h3>
                <p className="text-muted-foreground">
                  Rust's ownership system prevents buffer overflows, null pointer dereferences, and other memory-related bugs at compile time.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Concurrency</h3>
                <p className="text-muted-foreground">
                  Rust's concurrency model makes it easy to write safe, concurrent code without data races.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Interoperability</h3>
                <p className="text-muted-foreground">
                  The Rust SDK can easily integrate with existing Solana programs and other Rust libraries in the ecosystem.
                </p>
              </div>
            </CardContent>
          </Card>

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
                  <Link href="/tutorials/dlmm">
                    <Code className="mr-2 h-4 w-4" />
                    DLMM Concepts
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/tutorials/swap">
                    <Zap className="mr-2 h-4 w-4" />
                    Token Swapping
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/examples/rust">
                    <Package className="mr-2 h-4 w-4" />
                    View Example Code
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="https://github.com/coin98/saros-dlmm-sdk-rs" target="_blank">
                    View on GitHub
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
                <strong>Performance:</strong> The Rust SDK is ideal for high-frequency trading systems and server-side applications requiring maximum performance.
              </div>
              <div>
                <strong>Safety:</strong> Rust's memory safety guarantees prevent entire classes of bugs that are common in other systems programming languages.
              </div>
              <div>
                <strong>Ecosystem:</strong> The Rust SDK integrates seamlessly with the broader Solana and Rust ecosystems.
              </div>
              <div>
                <strong>Learning Curve:</strong> While Rust has a steeper learning curve, the investment pays off in terms of reliability and performance.
              </div>
              <div>
                <strong>Production Use:</strong> The Rust SDK is recommended for production applications where performance and safety are critical.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}