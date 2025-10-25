// "use client"

// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { Sparkles, Brain, Code, Award, Users, Globe, BookOpen } from "lucide-react"
// import Link from "next/link"
// import { WalletButton } from "@/components/wallet-button"
// import { useLanguage } from "@/contexts/language-context"
// import { LanguageSwitcher } from "@/components/language-switcher"

// export default function LandingPage() {
//   const { t } = useLanguage()

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <header className="border-b border-border">
//         <div className="container mx-auto px-4 py-4">
//           <nav className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
//                 <Sparkles className="h-5 w-5 text-primary-foreground" />
//               </div>
//               <span className="text-xl font-bold">AfroLearn AI</span>
//             </div>
//             <div className="hidden items-center gap-6 md:flex">
//               <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
//                 {t("landing.nav.features")}
//               </Link>
//               <Link
//                 href="#how-it-works"
//                 className="text-sm text-muted-foreground hover:text-foreground transition-colors"
//               >
//                 {t("landing.nav.howItWorks")}
//               </Link>
//               <Link href="#community" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
//                 {t("landing.nav.community")}
//               </Link>
//               <LanguageSwitcher />
//               <WalletButton />
//             </div>
//           </nav>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="container mx-auto px-4 py-20 md:py-32">
//         <div className="mx-auto max-w-4xl text-center">
//           <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary">
//             <Sparkles className="h-4 w-4" />
//             <span>{t("landing.badge")}</span>
//           </div>
//           <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-balance md:text-7xl">
//             {t("landing.hero.title")}
//           </h1>
//           <p className="mb-8 text-lg text-muted-foreground text-pretty md:text-xl">{t("landing.hero.subtitle")}</p>
//           <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
//             <Link href="/tutor">
//               <Button size="lg" className="w-full sm:w-auto">
//                 {t("landing.hero.cta")}
//               </Button>
//             </Link>
//             <Link href="/dashboard">
//               <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
//                 {t("landing.hero.secondary")}
//               </Button>
//             </Link>
//           </div>
//         </div>

//         {/* Trust Indicators */}
//         <div className="mx-auto mt-20 max-w-5xl">
//           <p className="mb-8 text-center text-sm text-muted-foreground">{t("landing.poweredBy")}</p>
//           <div className="grid grid-cols-2 items-center justify-items-center gap-8 opacity-50 md:grid-cols-4">
//             <div className="text-2xl font-bold">{t("landing.companies.solana")}</div>
//             <div className="text-2xl font-bold">{t("landing.companies.vercel")}</div>
//             <div className="text-2xl font-bold">{t("landing.companies.aiSdk")}</div>
//             <div className="text-2xl font-bold">{t("landing.companies.metaplex")}</div>
//           </div>
//         </div>
//       </section>

//       {/* Features Grid */}
//       <section id="features" className="container mx-auto px-4 py-20">
//         <div className="mb-16 text-center">
//           <h2 className="mb-4 text-4xl font-bold text-balance">{t("landing.features.title")}</h2>
//           <p className="text-lg text-muted-foreground">{t("landing.features.subtitle")}</p>
//         </div>

//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//           <Card className="border-border bg-card p-6">
//             <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
//               <Brain className="h-6 w-6 text-primary" />
//             </div>
//             <h3 className="mb-2 text-xl font-bold">{t("landing.features.aiLearning")}</h3>
//             <p className="text-sm text-muted-foreground leading-relaxed">{t("landing.features.aiLearningDesc")}</p>
//           </Card>

//           <Card className="border-border bg-card p-6">
//             <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
//               <Code className="h-6 w-6 text-accent" />
//             </div>
//             <h3 className="mb-2 text-xl font-bold">{t("landing.features.interactiveCoding")}</h3>
//             <p className="text-sm text-muted-foreground leading-relaxed">
//               {t("landing.features.interactiveCodingDesc")}
//             </p>
//           </Card>

//           <Card className="border-border bg-card p-6">
//             <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
//               <Award className="h-6 w-6 text-primary" />
//             </div>
//             <h3 className="mb-2 text-xl font-bold">{t("landing.features.nftCertificates")}</h3>
//             <p className="text-sm text-muted-foreground leading-relaxed">{t("landing.features.nftCertificatesDesc")}</p>
//           </Card>

