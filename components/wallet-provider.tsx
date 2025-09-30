"use client"

import type React from "react"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets"
import { clusterApiUrl } from "@solana/web3.js"
import { useMemo } from "react"

import "@solana/wallet-adapter-react-ui/styles.css"

export function SolanaWalletProvider({ children }: { children: React.ReactNode }) {
  const network = WalletAdapterNetwork.Devnet
  const endpoint = useMemo(() => {
    try {
      return clusterApiUrl(network)
    } catch (error) {
      console.error("[v0] Failed to get cluster API URL:", error)
      return "https://api.devnet.solana.com"
    }
  }, [network])

  const wallets = useMemo(() => {
    try {
      return [new PhantomWalletAdapter(), new SolflareWalletAdapter()]
    } catch (error) {
      console.error("[v0] Failed to initialize wallets:", error)
      return []
    }
  }, [])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={false}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
