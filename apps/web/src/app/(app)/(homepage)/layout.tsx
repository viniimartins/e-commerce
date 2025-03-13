import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { Header } from '@/components/header'

import { Footer } from '../../../components/footer'

export const metadata: Metadata = {
  title: {
    template: 'Univinte | %s',
    default: 'Shop',
  },
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
        <div className="mx-auto flex min-h-min w-full max-w-[73.125rem] flex-1 flex-col gap-10 overflow-auto px-8 pb-24">
          {children}
        </div>
        <Footer />
      </section>
    </main>
  )
}
