import { Metadata } from 'next'
import Image from 'next/image'
import type { ReactNode } from 'react'

import bgEcommerce from '@/assets/auth/bg-ecommerce.jpg'

import { Footer } from '../../components/footer'
import { Header } from '../../components/header'

export const metadata: Metadata = {
  title: {
    template: `Obra Vista | %s`,
    default: 'Obra Vista',
  },
}

export default async function AuthenticationLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <Header />
      <main className="h-[calc(100vh-5.5rem)] w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="hidden lg:block">
          <Image
            src={bgEcommerce}
            alt="Image"
            priority
            width="1920"
            height="1080"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="mx-auto flex h-full max-w-[27.5rem] min-w-[27.5rem] flex-col items-center justify-center space-y-6 px-4 py-8">
          {children}
        </div>
      </main>
      <Footer />
    </>
  )
}
