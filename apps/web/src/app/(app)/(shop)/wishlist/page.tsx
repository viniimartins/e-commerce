import { Button } from '@/components/ui/button'

import { ProductCard } from '../components/product-card'

export default function Wishlist() {
  return (
    <>
      <div className="mt-14 flex items-center justify-between">
        <span className="text-base font-medium">Wishlist (4)</span>
        <Button variant="outline" size="lg">
          Move All To Bag
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <ProductCard variant="wishlist" />
        <ProductCard variant="wishlist" />
        <ProductCard variant="wishlist" />
        <ProductCard variant="wishlist" />
      </div>
    </>
  )
}