//           <Card className="border-border bg-card p-6">
//             <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
//               <Globe className="h-6 w-6 text-accent" />
//             </div>
//             <h3 className="mb-2 text-xl font-bold">{t("landing.features.multiLanguage")}</h3>
//             <p className="text-sm text-muted-foreground leading-relaxed">{t("landing.features.multiLanguageDesc")}</p>
//           </Card>
//         </div>
//       </section>

//       {/* How It Works */}
//       <section id="how-it-works" className="container mx-auto px-4 py-20">
//         <div className="mb-16 text-center">
//           <h2 className="mb-4 text-4xl font-bold text-balance">{t("landing.journey.title")}</h2>
//           <p className="text-lg text-muted-foreground">{t("landing.journey.subtitle")}</p>
//         </div>

//         <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
//           <Card className="border-border bg-card p-8">
//             <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
//               1
//             </div>
//             <h3 className="mb-3 text-2xl font-bold">{t("landing.step1.title")}</h3>
//             <p className="text-muted-foreground leading-relaxed">{t("landing.step1.desc")}</p>
//           </Card>

//           <Card className="border-border bg-card p-8">
//             <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
//               2
//             </div>
//             <h3 className="mb-3 text-2xl font-bold">{t("landing.step2.title")}</h3>
//             <p className="text-muted-foreground leading-relaxed">{t("landing.step2.desc")}</p>
//           </Card>

//           <Card className="border-border bg-card p-8">
//             <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
//               3
//             </div>
//             <h3 className="mb-3 text-2xl font-bold">{t("landing.step3.title")}</h3>
//             <p className="text-muted-foreground leading-relaxed">{t("landing.step3.desc")}</p>
//           </Card>

//           <Card className="border-border bg-card p-8">
//             <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
//               4
//             </div>
//             <h3 className="mb-3 text-2xl font-bold">{t("landing.step4.title")}</h3>
//             <p className="text-muted-foreground leading-relaxed">{t("landing.step4.desc")}</p>
//           </Card>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="border-y border-border bg-card/50 py-20">
//         <div className="container mx-auto px-4">
//           <div className="grid gap-8 md:grid-cols-3">
//             <div className="text-center">
//               <div className="mb-2 text-5xl font-bold text-primary">{t("landing.stats.free")}</div>
//               <div className="text-sm text-muted-foreground">{t("landing.stats.freeLabel")}</div>
//             </div>
//             <div className="text-center">
//               <div className="mb-2 text-5xl font-bold text-primary">{t("landing.stats.available")}</div>
//               <div className="text-sm text-muted-foreground">{t("landing.stats.availableLabel")}</div>
//             </div>
//             <div className="text-center">
//               <div className="mb-2 text-5xl font-bold text-primary">{t("landing.stats.languages")}</div>
//               <div className="text-sm text-muted-foreground">{t("landing.stats.languagesLabel")}</div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Community Section */}
//       <section id="community" className="container mx-auto px-4 py-20">
//         <div className="mx-auto max-w-3xl text-center">
//           <Users className="mx-auto mb-6 h-12 w-12 text-primary" />
//           <h2 className="mb-4 text-4xl font-bold text-balance">{t("landing.community.title")}</h2>
//           <p className="mb-8 text-lg text-muted-foreground text-pretty">{t("landing.community.desc")}</p>
//           <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
//             <Link href="/community">
//               <Button size="lg" className="w-full sm:w-auto">
//                 <Users className="mr-2 h-4 w-4" />
//                 {t("landing.community.join")}
//               </Button>
//             </Link>
//             <Link href="/dashboard">
//               <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
//                 <BookOpen className="mr-2 h-4 w-4" />
//                 {t("landing.community.viewDashboard")}
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="border-t border-border py-12">
//         <div className="container mx-auto px-4">
//           <div className="grid gap-8 md:grid-cols-4">
//             <div>
//               <div className="mb-4 flex items-center gap-2">
//                 <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
//                   <Sparkles className="h-5 w-5 text-primary-foreground" />
//                 </div>
//                 <span className="text-lg font-bold">AfroLearn AI</span>
//               </div>
//               <p className="text-sm text-muted-foreground">{t("landing.footer.tagline")}</p>
//             </div>
//             <div>
//               <h4 className="mb-4 text-sm font-semibold">{t("landing.footer.platform")}</h4>
//               <ul className="space-y-2 text-sm text-muted-foreground">
//                 <li>
//                   <Link href="#features" className="hover:text-foreground transition-colors">
//                     {t("landing.nav.features")}
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#how-it-works" className="hover:text-foreground transition-colors">
//                     {t("landing.nav.howItWorks")}
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#community" className="hover:text-foreground transition-colors">
//                     {t("landing.nav.community")}
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="mb-4 text-sm font-semibold">{t("landing.footer.resources")}</h4>
//               <ul className="space-y-2 text-sm text-muted-foreground">
//                 <li>
//                   <Link href="#" className="hover:text-foreground transition-colors">
//                     {t("landing.footer.documentation")}
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/community" className="hover:text-foreground transition-colors">
//                     {t("nav.community")}
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:text-foreground transition-colors">
//                     {t("landing.footer.support")}
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="mb-4 text-sm font-semibold">{t("landing.footer.legal")}</h4>
//               <ul className="space-y-2 text-sm text-muted-foreground">
//                 <li>
//                   <Link href="#" className="hover:text-foreground transition-colors">
//                     {t("landing.footer.privacy")}
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:text-foreground transition-colors">
//                     {t("landing.footer.terms")}
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:text-foreground transition-colors">
//                     {t("landing.footer.license")}
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
//             <p>{t("landing.footer.copyright")}</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }

