"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism"
import { useTheme } from "next-themes"

interface CodeBlockProps {
  code: string
  language: string
  title?: string
  showCopy?: boolean
}

export function CodeBlock({ code, language, title, showCopy = true }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const { theme } = useTheme()

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative rounded-lg border bg-card">
      {title && (
        <div className="flex items-center justify-between border-b px-4 py-2">
          <span className="text-sm font-medium text-muted-foreground">{title}</span>
          {showCopy && (
            <Button variant="ghost" size="sm" onClick={copyToClipboard} className=" h-8 w-8 p-0">
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          )}
        </div>
      )}
      <div className="relative">
        {!title && showCopy && (
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="absolute right-2 top-2 z-10 h-8 w-8 p-0"
          >
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="text-foreground h-4 w-4" />}
          </Button>
        )}
        <SyntaxHighlighter
          language={language}
          style={theme === "dark" ? oneDark : oneLight}
          customStyle={{
            margin: 0,
            borderRadius: title ? "0 0 0.5rem 0.5rem" : "0.5rem",
            fontSize: "0.875rem",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
