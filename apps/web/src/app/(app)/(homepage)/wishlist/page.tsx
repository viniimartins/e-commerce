import type { Metadata } from 'next'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'

import { ProductCard } from '../components/product-card'

export const metadata: Metadata = {
  title: 'Wishlist',
}

export default function Wishlist() {
  return (
    <>
      <Breadcrumb className="mt-14">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Wishlist</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section className="flex items-center justify-between">
        <span className="text-base font-medium">Wishlist (4)</span>
        <Button variant="outline" size="lg" className="">
          Move All To Bag
        </Button>
      </section>

      <div className="grid grid-cols-4 gap-4">
        <ProductCard variant="wishlist" />
        <ProductCard variant="wishlist" />
        <ProductCard variant="wishlist" />
        <ProductCard variant="wishlist" />
      </div>

      <section className="mt-10 space-y-12">
        <div className="flex justify-between">
          <span className="text-primary text-2xl font-medium">
            Just For You
          </span>

          <div className="flex items-end">
            <Button size="lg" variant="outline">
              View ALL
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <ProductCard variant="viewImages" />
          <ProductCard variant="viewImages" />
          <ProductCard variant="viewImages" />
          <ProductCard variant="viewImages" />
        </div>
      </section>
    </>
  )
}
