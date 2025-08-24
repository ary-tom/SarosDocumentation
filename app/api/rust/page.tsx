import Link from "next/link"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Book, Code2, Zap, Wrench, ArrowRight } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function RustAPIReferencePage() {
  const modules = [
    {
      name: "DlmmClient",
      description: "Main client for interacting with DLMM pools in Rust",
      icon: <Zap className="h-5 w-5" />,
      methods: [
        {
          name: "new",
          description: "Create a new DlmmClient instance",
          parameters: [
            { name: "rpc_url", type: "String", description: "Solana RPC URL (e.g., https://api.devnet.solana.com)" }
          ],
          returns: "Result<DlmmClient>",
          example: "/examples/rust"
        },
        {
          name: "get_all_pools",
          description: "Retrieve all available DLMM pools",
          parameters: [],
          returns: "Result<Vec<Pool>>",
          example: "/examples/rust"
        },
        {
          name: "get_pool",
          description: "Retrieve a specific DLMM pool by address",
          parameters: [
            { name: "pool_address", type: "Pubkey", description: "Public key of the pool" }
          ],
          returns: "Result<Pool>",
          example: "/examples/rust"
        },
        {
          name: "get_quote",
          description: "Get a quote for a swap operation",
          parameters: [
            { name: "amount", type: "u64", description: "Amount of tokens to swap" },
            { name: "is_exact_input", type: "bool", description: "Whether the input amount is exact" },
            { name: "swap_for_y", type: "bool", description: "Whether swapping for token Y" },
            { name: "pair", type: "Pubkey", description: "Public key of the pool pair" },
            { name: "token_base", type: "Pubkey", description: "Public key of the base token" },
            { name: "token_quote", type: "Pubkey", description: "Public key of the quote token" },
            { name: "token_base_decimal", type: "u8", description: "Decimals of the base token" },
            { name: "token_quote_decimal", type: "u8", description: "Decimals of the quote token" },
            { name: "slippage", type: "f64", description: "Slippage tolerance percentage" }
          ],
          returns: "Result<Quote>",
          example: "/examples/rust"
        },
        {
          name: "swap",
          description: "Create a transaction for swapping tokens",
          parameters: [
            { name: "amount", type: "u64", description: "Amount of tokens to swap" },
            { name: "token_mint_x", type: "Pubkey", description: "Public key of token X mint" },
            { name: "token_mint_y", type: "Pubkey", description: "Public key of token Y mint" },
            { name: "other_amount_offset", type: "u64", description: "Offset for the other amount" },
            { name: "is_exact_input", type: "bool", description: "Whether the input amount is exact" },
            { name: "swap_for_y", type: "bool", description: "Whether swapping for token Y" },
            { name: "pair", type: "Pubkey", description: "Public key of the pool pair" },
            { name: "payer", type: "Pubkey", description: "Public key of the payer" }
          ],
          returns: "Result<Transaction>",
          example: "/examples/rust"
        }
      ]
    },
    {
      name: "SarosDlmm",
      description: "Low-level struct that implements the jupiter-amm-interface Amm trait",
      icon: <Code2 className="h-5 w-5" />,
      methods: [
        {
          name: "from_keyed_account",
          description: "Create a new SarosDlmm instance from a keyed account",
          parameters: [
            { name: "keyed_account", type: "&KeyedAccount", description: "The keyed account of the DLMM pair" },
            { name: "amm_context", type: "&AmmContext", description: "The AMM context" }
          ],
          returns: "Result<Self>",
          example: ""
        },
        {
          name: "label",
          description: "Get the label for the AMM",
          parameters: [],
          returns: "String",
          example: ""
        },
        {
          name: "get_swap_and_account_metas",
          description: "Get the swap instruction and account metas",
          parameters: [
            { name: "swap_params", type: "&SwapParams", description: "The swap parameters" }
          ],
          returns: "Result<SwapAndAccountMetas>",
          example: ""
        }
      ]
    },
    {
      name: "Instructions",
      description: "On-chain program instructions",
      icon: <Wrench className="h-5 w-5" />,
      methods: [
        {
          name: "initialize_pair",
          description: "Initialize a new DLMM pair",
          parameters: [],
          returns: "Instruction",
          example: ""
        },
        {
          name: "add_liquidity",
          description: "Add liquidity to a DLMM pair",
          parameters: [],
          returns: "Instruction",
          example: ""
        },
        {
          name: "remove_liquidity",
          description: "Remove liquidity from a DLMM pair",
          parameters: [],
          returns: "Instruction",
          example: ""
        },
        {
          name: "swap",
          description: "Swap tokens in a DLMM pair",
          parameters: [],
          returns: "Instruction",
          example: ""
        }
      ]
    },
    {
      name: "Accounts",
      description: "On-chain program account structures",
      icon: <Book className="h-5 w-5" />,
      methods: [
        {
          name: "Pair",
          description: "Represents a DLMM pair account",
          parameters: [],
          returns: "struct",
          example: ""
        },
        {
          name: "Position",
          description: "Represents a liquidity position in a DLMM pair",
          parameters: [],
          returns: "struct",
          example: ""
        },
        {
          name: "BinArray",
          description: "Represents an array of liquidity bins",
          parameters: [],
          returns: "struct",
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
            <h1 className="text-4xl font-heading font-bold mb-4">saros-dlmm-sdk-rs API Reference</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Complete documentation for all methods, parameters, and return types in the Saros Finance Rust DLMM SDK.
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
                      <span>{module.methods.length} items</span>
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
                <Link href="https://github.com/coin98/saros-dlmm-sdk-rs" target="_blank">
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