'use client'

import {
  SolanaSignAndSendTransaction,
  SolanaSignIn,
  SolanaSignMessage,
  SolanaSignTransaction,
  type SolanaSignAndSendTransactionFeature,
  type SolanaSignInFeature,
  type SolanaSignMessageFeature,
  type SolanaSignTransactionFeature,
} from '@solana/wallet-standard-features'
import {
  StandardConnect,
  StandardDisconnect,
  type StandardConnectFeature,
  type StandardDisconnectFeature,
} from '@wallet-standard/core'
import { isSolanaChain } from '@solana/wallet-standard-chains'
import { getWalletFeature, useWallets, type UiWallet, type UiWalletAccount } from '@wallet-standard/react'
import { useState } from 'react'
import { Button } from '../components/ui/button'
import {
  getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  getWalletForHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
} from '@wallet-standard/ui-registry'
import {
  address,
  getBase58Decoder,
  getPublicKeyFromAddress,
  getUtf8Encoder,
  signatureBytes,
  verifySignature,
} from '@solana/kit'
import { Card } from "@/components/ui/card"
import { Sparkles, Brain, Code, Award, Users, Globe, BookOpen } from "lucide-react"
import Link from "next/link"
import { WalletButton } from "@/components/wallet-button"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"




export default function App() {
  const wallets = useWallets()
  const solanaWallets = wallets.filter(({ chains }) => chains.some((chain) => isSolanaChain(chain)))
  const [wallet, setWallet] = useState<UiWallet | undefined>(undefined)
  const [account, setAccount] = useState<UiWalletAccount | undefined>(undefined)

 const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background">
       {/* Header */}
       <header className="border-b border-border">
         <div className="container mx-auto px-4 py-4">
           <nav className="flex items-center justify-between">
             <div className="flex items-center gap-2">
               <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                 <Sparkles className="h-5 w-5 text-primary-foreground" />
               </div>
               <span className="text-xl font-bold">AfroLearn AI</span>
             </div>
             <div className="hidden items-center gap-6 md:flex">
               <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                 {t("landing.nav.features")}
               </Link>
               <Link
                href="#how-it-works"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("landing.nav.howItWorks")}
              </Link>
              <Link href="#community" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t("landing.nav.community")}
              </Link>
              <LanguageSwitcher />
     <div className="max-h-screen bg-black p-2 text-white">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8">Wallets</h1>

        {wallet ? (
          <div className="flex flex-col gap-4">
            {account ? (
              <div>
                <p>Wallet: {wallet.name}</p>
                <p>Account Address: {account.address}</p>
              </div>
            ) : null}
            {wallet.features.map((feature) => {
              switch (feature) {
                case StandardConnect: {
                  if (account) {
                    return null
                  }

                  const { connect } = getWalletFeature(
                    wallet,
                    StandardConnect,
                  ) as StandardConnectFeature[typeof StandardConnect]

                  return (
                    <Button
                      key={feature}
                      onClick={async () => {
                        const response = await connect()

                        setAccount(
                          getOrCreateUiWalletAccountForStandardWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED(
                            getWalletForHandle_DO_NOT_USE_OR_YOU_WILL_BE_FIRED(wallet),
                            response.accounts[0],
                          ),
                        )
                      }}
                    >
                      Connect
                    </Button>
                  )
                }

                case StandardDisconnect: {
                  if (!account) {
                    return null
                  }

                  const { disconnect } = getWalletFeature(
                    wallet,
                    StandardDisconnect,
                  ) as StandardDisconnectFeature[typeof StandardDisconnect]

                  return (
                    <Button key={feature} onClick={() => disconnect()}>
                      Disconnect
                    </Button>
                  )
                }

                // case SolanaSignAndSendTransaction: {
                //   if (!account) {
                //     return null
                //   }

                //   const { signAndSendTransaction } = getWalletFeature(
                //     wallet,
                //     SolanaSignAndSendTransaction,
                //   ) as SolanaSignAndSendTransactionFeature[typeof SolanaSignAndSendTransaction]

                //   return (
                //     <Button key={feature} onClick={() => signAndSendTransaction()}>
                //       Sign & Send Transaction
                //     </Button>
                //   )
                // }

                // case SolanaSignTransaction: {
                //   if (!account) {
                //     return null
                //   }

                //   const { signTransaction } = getWalletFeature(
                //     wallet,
                //     SolanaSignTransaction,
                //   ) as SolanaSignTransactionFeature[typeof SolanaSignTransaction]

                //   return (
                //     <Button key={feature} onClick={() => signTransaction()}>
                //       Sign Transaction
                //     </Button>
                //   )
                // }

                // case SolanaSignMessage: {
                //   if (!account) {
                //     return null
                //   }

                //   const { signMessage } = getWalletFeature(
                //     wallet,
                //     SolanaSignMessage,
                //   ) as SolanaSignMessageFeature[typeof SolanaSignMessage]

                //   return (
                //     <Button
                //       key={feature}
                //       onClick={async () => {
                //         const message = new Uint8Array(getUtf8Encoder().encode('Hello, World!'))
                //         const [response] = await signMessage({
                //           account,
                //           message,
                //         })
                //         console.log('Signed Message:', response)

                //         const decoded = getBase58Decoder().decode(response.signature)
                //         console.log('Signature:', decoded)

                //         const key = await getPublicKeyFromAddress(address(account.address))
                //         const verified = await verifySignature(key, signatureBytes(response.signature), message)
                //         console.log('Verified:', verified)
                //       }}
                //     >
                //       Sign Message
                //     </Button>
                //   )
                // }

                case SolanaSignIn: {
                  if (!account) {
                    return null
                  }

                  const { signIn } = getWalletFeature(wallet, SolanaSignIn) as SolanaSignInFeature[typeof SolanaSignIn]

                  return (
                    <Button key={feature} onClick={() => signIn()}>
                      Sign In
                    </Button>
                  )
                }

                default:
                  return null
              }
            })}
          </div>
        ) : (
          <>
            {solanaWallets.length ? (
              <div className="flex flex-col gap-4">
                {solanaWallets.map((wallet) => (
                  <Button key={wallet.icon} onClick={() => setWallet(wallet)}>
                    {wallet.icon && <img src={wallet.icon} alt={wallet.name} className="size-5" />}
                    <span className="text-left">{wallet.name}</span>
                  </Button>
                ))}
              </div>
            ) : (
              <p className="text-xl text-white/70">No wallets found</p>
            )}
          </>
        )}



      </div>
    </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary">
            <Sparkles className="h-4 w-4" />
            <span>{t("landing.badge")}</span>
          </div>
          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-balance md:text-7xl">
            {t("landing.hero.title")}
          </h1>
          <p className="mb-8 text-lg text-muted-foreground text-pretty md:text-xl">{t("landing.hero.subtitle")}</p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/tutor">
              <Button size="lg" className="w-full sm:w-auto">
                {t("landing.hero.cta")}
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                {t("landing.hero.secondary")}
              </Button>
            </Link>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mx-auto mt-20 max-w-5xl">
          <p className="mb-8 text-center text-sm text-muted-foreground">{t("landing.poweredBy")}</p>
          <div className="grid grid-cols-2 items-center justify-items-center gap-8 opacity-50 md:grid-cols-4">
            <div className="text-2xl font-bold">{t("landing.companies.solana")}</div>
            <div className="text-2xl font-bold">{t("landing.companies.vercel")}</div>
            <div className="text-2xl font-bold">{t("landing.companies.aiSdk")}</div>
            <div className="text-2xl font-bold">{t("landing.companies.metaplex")}</div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-balance">{t("landing.features.title")}</h2>
          <p className="text-lg text-muted-foreground">{t("landing.features.subtitle")}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-border bg-card p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-bold">{t("landing.features.aiLearning")}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("landing.features.aiLearningDesc")}</p>
          </Card>

          <Card className="border-border bg-card p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
              <Code className="h-6 w-6 text-accent" />
            </div>
            <h3 className="mb-2 text-xl font-bold">{t("landing.features.interactiveCoding")}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("landing.features.interactiveCodingDesc")}
            </p>
          </Card>

          <Card className="border-border bg-card p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-bold">{t("landing.features.nftCertificates")}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("landing.features.nftCertificatesDesc")}</p>
          </Card>

          <Card className="border-border bg-card p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
              <Globe className="h-6 w-6 text-accent" />
            </div>
            <h3 className="mb-2 text-xl font-bold">{t("landing.features.multiLanguage")}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("landing.features.multiLanguageDesc")}</p>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="container mx-auto px-4 py-20">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-balance">{t("landing.journey.title")}</h2>
          <p className="text-lg text-muted-foreground">{t("landing.journey.subtitle")}</p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          <Card className="border-border bg-card p-8">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
              1
            </div>
            <h3 className="mb-3 text-2xl font-bold">{t("landing.step1.title")}</h3>
            <p className="text-muted-foreground leading-relaxed">{t("landing.step1.desc")}</p>
          </Card>

          <Card className="border-border bg-card p-8">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
              2
            </div>
            <h3 className="mb-3 text-2xl font-bold">{t("landing.step2.title")}</h3>
            <p className="text-muted-foreground leading-relaxed">{t("landing.step2.desc")}</p>
          </Card>

          <Card className="border-border bg-card p-8">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
              3
            </div>
            <h3 className="mb-3 text-2xl font-bold">{t("landing.step3.title")}</h3>
            <p className="text-muted-foreground leading-relaxed">{t("landing.step3.desc")}</p>
          </Card>

          <Card className="border-border bg-card p-8">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
              4
            </div>
            <h3 className="mb-3 text-2xl font-bold">{t("landing.step4.title")}</h3>
            <p className="text-muted-foreground leading-relaxed">{t("landing.step4.desc")}</p>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-card/50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-2 text-5xl font-bold text-primary">{t("landing.stats.free")}</div>
              <div className="text-sm text-muted-foreground">{t("landing.stats.freeLabel")}</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-5xl font-bold text-primary">{t("landing.stats.available")}</div>
              <div className="text-sm text-muted-foreground">{t("landing.stats.availableLabel")}</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-5xl font-bold text-primary">{t("landing.stats.languages")}</div>
              <div className="text-sm text-muted-foreground">{t("landing.stats.languagesLabel")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <Users className="mx-auto mb-6 h-12 w-12 text-primary" />
          <h2 className="mb-4 text-4xl font-bold text-balance">{t("landing.community.title")}</h2>
          <p className="mb-8 text-lg text-muted-foreground text-pretty">{t("landing.community.desc")}</p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/community">
              <Button size="lg" className="w-full sm:w-auto">
                <Users className="mr-2 h-4 w-4" />
                {t("landing.community.join")}
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                <BookOpen className="mr-2 h-4 w-4" />
                {t("landing.community.viewDashboard")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold">AfroLearn AI</span>
              </div>
              <p className="text-sm text-muted-foreground">{t("landing.footer.tagline")}</p>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold">{t("landing.footer.platform")}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#features" className="hover:text-foreground transition-colors">
                    {t("landing.nav.features")}
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="hover:text-foreground transition-colors">
                    {t("landing.nav.howItWorks")}
                  </Link>
                </li>
                <li>
                  <Link href="#community" className="hover:text-foreground transition-colors">
                    {t("landing.nav.community")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold">{t("landing.footer.resources")}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    {t("landing.footer.documentation")}
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-foreground transition-colors">
                    {t("nav.community")}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    {t("landing.footer.support")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold">{t("landing.footer.legal")}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    {t("landing.footer.privacy")}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    {t("landing.footer.terms")}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    {t("landing.footer.license")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>{t("landing.footer.copyright")}</p>
          </div>
        </div>
      </footer>
    </div>
   
   
   
  
  )
}
