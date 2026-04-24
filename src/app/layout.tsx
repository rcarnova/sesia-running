// src/app/layout.tsx
import type { Metadata } from 'next'
import { Bebas_Neue, Barlow_Condensed } from 'next/font/google'
import Footer from '@/app/components/Footer'
import './globals.css'

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas',
})

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-barlow-condensed',
})

export const metadata: Metadata = {
  title: 'Sesia Running Vercelli',
  description: 'Classifica societaria stagione 2024-25',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className={`${bebasNeue.variable} ${barlowCondensed.variable}`}>
        {children}
        <Footer />
      </body>
    </html>
  )
}
