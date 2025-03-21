'use client'

import { Button } from '@/components/ui/button'
import { useCart } from '@/providers/cart-provider'

import { ProductCard } from '../components/product-card'
import { useGetWishlist } from './hooks/use-get-wishlist'
import { useRemoveAllWishlist } from './hooks/use-remove-all-wishlist'

export function Content() {
  const { addToCart } = useCart()

  const { data: products, queryKey } = useGetWishlist({ params: {} })

  const { mutate: removeAll } = useRemoveAllWishlist({ queryKey })

  function handleMoveAllToCart() {
    removeAll(undefined, {
      onSuccess: () => {
        products?.data.forEach((product) => {
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

      <div className="grid grid-cols-4 gap-4">
        {products?.data.map((product) => {
          const { id } = product

          return <ProductCard variant="wishlist" key={id} data={product} />
        })}
      </div>
    </>
  )
}
