'use client'

import { ProductCardSkeleton } from '@/components/skeletons/product-card'
import { Button } from '@/components/ui/button'
import { useRemoveFromWishlist } from '@/hooks/mutation/wishlist/remove'
import { useRemoveAllWishlist } from '@/hooks/mutation/wishlist/remove-all'
import { useGetWishlist } from '@/hooks/query/wishlist/get'
import { useCart } from '@/providers/cart-provider'

import { ProductCard } from './product-card'

export function Content() {
  const { addToCart } = useCart()

  const {
    data: products,
    queryKey,
    isFetching: isFetchingWishlist,
  } = useGetWishlist({ params: {} })

  const { mutate: removeAll } = useRemoveAllWishlist({ queryKey })

  const { mutate: removeFromWishlist } = useRemoveFromWishlist({ queryKey })

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
        {!isFetchingWishlist &&
          products?.data.map(({ product }) => {
            const { id } = product

            return (
              <ProductCard
                key={id}
                data={product}
                handleRemoveFromWishlist={() => {
                  removeFromWishlist({ product })
                }}
              />
            )
          })}

        {isFetchingWishlist &&
          products?.data.map(({ product: { id } }) => (
            <ProductCardSkeleton key={id} />
          ))}
      </div>
    </>
  )
}
