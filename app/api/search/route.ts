import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")

  if (!query) {
    return NextResponse.json({ error: "Query parameter is missing" }, { status: 400 })
  }

  const mockResults = [
    // Quick Start Results
    {
      path: "/quickstart/sdk",
      title: "@saros-finance/sdk Quick Start",
      content: "Get started with the main Saros SDK for AMM, staking, and farming operations",
    },
    {
      path: "/quickstart/dlmm",
      title: "@saros-finance/dlmm-sdk Quick Start",
      content: "Learn how to use the Dynamic Liquidity Market Maker SDK",
    },
    {
      path: "/quickstart/rust",
      title: "saros-dlmm-sdk-rs Quick Start",
      content: "High-performance Rust SDK for DLMM operations",
    },
    // API Results
    {
      path: "/api/sdk",
      title: "@saros-finance/sdk API Reference",
      content: "Complete API documentation for AMM, stake, and farm functionality",
    },
    {
      path: "/api/dlmm",
      title: "@saros-finance/dlmm-sdk API Reference",
      content: "Dynamic Liquidity Market Maker API methods and interfaces",
    },
    // Examples
    {
      path: "/examples/swap",
      title: "Token Swap Examples",
      content: "Code examples for swapping tokens using Saros SDK",
    },
    {
      path: "/examples/liquidity",
      title: "Liquidity Management Examples",
      content: "Add and remove liquidity from pools with code examples",
    },
    {
      path: "/examples/staking",
      title: "Staking & Farming Examples",
      content: "Stake tokens and earn rewards with practical examples",
    },
    // Tutorials
    {
      path: "/tutorials/swap",
      title: "Token Swapping Tutorial",
      content: "Step-by-step guide to implement token swapping",
    },
    {
      path: "/tutorials/liquidity",
      title: "Liquidity Management Tutorial",
      content: "Learn how to manage liquidity positions effectively",
    },
    // Tools
    {
      path: "/playground",
      title: "Code Playground",
      content: "Interactive environment to test and experiment with SDK features",
    },
    {
      path: "/ai-checker",
      title: "AI Code Checker",
      content: "Get instant feedback on your code quality and best practices",
    },
  ]

  const filteredResults = mockResults
    .filter(
      (result) =>
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.content.toLowerCase().includes(query.toLowerCase()) ||
        result.path.toLowerCase().includes(query.toLowerCase()),
    )
    .sort((a, b) => {
      // Prioritize title matches over content matches
      const aTitle = a.title.toLowerCase().includes(query.toLowerCase()) ? 1 : 0
      const bTitle = b.title.toLowerCase().includes(query.toLowerCase()) ? 1 : 0
      return bTitle - aTitle
    })
    .slice(0, 8) // Limit to 8 results for better UX

  return NextResponse.json({ results: filteredResults })
}

