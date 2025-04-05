import { LoaderCircle } from 'lucide-react'
import type { Metadata } from 'next'
import { Suspense } from 'react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

import { Content } from './content'

export const metadata: Metadata = {
  title: 'Shop',
}

export default function CategoryPage() {
  return (
    <>
      <section className="bg-muted-foreground/10 relative h-96">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <h1 className="text-4xl font-medium">Shop Page</h1>
          <p className="text-muted-foreground text-base">
            Let’s design the place you always imagined.
          </p>
        </div>
      </section>

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Shop</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Suspense
        fallback={
          <div className="flex h-full items-center justify-center">
            <LoaderCircle className="h-6 w-6 animate-spin" />
          </div>
        }
      >
        <Content />
      </Suspense>
    </>
  )
}
