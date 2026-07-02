import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Smart Finance - Paper Trading Bot',
  description: 'Professional Bot Trading System with Paper Trading, Backtesting & Real-time Analytics',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-dark-bg text-white font-mono">
        {children}
      </body>
    </html>
  )
}
