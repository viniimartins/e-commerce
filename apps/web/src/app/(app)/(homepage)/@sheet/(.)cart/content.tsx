'use client'

import { X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/providers/cart-provider'
import { formatPrice } from '@/utils/formatPrice'

import Counter from '../../components/counter'

export function Content() {
  const { cart } = useCart()

  return (
    <div className="flex h-full flex-col pb-8 pl-4">
      <div className="h-[65vh] space-y-4 overflow-y-auto pr-2">
        {cart.map((product) => {
          const { id, name, price, productImage } = product

          return (
            <div key={id} className="flex gap-4 border-b pb-6">
              <div className="dark:bg-muted-foreground/10 relative flex h-30 w-30 items-center justify-center bg-neutral-100 dark:border">
                <Image
                  src={productImage[0].url}
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
                  <Counter />
                  <Button variant="outline" size="icon">
                    <X />
                    <span className="sr-only">Remove product</span>
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-auto flex flex-col gap-2 pr-4">
        <div className="flex justify-between">
          <span className="text-base font-medium">SubTotal</span>
          <span className="text-base font-semibold">{formatPrice(99)}</span>
        </div>

        <Separator />

        <div className="flex justify-between">
          <span className="text-xl font-medium">Total</span>
          <span className="text-xl font-semibold">{formatPrice(234)}</span>
        </div>

        <Button size="lg">Checkout</Button>

        <Link href="/cart" target="_top" className="m-auto">
          <Button variant="link" className="underline">
            View cart
          </Button>
        </Link>
      </div>
    </div>
  )
}
