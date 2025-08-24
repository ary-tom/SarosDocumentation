import Link from "next/link"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Book, Code2, Zap, Wrench, ArrowRight } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function SDKAPIReferencePage() {
  const modules = [
    {
      name: "Swap",
      description: "Functions for swapping tokens through the AMM",
      icon: <Zap className="h-5 w-5" />,
      methods: [
        {
          name: "getSwapAmountSaros",
          description: "Calculate the output amount for a swap",
          parameters: [
            { name: "connection", type: "Connection", description: "Solana connection object" },
            { name: "fromMint", type: "string", description: "Mint address of the input token" },
            { name: "toMint", type: "string", description: "Mint address of the output token" },
            { name: "fromAmount", type: "number", description: "Amount of input tokens" },
            { name: "slippage", type: "number", description: "Slippage tolerance percentage" },
            { name: "pool", type: "PoolParams", description: "Pool parameters object" }
          ],
          returns: "Promise<SwapQuote>",
          example: "/examples/swap"
        },
        {
          name: "swapSaros",
          description: "Execute a token swap",
          parameters: [
            { name: "connection", type: "Connection", description: "Solana connection object" },
            { name: "fromTokenAccount", type: "string", description: "Public key of the sender's token account" },
            { name: "toTokenAccount", type: "string", description: "Public key of the receiver's token account" },
            { name: "fromAmount", type: "number", description: "Amount of input tokens" },
            { name: "toAmount", type: "number", description: "Expected output amount" },
            { name: "referral", type: "PublicKey | null", description: "Referral account (optional)" },
            { name: "poolAddress", type: "PublicKey", description: "Public key of the pool" },
            { name: "programAddress", type: "PublicKey", description: "Public key of the swap program" },
            { name: "owner", type: "string", description: "Public key of the transaction owner" },
            { name: "fromMint", type: "string", description: "Mint address of the input token" },
            { name: "toMint", type: "string", description: "Mint address of the output token" }
          ],
          returns: "Promise<SwapResult>",
          example: "/examples/swap"
        }
      ]
    },
    {
      name: "Pool",
      description: "Functions for creating and managing liquidity pools",
      icon: <Code2 className="h-5 w-5" />,
      methods: [
        {
          name: "createPool",
          description: "Create a new liquidity pool",
          parameters: [
            { name: "connection", type: "Connection", description: "Solana connection object" },
            { name: "walletAddress", type: "string", description: "Public key of the wallet" },
            { name: "owner", type: "PublicKey", description: "Public key of the pool owner" },
            { name: "token0Mint", type: "PublicKey", description: "Mint address of the first token" },
            { name: "token1Mint", type: "PublicKey", description: "Mint address of the second token" },
            { name: "token0Account", type: "PublicKey", description: "Token account for the first token" },
            { name: "token1Account", type: "PublicKey", description: "Token account for the second token" },
            { name: "token0Amount", type: "BN", description: "Amount of the first token" },
            { name: "token1Amount", type: "BN", description: "Amount of the second token" },
            { name: "curveType", type: "number", description: "Curve type (0 for constant product, 1 for stable)" },
            { name: "curveParameter", type: "BN", description: "Curve parameter" },
            { name: "tokenProgramId", type: "PublicKey", description: "Token program ID" },
            { name: "programId", type: "PublicKey", description: "Swap program ID" }
          ],
          returns: "Promise<CreatePoolResult>",
          example: "/examples/liquidity"
        },
        {
          name: "getPoolInfo",
          description: "Get information about a liquidity pool",
          parameters: [
            { name: "connection", type: "Connection", description: "Solana connection object" },
            { name: "poolAddress", type: "PublicKey", description: "Public key of the pool" }
          ],
          returns: "Promise<PoolInfo>",
          example: "/examples/liquidity"
        },
        {
          name: "depositAllTokenTypes",
          description: "Add liquidity to a pool",
          parameters: [
            { name: "connection", type: "Connection", description: "Solana connection object" },
            { name: "owner", type: "string", description: "Public key of the owner" },
            { name: "sourceToken0Account", type: "PublicKey", description: "Token account for the first token" },
            { name: "sourceToken1Account", type: "PublicKey", description: "Token account for the second token" },
            { name: "lpTokenAmount", type: "number", description: "Amount of LP tokens to mint" },
            { name: "poolAddress", type: "PublicKey", description: "Public key of the pool" },
            { name: "programAddress", type: "PublicKey", description: "Swap program address" },
            { name: "token0Mint", type: "string", description: "Mint address of the first token" },
            { name: "token1Mint", type: "string", description: "Mint address of the second token" },
            { name: "slippage", type: "number", description: "Slippage tolerance percentage" }
          ],
          returns: "Promise<DepositResult>",
          example: "/examples/liquidity"
        },
        {
          name: "withdrawAllTokenTypes",
          description: "Remove liquidity from a pool",
          parameters: [
            { name: "connection", type: "Connection", description: "Solana connection object" },
            { name: "owner", type: "string", description: "Public key of the owner" },
            { name: "lpTokenAccount", type: "PublicKey", description: "LP token account" },
            { name: "destinationToken0Account", type: "string", description: "Destination account for the first token" },
            { name: "destinationToken1Account", type: "string", description: "Destination account for the second token" },
            { name: "lpTokenAmount", type: "number", description: "Amount of LP tokens to burn" },
            { name: "poolAddress", type: "PublicKey", description: "Public key of the pool" },
            { name: "programAddress", type: "PublicKey", description: "Swap program address" },
            { name: "token0Mint", type: "string", description: "Mint address of the first token" },
            { name: "token1Mint", type: "string", description: "Mint address of the second token" },
            { name: "slippage", type: "number", description: "Slippage tolerance percentage" }
          ],
          returns: "Promise<WithdrawResult>",
          example: "/examples/liquidity"
        }
      ]
    },
    {
      name: "Stake",
      description: "Functions for staking tokens and earning rewards",
      icon: <Wrench className="h-5 w-5" />,
      methods: [
        {
          name: "SarosStakeServices.getListPool",
          description: "Get a list of available staking pools",
          parameters: [
            { name: "params", type: "{ page: number, size: number }", description: "Pagination parameters" }
          ],
          returns: "Promise<StakePool[]>",
          example: "/examples/staking"
        }
      ]
    },
    {
      name: "Farm",
      description: "Functions for yield farming",
      icon: <Wrench className="h-5 w-5" />,
      methods: [
        {
          name: "SarosFarmService.getListPool",
          description: "Get a list of available farming pools",
          parameters: [
            { name: "params", type: "{ page: number, size: number }", description: "Pagination parameters" }
          ],
          returns: "Promise<FarmPool[]>",
          example: "/examples/staking"
        },
        {
          name: "SarosFarmService.stakePool",
          description: "Stake LP tokens in a farming pool",
          parameters: [
            { name: "connection", type: "Connection", description: "Solana connection object" },
            { name: "payer", type: "PublicKey", description: "Public key of the payer" },
            { name: "poolAddress", type: "PublicKey", description: "Address of the farm pool" },
            { name: "amount", type: "BN", description: "Amount of LP tokens to stake" },
            { name: "programAddress", type: "PublicKey", description: "Farm program address" },
            { name: "rewards", type: "Reward[]", description: "Reward token information" },
            { name: "lpTokenAccount", type: "PublicKey", description: "LP token account" }
          ],
          returns: "Promise<string>",
          example: "/examples/staking"
        },
        {
          name: "SarosFarmService.unStakePool",
          description: "Unstake LP tokens from a farming pool",
          parameters: [
            { name: "connection", type: "Connection", description: "Solana connection object" },
            { name: "payer", type: "PublicKey", description: "Public key of the payer" },
            { name: "poolAddress", type: "PublicKey", description: "Address of the farm pool" },
            { name: "lpTokenAccount", type: "PublicKey", description: "LP token account" },
            { name: "amount", type: "BN", description: "Amount of LP tokens to unstake" },
            { name: "programAddress", type: "PublicKey", description: "Farm program address" },
            { name: "rewards", type: "Reward[]", description: "Reward token information" },
            { name: "isUnstakeFull", type: "boolean", description: "Whether to unstake full balance" }
          ],
          returns: "Promise<string>",
          example: "/examples/staking"
        },
        {
          name: "SarosFarmService.claimReward",
          description: "Claim rewards from a farming pool",
          parameters: [
            { name: "connection", type: "Connection", description: "Solana connection object" },
            { name: "payer", type: "PublicKey", description: "Public key of the payer" },
            { name: "poolRewardAddress", type: "PublicKey", description: "Address of the reward pool" },
            { name: "programAddress", type: "PublicKey", description: "Farm program address" },
            { name: "mintAddress", type: "PublicKey", description: "Mint address of the reward token" }
          ],
          returns: "Promise<string>",
          example: "/examples/staking"
        }
      ]
    },
    {
      name: "TokenProgramService",
      description: "Functions for interacting with the SPL Token Program",
      icon: <Wrench className="h-5 w-5" />,
      methods: [
        {
          name: "getMultipleTokenAccountInfo",
          description: "Get information about multiple token accounts",
          parameters: [
            { name: "connection", type: "Connection", description: "Solana connection object" },
            { name: "pubkeys", type: "PublicKey[]", description: "Array of token account public keys" }
          ],
          returns: "Promise<TokenAccountInfo[]>",
          example: ""
        },
        {
          name: "getAssociatedTokenAccount",
          description: "Get the associated token account for a mint and owner",
          parameters: [
            { name: "mint", type: "PublicKey", description: "Token mint address" },
            { name: "owner", type: "PublicKey", description: "Owner public key" }
          ],
          returns: "Promise<PublicKey>",
          example: ""
        },
        {
          name: "createAssociatedTokenAccount",
          description: "Create an associated token account",
          parameters: [
            { name: "connection", type: "Connection", description: "Solana connection object" },
            { name: "payer", type: "Signer", description: "Transaction payer" },
            { name: "mint", type: "PublicKey", description: "Token mint address" },
            { name: "owner", type: "PublicKey", description: "Owner public key" }
          ],
          returns: "Promise<PublicKey>",
          example: ""
        },
        {
          name: "checkIfAssociatedTokenAccountExists",
          description: "Check if an associated token account exists",
          parameters: [
            { name: "connection", type: "Connection", description: "Solana connection object" },
            { name: "ata", type: "PublicKey", description: "Associated token account address" }
          ],
          returns: "Promise<boolean>",
          example: ""
        }
      ]
    },
    {
      name: "SolanaService",
      description: "Utility functions for interacting with the Solana network",
      icon: <Wrench className="h-5 w-5" />,
      methods: [
        {
          name: "getAccountInfo",
          description: "Get information about a Solana account",
          parameters: [
            { name: "connection", type: "Connection", description: "Solana connection object" },
            { name: "publicKey", type: "PublicKey", description: "Public key of the account" }
          ],
          returns: "Promise<AccountInfo<Buffer> | null>",
          example: ""
        },
        {
          name: "getLatestBlockhash",
          description: "Get the latest blockhash",
          parameters: [
            { name: "connection", type: "Connection", description: "Solana connection object" }
          ],
          returns: "Promise<Readonly<{ blockhash: string; lastValidBlockHeight: number; }>>",
          example: ""
        },
        {
          name: "sendTransaction",
          description: "Send a transaction to the Solana network",
          parameters: [
            { name: "connection", type: "Connection", description: "Solana connection object" },
            { name: "transaction", type: "Transaction", description: "Transaction to send" },
            { name: "signers", type: "Signer[]", description: "Array of signers" }
          ],
          returns: "Promise<string>",
          example: ""
        }
      ]
    },
    {
      name: "Utils",
      description: "Utility functions for common operations",
      icon: <Wrench className="h-5 w-5" />,
      methods: [
        {
          name: "genConnectionSolana",
          description: "Generate a Solana connection object",
          parameters: [],
          returns: "Connection",
          example: "/examples/swap"
        },
        {
          name: "convertBalanceToWei",
          description: "Convert token balance to Wei format",
          parameters: [
            { name: "balance", type: "number", description: "Token balance" },
            { name: "decimals", type: "string", description: "Token decimals" }
          ],
          returns: "string",
          example: "/examples/liquidity"
        },
        {
          name: "getTokenMintInfo",
          description: "Get information about a token mint",
          parameters: [
            { name: "connection", type: "Connection", description: "Solana connection object" },
            { name: "mintAddress", type: "PublicKey", description: "Token mint address" }
          ],
          returns: "Promise<TokenMintInfo>",
          example: "/examples/liquidity"
        },
        {
          name: "getTokenAccountInfo",
          description: "Get information about a token account",
          parameters: [
            { name: "connection", type: "Connection", description: "Solana connection object" },
            { name: "accountAddress", type: "PublicKey", description: "Token account address" }
          ],
          returns: "Promise<TokenAccountInfo>",
          example: "/examples/liquidity"
        },
        {
          name: "getInfoTokenByMint",
          description: "Get token account information by mint address",
          parameters: [
            { name: "mint", type: "string", description: "Token mint address" },
            { name: "owner", type: "string", description: "Owner public key" }
          ],
          returns: "Promise<TokenInfo>",
          example: "/examples/liquidity"
        },
        {
          name: "formatBalance",
          description: "Format a balance with decimals",
          parameters: [
            { name: "balance", type: "number | string", description: "The balance to format" },
            { name: "decimals", type: "number", description: "The number of decimals" }
          ],
          returns: "string",
          example: ""
        },
        {
          name: "formatPoolWeight",
          description: "Format a pool weight",
          parameters: [
            { name: "weight", type: "number", description: "The weight to format" }
          ],
          returns: "string",
          example: ""
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-heading font-bold mb-4">@saros-finance/sdk API Reference</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Complete documentation for all methods, parameters, and return types in the Saros Finance SDK.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-12">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search methods, parameters, or modules..." className="pl-10 h-12 text-base" />
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-heading font-bold mb-6">Modules</h2>
            <div className="grid gap-6 lg:grid-cols-2">
              {modules.map((module) => (
                <Card key={module.name} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      {module.icon}
                      <CardTitle className="text-lg font-heading">{module.name}</CardTitle>
                    </div>
                    <CardDescription>{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between text-sm text-muted-foreground mb-4">
                      <span>{module.methods.length} methods</span>
                    </div>
                    <Accordion type="single" collapsible>
                      {module.methods.map((method, index) => (
                        <AccordionItem key={index} value={`method-${index}`}>
                          <AccordionTrigger className="text-left py-3">
                            <div className="flex items-center justify-between w-full mr-4">
                              <div>
                                <span className="font-mono text-primary">{method.name}</span>
                                <p className="text-sm text-muted-foreground mt-1">{method.description}</p>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4 pt-4">
                              <div>
                                <h4 className="font-medium mb-2">Parameters:</h4>
                                <div className="space-y-2">
                                  {method.parameters.map((param, paramIndex) => (
                                    <div key={paramIndex} className="flex items-start">
                                      <code className="text-sm bg-muted px-2 py-1 rounded mr-2">{param.name}</code>
                                      <span className="text-sm text-muted-foreground">
                                        <span className="font-mono">{param.type}</span> - {param.description}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Returns:</h4>
                                <code className="text-sm bg-muted px-2 py-1 rounded">{method.returns}</code>
                              </div>
                              <Button variant="outline" size="sm" asChild>
                                <Link href={method.example}>View Example</Link>
                              </Button>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-muted/50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-heading font-bold mb-4">Need Help?</h2>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Check out our guides and community resources.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/guides">Browse Guides</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/examples">See Examples</Link>
              </Button>
              <Button asChild>
                <Link href="https://github.com/coin98/saros-sdk" target="_blank">
                  View on GitHub
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}