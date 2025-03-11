import type { Metadata } from 'next'
import Image from 'next/image'

import gamepadSmall from '@/assets/g92-2-500x500 1.png'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import { CheckoutForm } from './form'

export const metadata: Metadata = {
  title: 'Checkout',
}

export default function Checkout() {
  return (
    <>
      <Breadcrumb className="mt-14">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/cart">Cart</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Checkout</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section className="grid grid-cols-2 gap-28">
        <div className="space-y-8">
          <h1 className="text-2xl font-medium">Billing Details</h1>
          <CheckoutForm />
        </div>

        <div className="mt-24 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src={gamepadSmall}
                width={50}
                height={50}
                alt="Image cart small"
              />

              <span className="text-base font-medium">LCD Monitor</span>
            </div>

            <span className="text-sm text-muted-foreground">$650</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src={gamepadSmall}
                width={50}
                height={50}
                alt="Image cart small"
              />

              <span className="text-base font-medium">LCD Monitor</span>
            </div>

            <span className="text-sm text-muted-foreground">$650</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src={gamepadSmall}
                width={50}
                height={50}
                alt="Image cart small"
              />

              <span className="text-base font-medium">LCD Monitor</span>
            </div>

            <span className="text-sm text-muted-foreground">$650</span>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-base">Subtotal:</span>
              <span className="text-sm text-muted-foreground">$1750</span>
            </div>

            <Separator />

            <div className="flex justify-between">
              <span className="text-base">Shipping:</span>
              <span className="text-sm">Free</span>
            </div>

            <Separator />

            <div className="flex justify-between">
              <span className="text-base">Total:</span>
              <span className="text-sm text-muted-foreground">$1750</span>
            </div>
          </div>

          <Button size="lg">Place Order</Button>
        </div>
      </section>
    </>
  )
}
