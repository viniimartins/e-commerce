'use client'

import Image from 'next/image'

import { useGetProfile } from '@/app/(app)/hooks/use-get-profile'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/providers/cart-provider'
import { formatPrice } from '@/utils/formatPrice'

import { CheckoutForm } from './form'
import { useCreateBilling } from './hooks/use-create-billing'

export function Content() {
  const { cart, subTotal, total } = useCart()

  const { mutate: createBilling } = useCreateBilling()

  const { data: profile } = useGetProfile()

  function handleCreateBilling() {
    if (!profile) return

    createBilling(
      {
        billing: {
          customerId: 'cust_dbzqTgBpnATT3YXw0zRtTrpE',
          products: cart.map(
            ({ id, name, description, price, cartQuantity }) => ({
              externalId: id,
              name,
              description,
              quantity: cartQuantity,
              price: price * 100,
            }),
          ),
        },
      },
      {
        onSuccess: ({ url }) => {
          window.location.href = url
        },
      },
    )
  }

  return (
    <section className="grid grid-cols-2 gap-28">
      <div className="space-y-8">
        <h1 className="text-2xl font-medium">Detalhes de cobrança</h1>
        <CheckoutForm />
      </div>

      <div className="mt-24 space-y-8">
        {cart.map((product) => {
          const { id, name, price, productImage } = product

          return (
            <div key={id} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="group dark:bg-muted-foreground/10 relative mb-1 flex h-[3.5rem] w-[3.5rem] items-center justify-center bg-neutral-100 p-0 dark:border">
                  <Image
                    src={productImage[0].url}
                    alt="product"
                    fill
                    quality={100}
                    priority
                    className="object-cover p-1"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                <span className="text-base font-medium">{name}</span>
              </div>

              <span className="text-sm font-medium">{formatPrice(price)}</span>
            </div>
          )
        })}

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-base">Subtotal:</span>
            <span className="text-muted-foreground text-sm">
              {formatPrice(subTotal)}
            </span>
          </div>

          <Separator />

          <div className="flex justify-between">
            <span className="text-base">Frete:</span>
            <span className="text-sm">Grátis</span>
          </div>

          <Separator />

          <div className="flex justify-between">
            <span className="text-base">Total:</span>
            <span className="text-muted-foreground text-sm">
              {formatPrice(total)}
            </span>
          </div>
        </div>

        <Button size="lg" onClick={handleCreateBilling}>
          Finalizar compra
        </Button>
      </div>
    </section>
  )
}
