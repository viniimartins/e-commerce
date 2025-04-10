'use client'

import { X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/providers/cart-provider'
import { formatPrice } from '@/utils/formatPrice'

import Counter from '../../_components/counter'

export function Content() {
  const {
    cart,
    decrementCartQuantity,
    incrementCartQuantity,
    removeToCart,
    subTotal,
    total,
  } = useCart()

  return (
    <div className="flex h-full flex-col pb-8 pl-4">
      <ScrollArea className="h-[65vh] pr-4">
        {cart.map((product) => {
          const { id, name, price, cartQuantity, productImage } = product

          return (
            <div key={id} className="flex gap-4 border-b pt-4 pb-6">
              <div className="dark:bg-muted-foreground/10 relative flex h-30 w-30 items-center justify-center border bg-neutral-100">
                <Image
                  src={productImage[0].image.url}
                  alt={name}
                  fill
                  quality={100}
                  className="absolute object-cover p-1"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <div className="flex w-full flex-col justify-between">
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-semibold">{name}</h4>
                  <span className="text-lg font-medium">
                    {formatPrice(price)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <Counter
                    value={cartQuantity}
                    increment={() => incrementCartQuantity(id)}
                    decrement={() => decrementCartQuantity(id)}
                  />

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeToCart(id)}
                  >
                    <X />
                    <span className="sr-only">Remover produto</span>
                  </Button>
                </div>
              </div>
            </div>
          )
        })}

        {cart.length === 0 && (
          <p className="text-muted-foreground text-sm">
            Seu carrinho está vazio. Adicione alguns produtos ao seu carrinho.
          </p>
        )}
      </ScrollArea>

      <div className="mt-auto flex flex-col gap-2 pr-4">
        <div className="flex justify-between">
          <span className="text-base font-medium">SubTotal</span>
          <span className="text-base font-semibold">
            {formatPrice(subTotal)}
          </span>
        </div>

        <Separator />

        <div className="flex justify-between">
          <span className="text-xl font-medium">Total</span>
          <span className="text-xl font-semibold">{formatPrice(total)}</span>
        </div>

        <Link href="/cart/checkout" target="_top" className="w-full">
          <Button size="lg" className="w-full">
            Finalizar a compra
          </Button>
        </Link>

        <Link href="/cart" target="_top" className="m-auto">
          <Button variant="link" className="underline">
            Ver carrinho
          </Button>
        </Link>
      </div>
    </div>
  )
}
