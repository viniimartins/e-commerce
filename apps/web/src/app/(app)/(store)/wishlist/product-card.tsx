'use client'

import { isAfter, subDays } from 'date-fns'
import { Eye, ShoppingCart, Trash } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import type { IProduct } from '@/app/(app)/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useModal } from '@/hooks/use-modal'
import { useCart } from '@/providers/cart-provider'
import { formatPrice } from '@/utils/format-price'

interface Props {
  data: IProduct
  handleRemoveFromWishlist: () => void
}

export function ProductCard(props: Props) {
  const { data, handleRemoveFromWishlist } = props
  const { description, id, name, price, productImage, quantity, createdAt } =
    data

  const { isOpen, actions } = useModal()
  const { cart, addToCart } = useCart()

  const isProductInCart = cart.some((item) => item.id === data.id)
  const isProductIsAvailable = quantity > 0
  const isNew = isAfter(createdAt, subDays(new Date(), 7))

  return (
    <>
      <Link href={`/shop/${id}`}>
        <Card className="bg-background relative w-full cursor-pointer gap-2 space-y-3 rounded-none border-none py-0 shadow-none">
          <CardContent className="group dark:bg-muted-foreground/10 relative mb-1 flex h-[15rem] items-center justify-center border bg-neutral-100 p-0">
            {isNew && (
              <Badge className="absolute top-4 left-4 z-30 h-8 font-semibold">
                NOVO
              </Badge>
            )}

            <Image
              src={productImage[0].image.url}
              alt={name}
              fill
              quality={100}
              priority
              className="object-cover p-2"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized
            />

            <div className="absolute top-4 right-4 flex cursor-pointer flex-col gap-2">
              <Button
                variant="secondary"
                className="cursor-pointer rounded-full border-none"
                size="icon"
                onClick={(event) => {
                  event.preventDefault()
                  handleRemoveFromWishlist()
                }}
              >
                <Trash />
              </Button>

              <Button
                variant="secondary"
                className="rounded-full border-none"
                size="icon"
                onClick={(event) => {
                  event.preventDefault()
                  actions.open()
                }}
              >
                <Eye />
              </Button>
            </div>

            <Button
              variant="secondary"
              disabled={isProductInCart || !isProductIsAvailable}
              onClick={(event) => {
                event.preventDefault()
                addToCart(data)
              }}
              className="absolute bottom-0 left-1/2 h-12 w-full -translate-x-1/2 transform px-4 py-2"
            >
              <ShoppingCart />
              {isProductInCart && 'Produto adicionado ao carrinho'}

              {!isProductInCart && !isProductIsAvailable && 'Sem estoque'}

              {!isProductInCart &&
                isProductIsAvailable &&
                'Adicionar ao carrinho'}
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col items-start p-0">
            <h3 className="text-base font-medium">{name}</h3>
            <p className="text-muted-foreground mt-1 text-base font-medium">
              {formatPrice(price)}
            </p>
          </CardFooter>
        </Card>
      </Link>

      <Dialog open={isOpen} onOpenChange={actions.close}>
        <DialogContent className="grid max-h-[70vh]! max-w-[50vw]! grid-cols-5 gap-6">
          <div className="dark:bg-muted-foreground/10 relative col-span-3 h-full border bg-neutral-100">
            <Carousel>
              <CarouselContent>
                {productImage?.map(({ image }) => {
                  const { url } = image

                  return (
                    <CarouselItem
                      key={id}
                      className="relative h-[35rem] w-full"
                    >
                      <Image
                        src={url}
                        alt={name}
                        fill
                        quality={100}
                        className="absolute object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        unoptimized
                      />
                    </CarouselItem>
                  )
                })}
              </CarouselContent>
              <CarouselPrevious className="left-2" variant="default" />
              <CarouselNext className="right-2" variant="default" />
            </Carousel>
          </div>

          <div className="col-span-2 flex flex-col gap-6">
            <DialogHeader className="flex flex-1 flex-col gap-3">
              <DialogTitle className="text-2xl font-bold">{name}</DialogTitle>
              <span className="text-xl font-medium">{formatPrice(price)}</span>
              <ScrollArea className="h-96">
                <DialogDescription className="text-muted-foreground text-base">
                  {description}
                </DialogDescription>
              </ScrollArea>
            </DialogHeader>
            <Separator />

            <div className="flex justify-between gap-4">
              <Button
                disabled={isProductInCart || !isProductIsAvailable}
                onClick={(event) => {
                  event.preventDefault()
                  addToCart(data)
                }}
                className="flex-1"
              >
                <ShoppingCart />
                {isProductInCart && 'Produto adicionado ao carrinho'}

                {!isProductInCart && !isProductIsAvailable && 'Sem estoque'}

                {!isProductInCart &&
                  isProductIsAvailable &&
                  'Adicionar ao carrinho'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
