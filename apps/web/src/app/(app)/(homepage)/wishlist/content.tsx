'use client'

import { Button } from '@/components/ui/button'

import { ProductCard } from '../components/product-card'
import { useGetWishlist } from './hooks/use-get-wishlist'

export function Content() {
  const { data: products } = useGetWishlist({
    page: 1,
  })

  return (
    <>
      <section className="flex items-center justify-between">
        <span className="text-base font-medium">
          Wishlist ({products?.meta?.total ?? 0})
        </span>
        <Button variant="outline" size="lg" className="">
          Move All To Bag
        </Button>{' '}
      </section>

      <div className="grid grid-cols-4 gap-4">
        {!products?.data && (
          <span className="text-muted-foreground text-center text-sm">
            Nenhum item adicionado na wishlist!
          </span>
        )}

        {products?.data.map((product) => {
          const { id } = product

          return <ProductCard variant="wishlist" key={id} data={product} />
        })}
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

        {/* <div className="grid grid-cols-4 gap-4">
          <ProductCard variant="viewImages" />
          <ProductCard variant="viewImages" />
          <ProductCard variant="viewImages" />
          <ProductCard variant="viewImages" />
        </div> */}
      </section>
    </>
  )
}
