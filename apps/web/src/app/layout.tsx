import '@/styles/globals.css'

import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppions = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppions',
})

export const metadata: Metadata = {
  title: {
    template: 'Univinte | %s',
    default: 'Shop',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppions.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
