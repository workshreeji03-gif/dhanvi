import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Dhanvi — The AI Finance Operating System for Businesses',
  description:
    'Dhanvi is an AI finance co-pilot that continuously captures, organizes, and understands your business finances — giving you a live view of cash flow, profit, expenses, and financial health. Built to work alongside your accountant.',
  generator: 'v0.app',
  keywords: [
    'AI finance',
    'financial operating system',
    'SMB accounting',
    'cash flow',
    'AI co-pilot',
    'Dhanvi',
  ],
  openGraph: {
    title: 'Dhanvi — The AI Finance Operating System for Businesses',
    description:
      'Your business finances. Always up to date. An AI finance co-pilot that works alongside your accountant.',
    type: 'website',
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ffffff',
}

import { Suspense } from 'react'
import { AuthHashListener } from '@/components/auth/auth-hash-listener'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <Suspense fallback={null}>
          <AuthHashListener />
        </Suspense>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
