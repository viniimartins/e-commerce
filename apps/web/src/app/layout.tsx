import '@/styles/globals.css'

import { Inter, Poppins } from 'next/font/google'

import { Providers } from '@/providers'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppions = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppions',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppions.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
