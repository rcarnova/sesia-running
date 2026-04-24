// src/app/layout.tsx
import type { Metadata } from 'next'
import { Barlow, Barlow_Condensed } from 'next/font/google'
import './globals.css'

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-barlow',
})

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-barlow-condensed',
})

export const metadata: Metadata = {
  title: 'Sesia Running Vercelli',
  description: 'Classifica societaria stagione 2024-25',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className={`${barlow.variable} ${barlowCondensed.variable}`}>{children}</body>
    </html>
  )
}
