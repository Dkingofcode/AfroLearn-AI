"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"
import { useEffect, useState } from "react"

export function WalletButton() {
  const [mounted, setMounted] = useState(false)
  const { connected, publicKey } = useWallet()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="sm" disabled>
        <Wallet className="mr-2 h-4 w-4" />
        Loading...
      </Button>
    )
  }

  if (connected && publicKey) {
    return (
      <Button variant="outline" size="sm" className="font-mono bg-transparent">
        <Wallet className="mr-2 h-4 w-4" />
        {publicKey.toBase58().slice(0, 4)}...{publicKey.toBase58().slice(-4)}
      </Button>
    )
  }

  return (
    <WalletMultiButton className="!bg-primary !text-primary-foreground hover:!bg-primary/90 !h-9 !px-4 !text-sm !rounded-md !transition-colors" />
  )
}
