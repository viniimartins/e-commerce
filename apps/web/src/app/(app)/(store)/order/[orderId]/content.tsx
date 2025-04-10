'use client'

import { addDays } from 'date-fns'
import { TruckIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { type IOrderById, OrderStatus } from '@/app/(app)/types'
import pix from '@/assets/icons/pix.svg'
import { BadgeStatus } from '@/components/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { useCart } from '@/providers/cart-provider'
import { formatDateLong, formatDateShort } from '@/utils/formatDate'
import { formatPrice } from '@/utils/formatPrice'

import { Stepper } from './stepper'

interface Props {
  data: IOrderById
}

export function Content({ data }: Props) {
  const { createdAt, products, total, currentStatus, id, address, status } =
    data

  const { removeAllProducts, addToCart } = useCart()

  const [isAccordionOpen, setIsAccordionOpen] = useState(false)

  function handleBuyAgain() {
    removeAllProducts()

    products.forEach(({ product }) => {
      addToCart(product)
    })
  }

  const paymentDate = status.find(
    ({ status }) => status !== OrderStatus.PENDING,
  )

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-4">
          <Card className="rounded-none">
            <CardHeader className="flex flex-col items-start justify-between gap-2">
              <BadgeStatus status={currentStatus} className="h-9" />
              <CardTitle className="text-xl">
                {currentStatus !== OrderStatus.SHIPPED &&
                  `Pedido chegara no dia ${formatDateShort(
                    addDays(new Date(createdAt), 7),
                  )}`}

                {currentStatus === OrderStatus.SHIPPED &&
                  `Pedido entregue no dia ${formatDateShort(
                    addDays(new Date(createdAt), 8),
                  )}`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                {`${currentStatus === OrderStatus.SHIPPED ? 'Entregamos' : 'Entregaremos'} seu pacote no endereço`}
                <span className="font-bold underline">
                  {' '}
                  {address?.address}, {address?.neighborhood},
                </span>{' '}
                {address?.city}, {address?.state}.
              </p>
            </CardContent>

            <Separator />

            <CardFooter>
              <Link href={`/cart`}>
                <Button variant="secondary" onClick={handleBuyAgain}>
                  Comprar novamente
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="gap-1 rounded-none">
            <ScrollArea
              className={cn('h-56', {
                'h-auto': products && products?.length <= 4,
              })}
            >
              <CardContent>
                {products?.map(({ product, quantity }, index) => {
                  const lastIndex = products.length === index + 1

                  const { id, name, price, productImage } = product

                  return (
                    <div key={id}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="dark:bg-muted-foreground/10 group relative mb-1 flex h-[3.5rem] w-[3.5rem] items-center justify-center bg-neutral-100 p-0 dark:border">
                            <Image
                              src={productImage[0].image.url}
                              alt="product"
                              fill
                              quality={100}
                              priority
                              className="object-cover p-1"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>

                          <div className="flex h-full flex-col justify-between">
                            <span className="text-base font-medium">
                              {name}
                            </span>

                            <span className="text-muted-foreground text-sm">
                              {quantity} un.
                            </span>
                          </div>
                        </div>

                        <span className="text-sm font-medium">
                          {formatPrice(price)}
                        </span>
                      </div>

                      {!lastIndex && <Separator className="my-2" />}
                    </div>
                  )
                })}
              </CardContent>
            </ScrollArea>
          </Card>
        </div>

        <Card
          className={cn(
            'col-span-1 h-[19rem] gap-1 rounded-none',
            isAccordionOpen && 'h-auto',
          )}
        >
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Detalhe da compra
            </CardTitle>
            <CardDescription className="flex h-4 items-center gap-2">
              <span className="text-sm">{formatDateLong(createdAt)}</span>

              <Separator orientation="vertical" />
              <span className="text-muted-foreground text-sm uppercase">
                #{id.slice(0, 8)}
              </span>
            </CardDescription>

            <Separator className="my-2" />
          </CardHeader>

          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Desconto à vista</span>
              <span className="text-muted-foreground text-sm">
                {formatPrice(0)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">Frete</span>
              <span className="text-muted-foreground text-sm">
                {formatPrice(0)}
              </span>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <span className="text-sm">Total</span>
              <span className="text-muted-foreground text-sm">
                {formatPrice(Number(total) / 100)}
              </span>
            </div>

            <Separator className="mt-6" />
          </CardContent>

          <CardFooter>
            <Accordion
              type="single"
              collapsible
              className="w-full"
              onValueChange={(value) => setIsAccordionOpen(!!value)}
            >
              <AccordionItem value="item-1" className="w-full">
                <AccordionTrigger className="w-full">
                  Detalhes do pagamento e envio
                </AccordionTrigger>
                <AccordionContent className="space-y-8">
                  {currentStatus !== OrderStatus.PENDING && (
                    <div className="mt-4 flex flex-col gap-2">
                      <span className="text-base font-semibold">Pagamento</span>
                      <div className="flex w-full gap-4 border p-4">
                        <div className="dark:bg-muted-foreground/10 relative flex h-[3rem] w-[3rem] items-center justify-center rounded-full bg-neutral-100 dark:border">
                          <Image
                            src={pix}
                            alt="pix"
                            fill
                            quality={100}
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>

                        <div className="flex flex-1 flex-col gap-1">
                          <span className="text-sm font-medium">
                            {formatPrice(Number(total) / 100)}
                          </span>
                          <span className="text-muted-foreground text-sm font-medium">
                            PIX
                          </span>

                          <span className="text-muted-foreground text-sm">
                            {paymentDate?.createdAt &&
                              formatDateLong(paymentDate.createdAt)}
                          </span>

                          <span className="text-sm font-medium text-green-500">
                            Pagamento Aprovado
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col gap-2">
                    <span className="text-base font-semibold">Frete</span>
                    <div className="flex w-full gap-4 border p-4">
                      <div className="dark:bg-muted-foreground/10 relative flex h-[3rem] w-[3rem] items-center justify-center rounded-full bg-neutral-100 dark:border">
                        <TruckIcon className="size-6" />
                      </div>

                      <div className="flex flex-1 flex-col gap-1">
                        <span className="text-sm font-medium">
                          {address?.address}, {address?.neighborhood}
                        </span>
                        <span className="text-muted-foreground text-sm font-medium">
                          {address?.city}, {address?.state}
                        </span>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-10">
        <Card className="rounded-none">
          <CardHeader>
            <CardTitle className="text-xl font-medium">
              Status do Pedido
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Stepper status={status} />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
