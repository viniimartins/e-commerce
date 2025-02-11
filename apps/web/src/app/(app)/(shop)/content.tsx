'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import { Carrousel } from './components/carrousel'
import { ProductCard } from './components/product-card'
import { SectionHeader } from './components/section-header'
import Sidebar from './components/sidebar'

export function Content() {
  return (
    <>
      <section className="grid grid-cols-[14rem_auto]">
        <div className="w-56">
          <Sidebar />
        </div>

        <div className="flex h-full w-full max-w-[50.75rem] items-center justify-center p-10">
          <Carrousel />
        </div>
      </section>

      <section className="space-y-10">
        <SectionHeader title="This Month" subtitle="Best Selling Products" />

        <div className="flex gap-6">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>

        <div className="flex justify-center">
          <Button variant="destructive" size="lg">
            View All Products
          </Button>
        </div>
      </section>

      <Separator />

      <section className="space-y-10">
        <div className="space-y-5">
          <SectionHeader title="Categories" subtitle="Browse By Category" />
        </div>

        <div className="flex gap-6">
          <ProductCard />
        </div>
      </section>
    </>
  )
}
