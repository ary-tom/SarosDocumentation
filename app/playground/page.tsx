"use client"

import { useState, useEffect, useRef } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Play, RotateCcw, Copy, Terminal, Loader2, Wallet, AlertCircle } from "lucide-react"
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js"
import { useWallet } from '@solana/wallet-adapter-react'
import { NetworkSelector } from "@/components/network-selector"

export default function PlaygroundPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("swap")
  const [code, setCode] = useState("")
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [network, setNetwork] = useState("devnet")
  const [customEndpoint, setCustomEndpoint] = useState("")
  const [connection, setConnection] = useState<Connection | null>(null)
  
  const { connected, publicKey, signTransaction, signAllTransactions } = useWallet()
  const outputRef = useRef<HTMLDivElement>(null)

  // Initialize connection
  useEffect(() => {
    updateConnection()
  }, [network, customEndpoint])

  // Update code when template or wallet changes
  useEffect(() => {
    const template = templates[selectedTemplate as keyof typeof templates]
    if (template) {
      let updatedCode = template.code
      
      // Replace placeholders with actual values
      if (connected && publicKey) {
        updatedCode = updatedCode.replace(/YOUR_WALLET_ADDRESS/g, publicKey.toBase58())
      } else {
        updatedCode = updatedCode.replace(/YOUR_WALLET_ADDRESS/g, "// Please connect your wallet first")
      }
      
      // Replace network placeholder
      updatedCode = updatedCode.replace(/NETWORK_MODE/g, network === "mainnet-beta" ? "MODE.MAINNET" : "MODE.DEVNET")
      
      setCode(updatedCode)
    }
  }, [selectedTemplate, publicKey, network, connected])

  const updateConnection = () => {
    let endpoint;
    if (network === "custom" && customEndpoint) {
      endpoint = customEndpoint
    } else {
      endpoint = clusterApiUrl(network as any)
    }
    
    try {
      const newConnection = new Connection(endpoint, 'confirmed')
      setConnection(newConnection)
    } catch (error: any) {
      console.error("Failed to create connection:", error)
      setOutput("⚠ Failed to connect to " + endpoint + "\n" + error.message)
    }
  }

  const templates = {
    swap: {
      title: "Token Swap (Regular)",
      description: "Token swap using regular Saros SDK",
      code: `// Real Token Swap using Saros SDK
const { getSwapAmountSaros, swapSaros, genConnectionSolana } = sarosSdk
const { PublicKey } = solanaWeb3

// Your wallet address (automatically filled when wallet is connected)
const YOUR_WALLET = "YOUR_WALLET_ADDRESS"

// Token configurations
const USDC_TOKEN = {
  id: "usd-coin",
  mintAddress: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  symbol: "USDC",
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

const POOL_PARAMS = {
  address: "2wUvdZA8ZsY714Y5wUL9fkFmupJGGwzui2N74zqJWgty",
  tokens: {
    [C98_TOKEN.mintAddress]: C98_TOKEN,
    [USDC_TOKEN.mintAddress]: USDC_TOKEN,
  },
  tokenIds: [C98_TOKEN.mintAddress, USDC_TOKEN.mintAddress],
}

const SLIPPAGE = 0.5
const SAROS_SWAP_PROGRAM_ADDRESS_V1 = new PublicKey("SSwapUtytfBdBn1b9NUGG6foMVPtcWgpRU32HToDUZr")

async function performSwap() {
  console.log("🚀 Starting real token swap on Saros...")
  
  if (!YOUR_WALLET || YOUR_WALLET.includes("connect")) {
    console.error("❌ Please connect your wallet first!")
    return { success: false, message: "Wallet not connected" }
  }

  try {
    console.log("🔗 Connected to:", network)
    console.log("💼 Wallet:", YOUR_WALLET)
    
    // Create connection
    const connection = window.connection || genConnectionSolana()
    
    const fromTokenAccount = C98_TOKEN.addressSPL
    const toTokenAccount = USDC_TOKEN.addressSPL
    const fromMint = C98_TOKEN.mintAddress
    const toMint = USDC_TOKEN.mintAddress
    const fromAmount = 0.1 // 0.1 C98 tokens
    
    console.log(\`📋 Swap: \${fromAmount} \${C98_TOKEN.symbol} → \${USDC_TOKEN.symbol}\`)
    
    // Get swap quote
    console.log("⏳ Getting swap quote...")
    const estSwap = await getSwapAmountSaros(
      connection,
      fromMint,
      toMint,
      fromAmount,
      SLIPPAGE,
      POOL_PARAMS
    )
    
    console.log("💱 Quote received:")
    console.log(\`  Amount In: \${fromAmount} \${C98_TOKEN.symbol}\`)
    console.log(\`  Amount Out (with slippage): \${estSwap.amountOutWithSlippage} \${USDC_TOKEN.symbol}\`)
    console.log(\`  Price Impact: \${estSwap.priceImpact}%\`)
    
    // Execute swap
    console.log("⏳ Executing swap transaction...")
    const result = await swapSaros(
      connection,
      fromTokenAccount.toString(),
      toTokenAccount.toString(),
      parseFloat(fromAmount.toString()),
      parseFloat(estSwap.amountOutWithSlippage),
      null,
      new PublicKey(POOL_PARAMS.address),
      SAROS_SWAP_PROGRAM_ADDRESS_V1,
      YOUR_WALLET,
      fromMint,
      toMint
    )
    
    if (result.isError) {
      console.error("❌ Swap failed:", result.mess)
      return { success: false, message: result.mess }
    }
    
    console.log("✅ Swap completed successfully!")
    console.log("🔗 Transaction hash:", result.hash)
    
    return { 
      success: true, 
      transactionHash: result.hash,
      amountIn: fromAmount,
      amountOut: estSwap.amountOutWithSlippage,
      priceImpact: estSwap.priceImpact
    }
    
  } catch (error) {
    console.error("❌ Error during swap:", error.message)
    return { success: false, message: error.message }
  }
}

// Run the swap
performSwap()`,
    },
    dlmm: {
      title: "DLMM Swap",
      description: "Dynamic Liquidity Market Maker swap using DLMM SDK",
      code: `// Real DLMM Swap using Saros DLMM SDK
const { LiquidityBookServices, MODE } = sarosDlmmSdk
const { PublicKey } = solanaWeb3

// Your wallet address (automatically filled when wallet is connected)
const YOUR_WALLET = "YOUR_WALLET_ADDRESS"

// Initialize DLMM service
const liquidityBookServices = new LiquidityBookServices({
  mode: NETWORK_MODE,
})

// Token configurations
const USDC_TOKEN = {
  id: "usd-coin",
  mintAddress: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  symbol: "USDC",
  name: "USD Coin",
  decimals: 6,
  addressSPL: "FXRiEosEvHnpc3XZY1NS7an2PB1SunnYW1f5zppYhXb3",
}

const C98_TOKEN = {
  id: "coin98",
  mintAddress: "C98A4nkJXhpVZNAZdHUA95RpTF3T4whtQubL3YobiUX9",
  symbol: "C98",
  name: "Coin98",
  decimals: 6,
  addressSPL: "EKCdCBjfQ6t5FBfDC2zvmr27PgfVVZU37C8LUE4UenKb",
}

const POOL_PARAMS = {
  address: "EwsqJeioGAXE5EdZHj1QvcuvqgVhJDp9729H5wjh28DD",
  baseToken: C98_TOKEN,
  quoteToken: USDC_TOKEN,
  slippage: 0.5,
  hook: "", // config for reward, adding later
}

async function performDLMMSwap() {
  console.log("🚀 Starting real DLMM swap on Saros...")
  
  if (!YOUR_WALLET || YOUR_WALLET.includes("connect")) {
    console.error("❌ Please connect your wallet first!")
    return { success: false, message: "Wallet not connected" }
  }

  try {
    console.log("🔗 Network:", network)
    console.log("💼 Wallet:", YOUR_WALLET)
    console.log("🏊 Pool:", POOL_PARAMS.address)
    
    const amountFrom = 1e6 // 1 C98 token (6 decimals)
    
    console.log(\`📋 DLMM Swap: \${amountFrom / 1e6} \${C98_TOKEN.symbol} → \${USDC_TOKEN.symbol}\`)
    
    // Get DLMM quote
    console.log("⏳ Getting DLMM quote...")
    const quoteData = await liquidityBookServices.getQuote({
      amount: BigInt(amountFrom),
      isExactInput: true, // input amount in
      swapForY: true, // swap from C98 to USDC
      pair: new PublicKey(POOL_PARAMS.address),
      tokenBase: new PublicKey(POOL_PARAMS.baseToken.mintAddress),
      tokenQuote: new PublicKey(POOL_PARAMS.quoteToken.mintAddress),
      tokenBaseDecimal: POOL_PARAMS.baseToken.decimals,
      tokenQuoteDecimal: POOL_PARAMS.quoteToken.decimals,
      slippage: POOL_PARAMS.slippage
    })
    
    console.log("💱 DLMM Quote received:")
    console.log(\`  Amount In: \${Number(quoteData.amountIn) / 1e6} \${C98_TOKEN.symbol}\`)
    console.log(\`  Amount Out: \${Number(quoteData.amountOut) / 1e6} \${USDC_TOKEN.symbol}\`)
    console.log(\`  Price Impact: \${(quoteData.priceImpact * 100).toFixed(4)}%\`)
    
    const { amountIn, amountOut, priceImpact, amount, otherAmountOffset } = quoteData
    
    // Execute DLMM swap
    console.log("⏳ Creating DLMM swap transaction...")
    const transaction = await liquidityBookServices.swap({
      amount,
      tokenMintX: new PublicKey(POOL_PARAMS.baseToken.mintAddress),
      tokenMintY: new PublicKey(POOL_PARAMS.quoteToken.mintAddress),
      otherAmountOffset,
      hook: new PublicKey(liquidityBookServices.hooksConfig), // Optional hook
      isExactInput: true,
      swapForY: true,
      pair: new PublicKey(POOL_PARAMS.address),
      payer: new PublicKey(YOUR_WALLET)
    })
    
    console.log("⏳ Please sign the transaction in your wallet...")
    
    // Note: In a real implementation, you would sign the transaction here
    console.log("📝 Transaction created successfully!")
    console.log("⚠️  To complete this swap, you need to:")
    console.log("   1. Sign the transaction using your wallet")
    console.log("   2. Send the transaction to the network")
    console.log("   3. Wait for confirmation")
    
    // Mock transaction hash for demo
    const mockTxHash = "DLMM_" + Math.random().toString(36).substring(7)
    
    console.log("✅ DLMM Swap transaction prepared!")
    console.log("🔗 Mock Transaction ID:", mockTxHash)
    
    return { 
      success: true, 
      transactionHash: mockTxHash,
      amountIn: Number(amountIn) / 1e6,
      amountOut: Number(amountOut) / 1e6,
      priceImpact: priceImpact * 100,
      message: "DLMM swap transaction prepared successfully"
    }
    
  } catch (error) {
    console.error("❌ Error during DLMM swap:", error.message)
    return { success: false, message: error.message }
  }
}

// Run the DLMM swap
performDLMMSwap()`,
    },
    liquidity: {
      title: "Add Liquidity (Regular)",
      description: "Add liquidity to regular Saros pool",
      code: `// Real Add Liquidity using Saros SDK
const { depositAllTokenTypes, getPoolInfo, getTokenMintInfo, getTokenAccountInfo, convertBalanceToWei, genConnectionSolana } = sarosSdk
const { PublicKey } = solanaWeb3

// Your wallet address (automatically filled when wallet is connected)
const YOUR_WALLET = "YOUR_WALLET_ADDRESS"

const SAROS_SWAP_PROGRAM_ADDRESS_V1 = new PublicKey("SSwapUtytfBdBn1b9NUGG6foMVPtcWgpRU32HToDUZr")
const SLIPPAGE = 0.5

// Token configurations
const USDC_TOKEN = {
  id: "usd-coin",
  mintAddress: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  symbol: "USDC",
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

const poolParams = {
  address: "2wUvdZA8ZsY714Y5wUL9fkFmupJGGwzui2N74zqJWgty",
  tokens: {
    [C98_TOKEN.mintAddress]: C98_TOKEN,
    [USDC_TOKEN.mintAddress]: USDC_TOKEN,
  },
  tokenIds: [C98_TOKEN.mintAddress, USDC_TOKEN.mintAddress],
}

async function addLiquidity() {
  console.log("🚀 Starting add liquidity to Saros pool...")
  
  if (!YOUR_WALLET || YOUR_WALLET.includes("connect")) {
    console.error("❌ Please connect your wallet first!")
    return { success: false, message: "Wallet not connected" }
  }

  try {
    console.log("🔗 Network:", network)
    console.log("💼 Wallet:", YOUR_WALLET)
    console.log("🏊 Pool:", poolParams.address)
    
    // Create connection
    const connection = window.connection || genConnectionSolana()
    
    // Get pool information
    console.log("⏳ Getting pool information...")
    const poolAccountInfo = await getPoolInfo(
      connection,
      new PublicKey(poolParams.address)
    )
    
    console.log("📊 Pool Info:")
    console.log("  LP Token Mint:", poolAccountInfo.lpTokenMint.toString())
    console.log("  Token 0 Account:", poolAccountInfo.token0Account.toString())
    console.log("  Token 1 Account:", poolAccountInfo.token1Account.toString())
    
    // Get LP token mint info
    const newPoolLpMintInfo = await getTokenMintInfo(
      connection,
      poolAccountInfo.lpTokenMint
    )
    
    const lpTokenSupply = newPoolLpMintInfo.supply
      ? newPoolLpMintInfo.supply.toNumber()
      : 0
    
    console.log("💰 LP Token Supply:", lpTokenSupply)
    
    // Calculate amounts
    const token0Amount = 0.1 // 0.1 C98
    const convertFromAmount = convertBalanceToWei(token0Amount, C98_TOKEN.decimals)
    
    const newPoolToken0AccountInfo = await getTokenAccountInfo(
      connection,
      poolAccountInfo.token0Account
    )
    
    const lpTokenAmount = 
      (parseFloat(convertFromAmount) * lpTokenSupply) /
      newPoolToken0AccountInfo.amount.toNumber()
    
    console.log(\`📋 Adding Liquidity:\`)
    console.log(\`  \${token0Amount} \${C98_TOKEN.symbol}\`)
    console.log(\`  Proportional \${USDC_TOKEN.symbol}\`)
    console.log(\`  Expected LP Tokens: \${lpTokenAmount.toFixed(6)}\`)
    
    // Add liquidity
    console.log("⏳ Executing add liquidity transaction...")
    const result = await depositAllTokenTypes(
      connection,
      YOUR_WALLET,
      new PublicKey(YOUR_WALLET),
      new PublicKey(C98_TOKEN.addressSPL),
      new PublicKey(USDC_TOKEN.addressSPL),
      lpTokenAmount,
      new PublicKey(poolParams.address),
      SAROS_SWAP_PROGRAM_ADDRESS_V1,
      C98_TOKEN.mintAddress,
      USDC_TOKEN.mintAddress,
      SLIPPAGE
    )
    
    if (result.isError) {
      console.error("❌ Add liquidity failed:", result.mess)
      return { success: false, message: result.mess }
    }
    
    console.log("✅ Liquidity added successfully!")
    console.log("🔗 Transaction hash:", result.hash)
    
    return { 
      success: true, 
      transactionHash: result.hash,
      token0Amount,
      lpTokenAmount: lpTokenAmount.toFixed(6)
    }
    
  } catch (error) {
    console.error("❌ Error adding liquidity:", error.message)
    return { success: false, message: error.message }
  }
}

// Run add liquidity
addLiquidity()`,
    },
    staking: {
      title: "Farm Staking",
      description: "Stake LP tokens in Saros farms",
      code: `// Real Farm Staking using Saros SDK
const { SarosFarmService } = sarosSdk
const { default: BN } = await import('bn.js')
const { PublicKey } = solanaWeb3

// Your wallet address (automatically filled when wallet is connected)
const YOUR_WALLET = "YOUR_WALLET_ADDRESS"

const SAROS_FARM_ADDRESS = new PublicKey("SFarmWM5wLFNEw1q5ofqL7CrwBMwdcqQgK6oQuoBGZJ")

// Example farm parameters
const farmParam = {
  lpAddress: "HVUeNVH93PAFwJ67ENJwPWFU9cWcM57HEAmkFLFTcZkj",
  poolAddress: "FW9hgAiUsFYpqjHaGCGw4nAvejz4tAp9qU7kFpYr1fQZ",
  poolLpAddress: "2wUvdZA8ZsY714Y5wUL9fkFmupJGGwzui2N74zqJWgty",
  rewards: [
    {
      address: "C98A4nkJXhpVZNAZdHUA95RpTF3T4whtQubL3YobiUX9",
      poolRewardAddress: "AC3FyChwCXD67wrX2ZBHMkmmU9Gfm9QQmiTBrKvsmJ",
      rewardPerBlock: 6600000,
      rewardTokenAccount: "F6aHSR3ChwCXD67wrX2ZBHMkmmU9Gfm9QQmiTBrKvsmJ",
      id: "coin98"
    },
  ],
  token0: "C98A4nkJXhpVZNAZdHUA95RpTF3T4whtQubL3YobiUX9",
  token1: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  token0Id: "coin98",
  token1Id: "usd-coin"
}

async function performStaking() {
  console.log("🚀 Starting farm staking operations...")
  
  if (!YOUR_WALLET || YOUR_WALLET.includes("connect")) {
    console.error("❌ Please connect your wallet first!")
    return { success: false, message: "Wallet not connected" }
  }

  try {
    console.log("🔗 Network:", network)
    console.log("💼 Wallet:", YOUR_WALLET)
    console.log("🏊 Farm Pool:", farmParam.poolAddress)
    
    // Create connection
    const connection = window.connection || new Connection(clusterApiUrl(network), 'confirmed')
    
    const payerAccount = { publicKey: new PublicKey(YOUR_WALLET) }
    const stakeAmount = new BN(100000) // 0.1 LP tokens (assuming 6 decimals)
    
    console.log("💰 Staking Amount:", (stakeAmount.toNumber() / 1e6).toFixed(6), "LP tokens")
    
    // Get farm list first
    console.log("⏳ Getting farm list...")
    const farmList = await SarosFarmService.getListPool({ page: 1, size: 10 })
    console.log("📊 Available Farms:", farmList.length)
    
    // Stake LP tokens
    console.log("⏳ Staking LP tokens...")
    const stakeHash = await SarosFarmService.stakePool(
      connection,
      payerAccount,
      new PublicKey(farmParam.poolAddress),
      stakeAmount,
      SAROS_FARM_ADDRESS,
      farmParam.rewards,
      new PublicKey(farmParam.lpAddress)
    )
    
    console.log("✅ Tokens staked successfully!")
    console.log("🔗 Stake Transaction:", stakeHash)
    
    // Wait a moment
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Claim rewards
    console.log("⏳ Claiming rewards...")
    const poolRewardAddress = farmParam.rewards[0].poolRewardAddress
    const mintAddress = farmParam.rewards[0].address
    
    const claimHash = await SarosFarmService.claimReward(
      connection,
      payerAccount,
      new PublicKey(poolRewardAddress),
      SAROS_FARM_ADDRESS,
      new PublicKey(mintAddress)
    )
    
    console.log("💰 Rewards claimed successfully!")
    console.log("🔗 Claim Transaction:", claimHash)
    
    return { 
      success: true, 
      stakeTransaction: stakeHash,
      claimTransaction: claimHash,
      stakedAmount: (stakeAmount.toNumber() / 1e6).toFixed(6)
    }
    
  } catch (error) {
    console.error("❌ Error during staking operations:", error.message)
    return { success: false, message: error.message }
  }
}

// Run staking operations
performStaking()`,
    },
  }

  const handleTemplateChange = (template: string) => {
    setSelectedTemplate(template)
    setOutput("")
  }

  const runCode = async () => {
    if (!connected || !publicKey) {
      setOutput("❌ Please connect your wallet first to run real blockchain operations!\n\n" +
        "💡 This playground executes real Saros SDK functions that require:\n" +
        "• Connected Solana wallet\n" +
        "• Sufficient SOL for transaction fees\n" +
        "• Token accounts for the tokens you want to trade\n\n" +
        "Connect your wallet and try again.")
      return
    }

    setIsRunning(true)
    setOutput(`> Running REAL Saros SDK code on ${network}...\n`)
    
    // Scroll to bottom of output
    setTimeout(() => {
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight
      }
    }, 100)

    try {
      // Create a function to capture console output
      const logs: string[] = []
      const originalLog = console.log
      const originalError = console.error
      
      // Override console methods to capture output
      console.log = (...args) => {
        const log = args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ')
        logs.push(log)
        setOutput(prev => prev + log + '\n')
        
        // Scroll to bottom
        setTimeout(() => {
          if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight
          }
        }, 0)
      }
      
      console.error = (...args) => {
        const error = args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ')
        logs.push("[ERROR] " + error)
        setOutput(prev => prev + "[ERROR] " + error + "\n")
        
        // Scroll to bottom
        setTimeout(() => {
          if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight
          }
        }, 0)
      }

      // Add network and wallet info to output
      console.log("📡 Network: Solana " + network)
      console.log("🔌 Endpoint: " + (network === "custom" ? customEndpoint : clusterApiUrl(network as any)))
      console.log("\ud83d\udcbc Wallet: " + publicKey.toBase58().slice(0, 6) + "..." + publicKey.toBase58().slice(-4))
      console.log("🌐 Connection Status: " + (connection ? "Connected" : "Disconnected"))
      console.log("")

      // Make connection and wallet available globally for the code
      ;(window as any).connection = connection
      ;(window as any).wallet = { publicKey, signTransaction, signAllTransactions }
      ;(window as any).network = network
      const sarosSdk = await import('@saros-finance/sdk')
      const sarosDlmmSdk = await import('@saros-finance/dlmm-sdk')
      ;(window as any).sarosSdk = sarosSdk
      ;(window as any).sarosDlmmSdk = sarosDlmmSdk
      ;(window as any).solanaWeb3 = await import('@solana/web3.js')

      try {
        // Execute the code
        const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor
        const func = new AsyncFunction('sarosSdk', 'sarosDlmmSdk', 'solanaWeb3', code)
        await func(sarosSdk, sarosDlmmSdk, solanaWeb3)
      } catch (executionError: any) {
        console.error("Execution Error: " + executionError.message)
      }

      // Restore original console methods
      console.log = originalLog
      console.error = originalError

      // Add final summary
      setTimeout(() => {
        setOutput(prev => prev + 
          "\n✅ Code execution completed!\n\n" +
          "⚠️  Important Notes:\n" +
          "1. This executed REAL Saros SDK functions\n" +
          "2. If transactions were created, you may need to:\n" +
          "   • Sign them in your wallet\n" +
          "   • Confirm the transactions\n" +
          "   • Wait for network confirmation\n" +
          "3. Check your wallet and Solana Explorer for transaction details\n" +
          "4. Make sure you have sufficient SOL for transaction fees\n")
        
        // Scroll to bottom
        setTimeout(() => {
          if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight
          }
        }, 100)
        
        setIsRunning(false)
      }, 500)
    } catch (error: any) {
      setOutput(prev => prev + `⚠ Error running code: ${error.message}\n`)
      setIsRunning(false)
    }
  }

  const resetCode = () => {
    const template = templates[selectedTemplate as keyof typeof templates]
    if (template) {
      let updatedCode = template.code
      
      if (connected && publicKey) {
        updatedCode = updatedCode.replace(/YOUR_WALLET_ADDRESS/g, publicKey.toBase58())
      } else {
        updatedCode = updatedCode.replace(/YOUR_WALLET_ADDRESS/g, "// Please connect your wallet first")
      }
      
      updatedCode = updatedCode.replace(/NETWORK_MODE/g, network === "mainnet-beta" ? "MODE.MAINNET" : "MODE.DEVNET")
      setCode(updatedCode)
    }
    setOutput("")
  }

  const copyCode = () => {
    navigator.clipboard.writeText(code)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">
                <Terminal className="mr-1 h-3 w-3" />
                Real Saros SDK Playground
              </Badge>
              {connected && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <Wallet className="mr-1 h-3 w-3" />
                  Wallet Connected
                </Badge>
              )}
            </div>
            <h1 className="font-heading text-4xl font-bold mb-4">Saros SDK Playground</h1>
            <p className="text-xl text-muted-foreground">
              Execute real Saros SDK functions on Solana networks. This playground uses actual SDK functions
              and requires a connected wallet for blockchain operations.
            </p>
            {!connected && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                  <span className="text-yellow-800 font-medium">
                    Connect your wallet to execute real blockchain transactions
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Network Configuration */}
          <div className="mb-6">
            <NetworkSelector 
              network={network}
              customEndpoint={customEndpoint}
              onNetworkChange={setNetwork}
              onCustomEndpointChange={setCustomEndpoint}
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Template Selector */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>SDK Examples</CardTitle>
                  <CardDescription>Real Saros SDK implementations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(templates).map(([key, template]) => (
                    <div
                      key={key}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedTemplate === key
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => handleTemplateChange(key)}
                    >
                      <h3 className="font-semibold text-sm mb-1">{template.title}</h3>
                      <p className="text-xs text-muted-foreground">{template.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Controls */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={runCode} 
                    disabled={isRunning || !connected} 
                    className="w-full"
                    variant={connected ? "default" : "secondary"}
                  >
                    {isRunning ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Running on {network}...
                      </>
                    ) : connected ? (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Execute on {network}
                      </>
                    ) : (
                      <>
                        <Wallet className="mr-2 h-4 w-4" />
                        Connect Wallet First
                      </>
                    )}
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={resetCode} className="flex-1 bg-transparent">
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Reset
                    </Button>
                    <Button variant="outline" onClick={copyCode} className="flex-1 bg-transparent">
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Wallet Status */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-sm">Wallet Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className={connected ? "text-green-600" : "text-red-600"}>
                      {connected ? "Connected" : "Disconnected"}
                    </span>
                  </div>
                  {connected && publicKey && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Address:</span>
                      <span className="font-mono text-xs">
                        {publicKey.toBase58().slice(0, 8)}...{publicKey.toBase58().slice(-4)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Network:</span>
                    <span className="capitalize">{network}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Code Editor and Output */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="editor" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="editor">SDK Code</TabsTrigger>
                  <TabsTrigger value="output">Execution Output</TabsTrigger>
                </TabsList>

                <TabsContent value="editor" className="mt-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          {templates[selectedTemplate as keyof typeof templates].title}
                        </CardTitle>
                        <div className="flex gap-2">
                          <Badge variant="outline">Real SDK</Badge>
                          <Badge variant="outline">TypeScript</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <Textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="min-h-[500px] font-mono text-sm border-0 resize-none focus-visible:ring-0"
                        placeholder="Real Saros SDK code will appear here..."
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="output" className="mt-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Real-time Output</CardTitle>
                        <Badge variant={connected ? "default" : "secondary"}>
                          {connected ? "Live Execution" : "Demo Mode"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div 
                        ref={outputRef}
                        className="bg-muted rounded-lg p-4 min-h-[500px] max-h-[500px] overflow-y-auto font-mono text-sm whitespace-pre-wrap"
                      >
                        {output || (connected 
                          ? `> Ready to execute real Saros SDK functions on ${network}...\n\n🚀 Real Blockchain Operations:\n• This playground executes actual Saros SDK functions\n• Transactions will be sent to ${network}\n• You'll need to sign transactions in your wallet\n• Make sure you have sufficient SOL for gas fees\n\n💼 Wallet: ${publicKey?.toBase58().slice(0, 8)}...${publicKey?.toBase58().slice(-4)}\n🔗 Network: ${network}\n\nClick "Execute on ${network}" to run the code!`
                          : `> Connect your wallet to execute real Saros SDK functions...\n\n⚠️  Wallet Required:\n• This playground executes real blockchain operations\n• You need a connected Solana wallet to sign transactions\n• Make sure you have SOL for transaction fees\n• Transactions will be sent to the selected network\n\n🔌 Please connect your wallet using the button in the top navigation.\n\n💡 Once connected, you can:\n• Execute real swaps using Saros SDK\n• Add/remove liquidity from pools\n• Stake in farms and claim rewards\n• Use DLMM (Dynamic Liquidity Market Maker) features`
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* SDK Information */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="mr-2 h-5 w-5" />
                🚨 Real SDK Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <strong>Real Blockchain Operations:</strong> This playground executes actual Saros SDK functions that interact with Solana blockchain.
                All operations are real and will affect your wallet and token balances.
              </div>
              <div>
                <strong>Required Setup:</strong>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Connected Solana wallet (Phantom, Solflare, etc.)</li>
                  <li>Sufficient SOL for transaction fees (usually ~0.01 SOL per transaction)</li>
                  <li>Token accounts for the tokens you want to trade</li>
                  <li>Understanding that all operations are irreversible</li>
                </ul>
              </div>
              <div>
                <strong>Available SDK Functions:</strong>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li><code className="bg-muted px-1 rounded">@saros-finance/sdk</code> - Regular AMM operations (swap, liquidity)</li>
                  <li><code className="bg-muted px-1 rounded">@saros-finance/dlmm-sdk</code> - Dynamic Liquidity Market Maker</li>
                  <li>Farm staking and reward claiming</li>
                  <li>Pool creation and management</li>
                </ul>
              </div>
              <div>
                <strong>Safety Tips:</strong>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Start with small amounts on Devnet for testing</li>
                  <li>Always verify transaction details before signing</li>
                  <li>Keep track of your transaction hashes</li>
                  <li>Use Mainnet only when you're confident with the operations</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
