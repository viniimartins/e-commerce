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
      <section className="flex min-h-screen w-full flex-1 flex-col">
        <Header />
        <div className="mx-auto flex min-h-min w-full max-w-6xl flex-1 flex-col overflow-auto px-8 pb-14">
          {children}
        </div>
        FOOTER
      </section>
    </main>
  )
}
