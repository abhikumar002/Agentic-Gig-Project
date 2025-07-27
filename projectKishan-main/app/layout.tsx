import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "./contexts/AuthContext"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Project Kisan - AI-Powered Farming Solutions",
  description:
    "Transform your farming with AI-powered crop diagnosis, real-time market prices, and intelligent agricultural assistance. Empowering Indian farmers with cutting-edge technology.",
  keywords:
    "AI farming, crop diagnosis, leaf disease detection, agricultural technology, smart farming, Indian agriculture, Kannada, multilingual farming assistant",
  authors: [{ name: "Project Kisan Team" }],
  creator: "Project Kisan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://projectkisan.com",
    title: "Project Kisan - AI-Powered Farming Solutions",
    description: "Transform your farming with AI-powered solutions for better yields and sustainable agriculture.",
    siteName: "Project Kisan",
  },
  twitter: {
    card: "summary_large_image",
    title: "Project Kisan - AI-Powered Farming Solutions",
    description: "Transform your farming with AI-powered solutions for better yields and sustainable agriculture.",
    creator: "@projectkisan",
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (


    <html lang="en" className={inter.variable}>
      <body>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>

      </body>
    </html>
  )
}
