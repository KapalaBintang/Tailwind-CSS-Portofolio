import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import FirebaseProvider from "@/components/firebase-provider"
import { AuthProvider } from "@/contexts/auth-context"
import JsonLd from "@/components/json-ld"
import LocalBusinessSchema from "@/components/local-business-schema"
import IndonesiaSeo from "@/components/indonesia-seo"
import FaqSchema from "@/components/faq-schema"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Abdul 'Aziz | Fullstack Developer & Web Engineer",
  description: "Professional portfolio of Abdul 'Aziz, a skilled Fullstack Developer specializing in modern web technologies, React, Next.js, and full-stack development solutions.",
  keywords: ["fullstack developer", "web developer", "React developer", "Next.js developer", "portfolio", "Abdul Aziz", "software engineer", "frontend developer", "backend developer"],
  authors: [{ name: "Abdul 'Aziz" }],
  creator: "Abdul 'Aziz",
  publisher: "Abdul 'Aziz",
  generator: 'Next.js',
  applicationName: "Abdul 'Aziz Portfolio",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon-precomposed.png",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://abdul-aziz.my.id/",
    title: "Abdul 'Aziz | Fullstack Developer & Web Engineer",
    description: "Professional portfolio of Abdul 'Aziz, a skilled Fullstack Developer specializing in modern web technologies, React, Next.js, and full-stack development solutions.",
    siteName: "Abdul 'Aziz Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Abdul 'Aziz - Fullstack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdul 'Aziz | Fullstack Developer & Web Engineer",
    description: "Professional portfolio of Abdul 'Aziz, a skilled Fullstack Developer specializing in modern web technologies, React, Next.js, and full-stack development solutions.",
    images: ["/og-image.jpg"],
    creator: undefined,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  alternates: {
    canonical: "https://abdul-aziz.my.id/",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <JsonLd />
        <LocalBusinessSchema />
        <IndonesiaSeo />
        <FaqSchema />
      </head>
      <body className={inter.className}>
        <FirebaseProvider>
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              {children}
            </ThemeProvider>
          </AuthProvider>
        </FirebaseProvider>
      </body>
    </html>
  )
}