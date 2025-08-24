"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { CodeBlock } from "@/components/code-block"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Play, Copy, Check, ExternalLink } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function RustDLMMExamplePage() {
  const { toast } = useToast()
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)

  const exampleCode = `use saros_dlmm_sdk::DlmmClient;
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
    
    // Get a specific pool (using a placeholder address)
    let pool_address = "EwsqJeioGAXE5EdZHj1QvcuvqgVhJDp9729H5wjh28DD".parse()?;
    let pool = client.get_pool(pool_address).await?;
    
    // Get a quote for a swap
    let amount = 1_000_000u64; // 1 USDC (6 decimals)
    let is_exact_input = true;
    let swap_for_y = true;
    let pair = pool_address;
    let token_base = "C98A4nkJXhpVZNAZdHUA95RpTF3T4whtQubL3YobiUX9".parse()?;
    let token_quote = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v".parse()?;
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
    
    // In a real application, you would then execute the swap
    // let transaction = client.swap(...).await?;
    
    Ok(())
}`

  const runCode = async () => {
    setIsRunning(true)
    setOutput("Running Rust DLMM simulation...\n")

    // Simulate code execution
    setTimeout(() => {
      const mockOutput = `🦀 Rust DLMM Simulation Results:
• Initializing client with devnet RPC endpoint
• Retrieving all pools
• Found 42 pools
• Pool: Ewsq...28DD, TVL: 125000.50 USDC
• Pool: Fxyz...99AB, TVL: 87500.25 USDC
• Pool: Gabc...33CD, TVL: 210000.75 USDC
• Retrieving specific pool: Ewsq...28DD
• Getting quote for swap
• Quote: 
  - Amount In: 1,000,000 (1 USDC)
  - Amount Out: 1,176,470 (1.176 C98)
  - Price Impact: 0.08%
  - Bin Step: 25

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
            <h1 className="font-heading text-4xl font-bold mb-4">Rust DLMM SDK Example</h1>
            <p className="text-xl text-muted-foreground">
              Learn how to use the high-performance Saros DLMM SDK for Rust with this complete example.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-xl font-heading">Rust DLMM Implementation</CardTitle>
                <CardDescription>Complete code example for Rust DLMM operations</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                {copied ? <Check className="h-4 w-4 mr-2 text-green-500" /> : <Copy className="h-4 w-4 mr-2" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </CardHeader>
            <CardContent>
              <CodeBlock code={exampleCode} language="rust" showCopy={false} />
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Run Example</CardTitle>
                <CardDescription>Simulate the Rust DLMM operations</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={runCode} disabled={isRunning} className="w-full">
                  <Play className="mr-2 h-4 w-4" />
                  {isRunning ? "Running..." : "Run Rust DLMM Simulation"}
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  This simulation demonstrates the expected behavior of the Rust DLMM SDK.
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
                    {output || "Click 'Run Rust DLMM Simulation' to see the output here..."}
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
                  <h3 className="font-semibold mb-1">DlmmClient</h3>
                  <p className="text-sm text-muted-foreground">
                    The main client for interacting with DLMM pools and performing operations in Rust.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Get All Pools</h3>
                  <p className="text-sm text-muted-foreground">
                    <code className="bg-muted px-1 rounded">client.get_all_pools()</code> retrieves all available DLMM pools.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Get Quote</h3>
                  <p className="text-sm text-muted-foreground">
                    <code className="bg-muted px-1 rounded">client.get_quote()</code> calculates the expected output for a swap.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">High Performance</h3>
                  <p className="text-sm text-muted-foreground">
                    The Rust SDK provides zero-cost abstractions and memory safety for high-performance DeFi applications.
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
                  <a href="https://github.com/coin98/saros-dlmm-sdk-rs" target="_blank">
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
                  <a href="/tutorials/rust">
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