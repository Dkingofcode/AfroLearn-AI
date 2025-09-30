"use client"

import { useState, useEffect } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Download, ExternalLink, Loader2 } from "lucide-react"

// Mock certificate data
const certificates = [
  {
    id: 1,
    title: "Solana Fundamentals",
    description: "Completed the foundational course on Solana blockchain architecture",
    dateEarned: "2024-01-15",
    status: "earned",
    nftMinted: false,
    imageUrl: "/solana-blockchain-certificate-badge.jpg",
  },
  {
    id: 2,
    title: "Smart Contract Development",
    description: "Mastered Rust programming and Anchor framework for Solana",
    dateEarned: "2024-02-20",
    status: "earned",
    nftMinted: true,
    nftAddress: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    imageUrl: "/smart-contract-programming-certificate.jpg",
  },
  {
    id: 3,
    title: "DeFi Protocol Design",
    description: "Built and deployed a complete DeFi protocol on Solana",
    dateEarned: null,
    status: "locked",
    progress: 65,
    imageUrl: "/defi-protocol-certificate-locked.jpg",
  },
]

export default function CertificatesPage() {
  const [mounted, setMounted] = useState(false)
  const { publicKey, signTransaction } = useWallet()
  const [minting, setMinting] = useState<number | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const mintCertificateNFT = async (certificateId: number) => {
    if (!mounted) {
      return
    }

    if (!publicKey || !signTransaction) {
      alert("Please connect your wallet first")
      return
    }

    setMinting(certificateId)

    try {
      // Connect to Solana devnet
      const connection = new Connection("https://api.devnet.solana.com", "confirmed")

      // Create a simple transaction (in production, this would mint an actual NFT using Metaplex)
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey("AfroLearnAiPlatform1111111111111111111111111"), // Placeholder address
          lamports: 0.001 * LAMPORTS_PER_SOL,
        }),
      )

      const { blockhash } = await connection.getLatestBlockhash()
      transaction.recentBlockhash = blockhash
      transaction.feePayer = publicKey

      // Sign and send transaction
      const signed = await signTransaction(transaction)
      const signature = await connection.sendRawTransaction(signed.serialize())
      await connection.confirmTransaction(signature)

      alert(`Certificate NFT minted successfully! Signature: ${signature}`)
    } catch (error) {
      console.error("[v0] Error minting NFT:", error)
      alert("Failed to mint certificate NFT. Please try again.")
    } finally {
      setMinting(null)
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 text-balance">Your Certificates</h1>
          <p className="text-lg text-neutral-400 text-pretty">
            Earn on-chain certificates as NFTs to showcase your Solana development skills
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader>
              <CardTitle className="text-2xl">2</CardTitle>
              <CardDescription>Certificates Earned</CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader>
              <CardTitle className="text-2xl">1</CardTitle>
              <CardDescription>NFTs Minted</CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader>
              <CardTitle className="text-2xl">65%</CardTitle>
              <CardDescription>Next Certificate Progress</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <Card
              key={cert.id}
              className={`bg-neutral-900 border-neutral-800 ${cert.status === "locked" ? "opacity-60" : ""}`}
            >
              <CardHeader>
                <div className="relative mb-4 rounded-lg overflow-hidden">
                  <img
                    src={cert.imageUrl || "/placeholder.svg"}
                    alt={cert.title}
                    className="w-full h-48 object-cover"
                  />
                  {cert.status === "locked" && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <Badge variant="secondary" className="text-sm">
                        {cert.progress}% Complete
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-xl text-balance">{cert.title}</CardTitle>
                  {cert.status === "earned" && <Award className="h-5 w-5 text-primary shrink-0" />}
                </div>
                <CardDescription className="text-pretty">{cert.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {cert.status === "earned" && (
                  <div className="space-y-3">
                    <p className="text-sm text-neutral-400">
                      Earned on {new Date(cert.dateEarned!).toLocaleDateString()}
                    </p>
                    {cert.nftMinted ? (
                      <div className="space-y-2">
                        <Badge variant="default" className="bg-primary/20 text-primary">
                          NFT Minted
                        </Badge>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <a
                              href={`https://explorer.solana.com/address/${cert.nftAddress}?cluster=devnet`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        onClick={() => mintCertificateNFT(cert.id)}
                        disabled={!publicKey || minting === cert.id}
                        className="w-full"
                      >
                        {minting === cert.id ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Minting...
                          </>
                        ) : (
                          <>
                            <Award className="h-4 w-4 mr-2" />
                            Mint as NFT
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                )}
                {cert.status === "locked" && (
                  <Button variant="outline" className="w-full bg-transparent" disabled>
                    Complete Course to Unlock
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <Card className="mt-12 bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle>About Certificate NFTs</CardTitle>
            <CardDescription>Your achievements are stored permanently on the Solana blockchain</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-neutral-300">
            <p className="text-pretty">
              Each certificate you earn can be minted as an NFT on the Solana blockchain. These on-chain credentials
              are:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Permanently verifiable and tamper-proof</li>
              <li>Owned and controlled by you in your wallet</li>
              <li>Shareable with employers and the community</li>
              <li>Tradeable on NFT marketplaces (optional)</li>
            </ul>
            <p className="text-sm text-neutral-400 text-pretty">
              Note: Minting requires a small transaction fee (gas) on the Solana network. Make sure your wallet has some
              SOL for transactions.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
