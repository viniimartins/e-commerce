'use client'

import { Button } from '@/components/ui/button'
import { useRemoveAllWishlist } from '@/hooks/mutation/wishlist/remove-all'
import { useGetWishlist } from '@/hooks/query/wishlist/get'
import { useCart } from '@/providers/cart-provider'

import { ProductCard } from '../_components/product-card'
import { ProductCardSkeleton } from '../_components/product-card/skeleton'

export function Content() {
  const { addToCart } = useCart()

  const { data: products, queryKey, isLoading } = useGetWishlist({ params: {} })

  const { mutate: removeAll } = useRemoveAllWishlist({ queryKey })

  function handleMoveAllToCart() {
    removeAll(undefined, {
      onSuccess: () => {
        products?.data.forEach(({ product }) => {
          addToCart(product)
        })
      },
    })
  }

  return (
    <>
      <section className="flex items-center justify-between">
        <span className="text-base font-medium">
          Lista de desejos ({products?.meta?.total ?? 0})
        </span>
        <Button variant="outline" size="lg" onClick={handleMoveAllToCart}>
          Mover todos para o carrinho
        </Button>
      </section>

      {products?.data.length === 0 && (
        <span className="text-muted-foreground text-start text-sm">
          Sua lista de desejos está vazia! Adicione produtos para visualizá-los
          aqui.
        </span>
      )}

      <div className="grid w-full grid-cols-4 gap-4">
        {products?.data.map(({ product }) => {
          const { id } = product

          return <ProductCard variant="wishlist" key={id} data={product} />
        })}

        {isLoading &&
          Array.from({ length: 4 }).map((_, index) => {
            return <ProductCardSkeleton key={index} />
          })}
      </div>
    </>
  )
}
