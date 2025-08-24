import Link from "next/link"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Book, Code2, Zap, Wrench, ArrowRight } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function DLMMAPIReferencePage() {
  const modules = [
    {
      name: "LiquidityBookServices",
      description: "Main service for interacting with DLMM pools",
      icon: <Zap className="h-5 w-5" />,
      methods: [
        {
          name: "constructor",
          description: "Initialize the LiquidityBookServices",
          parameters: [
            { name: "config", type: "{ mode: MODE }", description: "Configuration object with mode (MAINNET or DEVNET)" }
          ],
          returns: "LiquidityBookServices",
          example: "/examples/dlmm"
        },
        {
          name: "getQuote",
          description: "Get a quote for a swap operation",
          parameters: [
            { name: "params", type: "GetQuoteParams", description: "Parameters for the quote request" }
          ],
          returns: "Promise<QuoteResult>",
          example: "/examples/dlmm"
        },
        {
          name: "swap",
          description: "Create a transaction for swapping tokens",
          parameters: [
            { name: "params", type: "SwapParams", description: "Parameters for the swap" }
          ],
          returns: "Promise<Transaction>",
          example: "/examples/dlmm"
        },
        {
          name: "getDexName",
          description: "Get the name of the DEX",
          parameters: [],
          returns: "string",
          example: ""
        },
        {
          name: "getDexProgramId",
          description: "Get the program ID of the DEX",
          parameters: [],
          returns: "string",
          example: ""
        },
        {
          name: "fetchPoolAddresses",
          description: "Query all pools on Saros DLMM",
          parameters: [],
          returns: "Promise<string[]>",
          example: ""
        },
        {
          name: "fetchPoolMetadata",
          description: "Fetch metadata for a pool",
          parameters: [
            { name: "poolAddress", type: "string", description: "Address of the pool" }
          ],
          returns: "Promise<object>",
          example: ""
        },
        {
          name: "listenNewPoolAddress",
          description: "Listen for new pool addresses",
          parameters: [
            { name: "callback", type: "(poolAddress: string) => void", description: "Callback function to execute when a new pool is found" }
          ],
          returns: "Promise<void>",
          example: ""
        },
        {
          name: "createPairWithConfig",
          description: "Create a new DLMM pool",
          parameters: [
            { name: "params", type: "CreatePairParams", description: "Parameters for creating the pair" }
          ],
          returns: "Promise<{ tx: Transaction }>",
          example: ""
        },
        {
          name: "getUserPositions",
          description: "Get user positions in a pool",
          parameters: [
            { name: "params", type: "{ payer: PublicKey, pair: PublicKey }", description: "Payer and pair public keys" }
          ],
          returns: "Promise<PositionInfo[]>",
          example: ""
        },
        {
          name: "getPairAccount",
          description: "Get information about a pair account",
          parameters: [
            { name: "pair", type: "PublicKey", description: "Public key of the pair" }
          ],
          returns: "Promise<any>",
          example: ""
        },
        {
          name: "addLiquidityIntoPosition",
          description: "Add liquidity to a position",
          parameters: [
            { name: "params", type: "AddLiquidityParams", description: "Parameters for adding liquidity" }
          ],
          returns: "Promise<void>",
          example: ""
        },
        {
          name: "removeMultipleLiquidity",
          description: "Remove liquidity from multiple positions",
          parameters: [
            { name: "params", type: "RemoveLiquidityParams", description: "Parameters for removing liquidity" }
          ],
          returns: "Promise<{ txs: Transaction[], txCreateAccount: Transaction | null, txCloseAccount: Transaction | null }>",
          example: ""
        }
      ]
    },
    {
      name: "Types",
      description: "Type definitions used in the DLMM SDK",
      icon: <Code2 className="h-5 w-5" />,
      methods: [
        {
          name: "MODE",
          description: "Network mode enumeration",
          parameters: [
            { name: "MAINNET", type: "string", description: "Mainnet mode" },
            { name: "DEVNET", type: "string", description: "Devnet mode" }
          ],
          returns: "enum",
          example: "/examples/dlmm"
        },
        {
          name: "LiquidityShape",
          description: "Shape of the liquidity distribution",
          parameters: [
            { name: "Spot", type: "string", description: "Spot liquidity shape" }
          ],
          returns: "enum",
          example: ""
        },
        {
          name: "RemoveLiquidityType",
          description: "Type of liquidity removal",
          parameters: [
            { name: "Both", type: "string", description: "Remove both tokens" }
          ],
          returns: "enum",
          example: ""
        },
        {
          name: "PositionInfo",
          description: "Information about a liquidity position",
          parameters: [],
          returns: "interface",
          example: ""
        }
      ]
    },
    {
      name: "Utils",
      description: "Utility functions for DLMM operations",
      icon: <Wrench className="h-5 w-5" />,
      methods: [
        {
          name: "createUniformDistribution",
          description: "Create a uniform liquidity distribution",
          parameters: [
            { name: "params", type: "{ shape: LiquidityShape, binRange: [number, number] }", description: "Parameters for the distribution" }
          ],
          returns: "any[]",
          example: ""
        },
        {
          name: "findPosition",
          description: "Find a position in a list of positions",
          parameters: [
            { name: "item", type: "any", description: "The item to find" },
            { name: "activeBin", type: "number", description: "The active bin" }
          ],
          returns: "(position: PositionInfo) => boolean",
          example: ""
        },
        {
          name: "getBinRange",
          description: "Get the bin range for a position",
          parameters: [
            { name: "item", type: "any", description: "The position item" },
            { name: "activeBin", type: "number", description: "The active bin" }
          ],
          returns: "{ range: [number, number], binLower: number, binUpper: number }",
          example: ""
        },
        {
          name: "getMaxBinArray",
          description: "Get the max bin array for a range",
          parameters: [
            { name: "binRange", type: "[number, number]", description: "The bin range" },
            { name: "activeBin", type: "number", description: "The active bin" }
          ],
          returns: "any[]",
          example: ""
        },
        {
          name: "getMaxPosition",
          description: "Get the max position for a range",
          parameters: [
            { name: "binRange", type: "[number, number]", description: "The bin range" },
            { name: "activeBin", type: "number", description: "The active bin" }
          ],
          returns: "any[]",
          example: ""
        },
        {
          name: "convertBalanceToWei",
          description: "Convert a balance to Wei",
          parameters: [
            { name: "strValue", type: "number", description: "The value to convert" },
            { name: "iDecimal", type: "number", description: "The number of decimals" }
          ],
          returns: "number",
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
            <h1 className="text-4xl font-heading font-bold mb-4">@saros-finance/dlmm-sdk API Reference</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Complete documentation for all methods, parameters, and return types in the Saros Finance DLMM SDK.
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
                <Link href="https://github.com/coin98/saros-dlmm-sdk" target="_blank">
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