import { Button } from '@/components/ui/button'

import { ProductCard } from '../components/product-card'

export default function Wishlist() {
  return (
    <>
      <section className="mt-14 flex items-center justify-between">
        <span className="text-base font-medium">Wishlist (4)</span>
        <Button variant="outline" size="lg">
          Move All To Bag
        </Button>
      </section>

      <div className="grid grid-cols-4 gap-6">
        <ProductCard variant="wishlist" />
        <ProductCard variant="wishlist" />
        <ProductCard variant="wishlist" />
        <ProductCard variant="wishlist" />
      </div>

      <section className="mt-10 space-y-12">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-4 rounded-[4px] bg-primary" />
            <span className="text-lg font-semibold">Just For You</span>
          </div>

          <div className="flex items-end">
            <Button size="lg" variant="outline">
              View ALL
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6">
          <ProductCard variant="viewImages" />
          <ProductCard variant="viewImages" />
          <ProductCard variant="viewImages" />
          <ProductCard variant="viewImages" />
        </div>
      </section>
    </>
  )
}
