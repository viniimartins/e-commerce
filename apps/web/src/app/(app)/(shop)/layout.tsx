import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { Header } from '@/app/(app)/(shop)/components/header'

export const metadata: Metadata = {
  title: 'Shop',
}

export default async function ShoppLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <main className="flex min-h-screen">
      <section className="tablet:ml-0 flex min-h-screen flex-1 flex-col">
        <Header />

        {children}
      </section>
    </main>
  )
}
