'use client'

import { Eye, Heart, ShoppingCart, Trash } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { type MouseEvent, useState } from 'react'

import type { IProduct } from '@/app/(app)/types'
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
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { useCart } from '@/providers/cart-provider'
import { formatPrice } from '@/utils/formatPrice'

import { useAddToWishlist } from '../../wishlist/hooks/use-add-to-wishlist'
import { useGetWishlist } from '../../wishlist/hooks/use-get-wishlist'
import { useRemoveFromWishlist } from '../../wishlist/hooks/use-remove-from-wishlist'
interface Props {
  variant?: 'default' | 'wishlist' | 'viewImages'
  data: IProduct
}

export function ProductCard(props: Props) {
  const { data, variant = 'default' } = props

  const { description, id, name, price, productImage } = data

  const { addToCart } = useCart()

  const { data: wishlist, queryKey } = useGetWishlist({ params: {} })

  const { mutate: addToWishlist } = useAddToWishlist({ queryKey })

  const { mutate: removeFromWishlist } = useRemoveFromWishlist({ queryKey })

  const isProductInWishlist = wishlist?.data.some((item) => item.id === data.id)

  const [isOpen, setIsOpen] = useState(false)

  const handleOpenDialog = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setIsOpen(true)
  }
  return (
    <>
      <Link href={`/shop/${id}`}>
        <Card className="relative w-full cursor-pointer gap-2 space-y-3 rounded-none border-none py-0 shadow-none">
          <CardContent className="group dark:bg-muted-foreground/10 relative mb-1 flex h-[15rem] items-center justify-center bg-neutral-100 p-0 dark:border">
            {productImage && (
              <Image
                src={productImage[0].url}
                alt={name}
                fill
                quality={100}
                priority
                className="object-cover p-2"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
            <div className="absolute top-4 right-4 flex cursor-pointer flex-col gap-2">
              {variant === 'default' && (
                <>
                  <Button
                    variant="secondary"
                    className="cursor-pointer rounded-full border-none disabled:opacity-80"
                    size="icon"
                    disabled={isProductInWishlist}
                    onClick={(event) => {
                      event.preventDefault()

                      addToWishlist({ product: data })
                    }}
                  >
                    <Heart
                      className={cn(isProductInWishlist && 'fill-current')}
                    />
                  </Button>

                  <Button
                    variant="secondary"
                    className="rounded-full border-none"
                    size="icon"
                    onClick={handleOpenDialog}
                  >
                    <Eye />
                  </Button>
                </>
              )}

              {variant === 'wishlist' && (
                <Button
                  variant="secondary"
                  className="cursor-pointer rounded-full border-none"
                  size="icon"
                  onClick={(event) => {
                    event.preventDefault()
                    removeFromWishlist({ product: data })
                  }}
                >
                  <Trash />
                </Button>
              )}

              {variant === 'viewImages' && (
                <Button
                  variant="secondary"
                  className="rounded-full border-none"
                  size="icon"
                  onClick={handleOpenDialog}
                >
                  <Eye />
                </Button>
              )}
            </div>

            {variant === 'default' && (
              <Button
                onClick={(event) => {
                  event.preventDefault()
                  addToCart(data)
                }}
                className="absolute bottom-0 left-1/2 h-12 w-full -translate-x-1/2 transform px-4 py-2 opacity-0 transition-opacity group-hover:opacity-100"
              >
                Add To Cart
              </Button>
            )}

            {variant !== 'default' && (
              <Button
                variant="secondary"
                onClick={(event) => {
                  event.preventDefault()
                  addToCart(data)
                }}
                className="absolute bottom-0 left-1/2 h-12 w-full -translate-x-1/2 transform px-4 py-2"
              >
                <ShoppingCart />
                Add To Cart
              </Button>
            )}
          </CardContent>
          <CardFooter className="flex flex-col items-start p-0">
            <h3 className="text-base font-medium">{name}</h3>
            <p className="text-muted-foreground mt-1 text-base font-medium">
              {formatPrice(price)}
            </p>
          </CardFooter>
        </Card>
      </Link>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="grid max-h-[70vh]! max-w-[50vw]! grid-cols-5 gap-6">
          <div className="dark:bg-muted-foreground/10 relative col-span-3 h-full bg-neutral-100 dark:border">
            <Carousel>
              <CarouselContent>
                {productImage?.map((image) => {
                  const { id, url } = image

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
              <DialogDescription className="text-muted-foreground line-clamp-12 overflow-auto pr-2 text-base">
                {description}
              </DialogDescription>
            </DialogHeader>
            <Separator />

            <div className="flex justify-between gap-4">
              <Button className="flex-1">Buy Now</Button>
              <Button>
                <Heart />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
