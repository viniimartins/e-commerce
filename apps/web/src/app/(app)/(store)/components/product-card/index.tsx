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
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { useCart } from '@/providers/cart-provider'
import { formatPrice } from '@/utils/formatPrice'

import type { GridView } from '../../shop/content'
import { useAddToWishlist } from '../../wishlist/hooks/use-add-to-wishlist'
import { useGetWishlist } from '../../wishlist/hooks/use-get-wishlist'
import { useRemoveFromWishlist } from '../../wishlist/hooks/use-remove-from-wishlist'
interface Props {
  variant?: 'default' | 'wishlist'
  gridView?: GridView
  data: IProduct
}

export function ProductCard(props: Props) {
  const { data, variant = 'default', gridView = 'grid3x3' } = props

  const { description, id, name, price, productImage, quantity } = data

  const { cart, addToCart } = useCart()

  const { data: wishlist, queryKey } = useGetWishlist({ params: {} })

  const { mutate: addToWishlist } = useAddToWishlist({ queryKey })

  const { mutate: removeFromWishlist } = useRemoveFromWishlist({ queryKey })

  const isProductInWishlist = wishlist?.data.some((item) => item.id === data.id)

  const [isOpen, setIsOpen] = useState(false)

  function handleOpenDialog(
    event: MouseEvent<HTMLButtonElement | HTMLDivElement>,
  ) {
    event.preventDefault()
    setIsOpen(true)
  }

  const isProductInCart = cart.some((item) => item.id === data.id)

  const isProductIsAvailable = quantity > 0

  return (
    <>
      <Link href={`/shop/${id}`}>
        {gridView === 'grid3x3' && (
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
              </div>

              {variant === 'default' && (
                <Button
                  onClick={(event) => {
                    event.preventDefault()
                    addToCart(data)
                  }}
                  disabled={isProductInCart || !isProductIsAvailable}
                  className="absolute bottom-0 left-1/2 z-10 h-12 w-full -translate-x-1/2 transform px-4 py-2 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  {isProductInCart && 'Produto adicionado ao carrinho'}

                  {!isProductInCart && !isProductIsAvailable && 'Sem estoque'}

                  {!isProductInCart &&
                    isProductIsAvailable &&
                    'Adicionar ao carrinho'}
                </Button>
              )}

              {variant !== 'default' && (
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
              )}
            </CardContent>
            <CardFooter className="flex flex-col items-start p-0">
              <h3 className="text-base font-medium">{name}</h3>
              <p className="text-muted-foreground mt-1 text-base font-medium">
                {formatPrice(price)}
              </p>
            </CardFooter>
          </Card>
        )}

        {gridView === 'grid2x2' && (
          <Card className="relative w-full cursor-pointer gap-2 space-y-3 rounded-none border-none py-0 shadow-none">
            <CardContent className="flex flex-row px-0">
              <div
                onClick={handleOpenDialog}
                className="group dark:bg-muted-foreground/10 relative h-[15rem] w-1/2 cursor-pointer bg-neutral-100 p-0 dark:border"
              >
                <div className="relative h-full w-full">
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
                </div>
              </div>

              <div className="flex w-1/2 flex-col justify-between px-2">
                <div className="space-y-0.5">
                  <h3 className="text-base font-medium">{name}</h3>
                  <span className="text-muted-foreground text-sm font-medium">
                    {formatPrice(price)}
                  </span>
                </div>
                <p className="text-muted-foreground line-clamp-4 text-sm font-medium">
                  {description}
                </p>
                <div className="mt-1 flex flex-col gap-2">
                  <Button
                    variant="secondary"
                    disabled={isProductInWishlist}
                    onClick={(event) => {
                      event.preventDefault()
                      addToWishlist({ product: data })
                    }}
                    size="sm"
                    className="w-full"
                  >
                    <Heart
                      className={cn(isProductInWishlist && 'fill-current')}
                    />
                    {isProductInWishlist ? 'Favorito' : 'Favoritar'}
                  </Button>

                  <Button
                    variant="outline"
                    disabled={isProductInCart}
                    onClick={(event) => {
                      event.preventDefault()
                      addToCart(data)
                    }}
                    size="sm"
                    className="w-full"
                  >
                    <ShoppingCart />
                    {isProductInCart ? 'No carrinho' : 'Adicionar'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {gridView === 'columns2' && (
          <Card className="relative w-full cursor-pointer gap-0 space-y-3 rounded-none border-none py-0 shadow-none">
            <CardContent
              onClick={handleOpenDialog}
              className="group dark:bg-muted-foreground/10 relative h-[18rem] w-full cursor-pointer bg-neutral-100 p-0 dark:border"
            >
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
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start justify-between gap-3 px-0">
              <div className="space-y-0.5">
                <h3 className="text-base font-medium">{name}</h3>
                <span className="text-muted-foreground text-sm font-medium">
                  {formatPrice(price)}
                </span>
              </div>
              <div className="h-20 w-full">
                <p className="text-muted-foreground line-clamp-4 text-sm font-medium">
                  {description}
                </p>
              </div>

              <Button
                variant="outline"
                disabled={isProductInCart || !isProductIsAvailable}
                onClick={(event) => {
                  event.preventDefault()
                  addToCart(data)
                }}
                className="w-full"
              >
                <ShoppingCart />
                {isProductInCart
                  ? 'Produto adicionado ao carrinho'
                  : 'Adicionar ao carrinho'}
              </Button>
            </CardFooter>
          </Card>
        )}

        {gridView === 'rows2' && (
          <Card className="relative w-full cursor-pointer gap-2 space-y-3 rounded-none border-none py-0 shadow-none">
            <CardContent className="flex flex-row px-0">
              <div
                onClick={handleOpenDialog}
                className="group dark:bg-muted-foreground/10 relative h-[18rem] w-1/2 cursor-pointer bg-neutral-100 p-0 dark:border"
              >
                <div className="relative h-full w-full">
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
                </div>
              </div>

              <div className="flex w-1/2 flex-col justify-between px-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-base font-medium">{name}</h3>
                    <span className="text-muted-foreground text-sm font-medium">
                      {formatPrice(price)}
                    </span>
                  </div>
                  <p className="text-muted-foreground line-clamp-6 text-sm font-medium">
                    {description}
                  </p>
                </div>

                <div className="mt-1 flex flex-col gap-2">
                  <Button
                    variant="secondary"
                    disabled={isProductInWishlist}
                    onClick={(event) => {
                      event.preventDefault()
                      addToWishlist({ product: data })
                    }}
                    size="sm"
                    className="w-full"
                  >
                    <Heart
                      className={cn(isProductInWishlist && 'fill-current')}
                    />
                    {isProductInWishlist ? 'Favorito' : 'Favoritar'}
                  </Button>

                  <Button
                    variant="outline"
                    disabled={isProductInCart}
                    onClick={(event) => {
                      event.preventDefault()
                      addToCart(data)
                    }}
                    size="sm"
                    className="w-full"
                  >
                    <ShoppingCart />
                    {isProductInCart ? 'No carrinho' : 'Adicionar'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
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
              <ScrollArea className="h-96">
                <DialogDescription className="text-muted-foreground text-base">
                  {description}
                </DialogDescription>
              </ScrollArea>
            </DialogHeader>
            <Separator />

            <div className="flex justify-between gap-4">
              <Button className="flex-1">Comprar agora</Button>
              <Button
                disabled={isProductInWishlist}
                onClick={(event) => {
                  event.preventDefault()
                  addToWishlist({ product: data })
                }}
                variant="outline"
              >
                <Heart className={cn(isProductInWishlist && 'fill-current')} />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
