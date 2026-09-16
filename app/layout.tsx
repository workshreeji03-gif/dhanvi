import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Dhanvi — AI-Native Investment Intelligence',
  description:
    'Dhanvi is building a multi-agent investment intelligence system for market research, strategy development, portfolio intelligence, risk and continuous learning.',
  generator: 'Dhanvi',
  keywords: [
    'AI investment intelligence',
    'multi-agent financial research',
    'quantitative strategies',
    'portfolio intelligence',
    'autonomous trading research',
    'institutional risk engine',
    'Dhanvi',
  ],
  openGraph: {
    title: 'Dhanvi — AI-Native Investment Intelligence',
    description:
      'A multi-agent investment intelligence system where specialized AI agents collaborate across market research, strategy generation, risk management, and institutional memory.',
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
      <body className="font-sans antialiased selection:bg-emerald-100 selection:text-emerald-950">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
