"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'

interface NetworkSelectorProps {
  network: string
  customEndpoint: string
  onNetworkChange: (network: string) => void
  onCustomEndpointChange: (endpoint: string) => void
}

export function NetworkSelector({
  network,
  customEndpoint,
  onNetworkChange,
  onCustomEndpointChange
}: NetworkSelectorProps) {
  const { connected, publicKey } = useWallet()
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Network Configuration</CardTitle>
        <CardDescription>Select your Solana network and connect your wallet</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Network</Label>
          <Select value={network} onValueChange={onNetworkChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select network" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="devnet">Devnet</SelectItem>
              <SelectItem value="mainnet-beta">Mainnet Beta</SelectItem>
              <SelectItem value="testnet">Testnet</SelectItem>
              <SelectItem value="custom">Custom RPC</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {network === "custom" && (
          <div className="space-y-2">
            <Label>Custom RPC Endpoint</Label>
            <Input 
              value={customEndpoint} 
              onChange={(e) => onCustomEndpointChange(e.target.value)}
              placeholder="https://your-rpc-endpoint.com"
            />
          </div>
        )}
        
        <div className="space-y-2">
          <Label>Wallet</Label>
          <WalletMultiButton className="w-full" />
          {connected && publicKey && (
            <div className="text-sm text-muted-foreground mt-2">
              Connected: {publicKey.toBase58().substring(0, 6)}...
              {publicKey.toBase58().substring(publicKey.toBase58().length - 4)}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}