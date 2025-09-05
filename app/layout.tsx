import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SolanaWalletProvider } from "@/components/wallet-provider"
import "./globals.css"

// Fallback fonts in case Google Fonts fails
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  fallback: ["sans-serif"],
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  fallback: ["sans-serif"],
})

export const metadata: Metadata = {
  title: "Saros SDK Documentation",
  description: "Comprehensive developer documentation for Saros Finance SDKs - Build on Solana with ease"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Default to devnet
  const endpoint = "https://api.devnet.solana.com"
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${dmSans.style.fontFamily};
  --font-sans: ${dmSans.variable};
  --font-heading: ${spaceGrotesk.variable};
}
        `}</style>
      </head>
      <body className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`}>
        <SolanaWalletProvider endpoint={endpoint}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </SolanaWalletProvider>
      </body>
    </html>
  )
}
