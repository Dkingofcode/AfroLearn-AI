import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { SolanaWalletProvider } from "@/components/wallet-provider"
import { LanguageProvider } from "@/contexts/language-context"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "AfroLearn AI - Learn Solana Development with AI",
  description:
    "AI-powered Web3 learning platform for African students. Master Solana development with personalized learning paths and on-chain certifications.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LanguageProvider>
        <SolanaWalletProvider>{children}</SolanaWalletProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
