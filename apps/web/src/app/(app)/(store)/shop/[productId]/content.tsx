'use client'

import { Heart, RotateCcw, Truck } from 'lucide-react'
import Image from 'next/image'

import type { IProduct } from '@/app/(app)/types'
import Counter from '@/components/counter'
import { ProductCardSkeleton } from '@/components/skeletons/product-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useRemoveFromWishlist } from '@/hooks/mutation/wishlist/remove'
import { useAddToWishlist } from '@/hooks/mutation/wishlist/to-add'
import { useGetProducts } from '@/hooks/query/product/get'
import { useGetWishlist } from '@/hooks/query/wishlist/get'
import { cn } from '@/lib/utils'
import { useCart } from '@/providers/cart-provider'
import { formatPrice } from '@/utils/formatPrice'

import { ProductCard } from '../product-card'

interface Props {
  product: IProduct
}

export function Content({ product }: Props) {
  const { cart, addToCart, incrementCartQuantity, decrementCartQuantity } =
    useCart()

  const { data: products, isFetching: isFetchingProducts } = useGetProducts({
    categoryId: product?.category.id,
    perPage: 4,
    page: 1,
  })

  const { data: wishlist } = useGetWishlist({ params: {} })

  const { mutate: addToWishlist } = useAddToWishlist({
    queryKey: ['get-wishlist'],
  })

  const { mutate: removeFromWishlist } = useRemoveFromWishlist({
    queryKey: ['get-wishlist'],
  })

  const isProductIsAvailable = product.quantity > 0
  const stockText = isProductIsAvailable ? 'Em estoque' : 'Sem estoque'
  const productInCart = cart.find((item) => item.id === product?.id)
  const isProductInCart = cart.some((item) => item.id === product?.id)

  const isProductInWishlist = wishlist?.data.some(
    (item) => item.productId === product?.id,
  )

  const productsWithoutCurrent = products?.data.filter(
    (productItem) => productItem.id !== product?.id,
  )

  function handleChangeWishlist(product: IProduct) {
    if (isProductInWishlist) {
      removeFromWishlist({ product: { id: product.id } })
    }

    if (!isProductInWishlist) {
      addToWishlist({ product: { id: product.id } })
    }
  }

  return (
    <>
      <section className="flex grid-cols-5 gap-8">
        <div className="col-span-3 flex gap-4">
          <div className="flex flex-col gap-4">
            {product?.productImage.slice(1).map(({ image }) => {
              const { id, url } = image

              return (
                <div
                  key={id}
                  className="dark:bg-muted-foreground/10 relative flex w-44 flex-1 items-center justify-center border bg-neutral-100 p-0"
                >
                  <Dialog>
                    <DialogTrigger className="relative h-full w-full hover:cursor-pointer">
                      <Image
                        src={url}
                        alt={'Product Image'}
                        fill
                        quality={100}
                        priority
                        className="object-cover p-2"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </DialogTrigger>
                    <DialogContent className="max-h-[70vh]! w-[50vw]! max-w-[55vw]! p-0">
                      <DialogHeader className="hidden">
                        <DialogTitle className="hidden" />
                        <DialogDescription className="hidden" />
                      </DialogHeader>
                      <div className="relative h-[40rem] w-full">
                        <Image
                          src={url}
                          alt={'Product Image'}
                          fill
                          quality={100}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              )
            })}
          </div>
          <div className="dark:bg-muted-foreground/10 flex h-[39rem] w-[31.5rem] items-center justify-center border bg-neutral-100 p-0">
            {product?.productImage && (
              <Dialog>
                <DialogTrigger className="relative h-full w-full hover:cursor-pointer">
                  <Image
                    src={product?.productImage[0].image.url}
                    alt="Controls"
                    fill
                    quality={100}
                    priority
                    className="object-cover p-2"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </DialogTrigger>
                <DialogContent className="max-h-[70vh]! w-[50vw]! max-w-[55vw]! p-0">
                  <DialogHeader className="hidden">
                    <DialogTitle className="hidden" />
                    <DialogDescription className="hidden" />
                  </DialogHeader>
                  <div className="relative h-[40rem] w-full">
                    <Image
                      src={product?.productImage[0].image.url}
                      alt={product.name}
                      fill
                      quality={100}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        <div className="col-span-2 flex flex-col gap-6">
          <div className="flex flex-1 flex-col gap-3">
            <div className="text-2xl font-bold">{product?.name}</div>
            <div className="flex items-center justify-between">
              <span className="text-xl font-medium">
                {formatPrice(product?.price ?? 0)}
              </span>

              <Badge
                variant={isProductIsAvailable ? 'secondary' : 'destructive'}
              >
                {stockText}
              </Badge>
            </div>

            <ScrollArea className="h-56">
              <p className="text-muted-foreground pr-2 text-base">
                {product?.description}
              </p>
            </ScrollArea>
          </div>
          <Separator />

          <div className="flex justify-between gap-4">
            {product && (
              <Counter
                value={productInCart?.cartQuantity ?? 0}
                disabled={!isProductInCart || !isProductIsAvailable}
                increment={() => incrementCartQuantity(product.id)}
                decrement={() => decrementCartQuantity(product.id)}
              />
            )}

            {isProductIsAvailable && (
              <Button
                className="flex-1"
                onClick={() => product && addToCart(product)}
                disabled={isProductInCart}
              >
                {isProductInCart
                  ? 'Produto no carrinho'
                  : 'Adicionar ao carrinho'}
              </Button>
            )}

            {!isProductIsAvailable && (
              <Button variant="destructive" disabled className="flex-1">
                Sem estoque
              </Button>
            )}

            <Button onClick={() => product && handleChangeWishlist(product)}>
              <Heart
                className={cn(
                  'h-[1.2rem] w-[1.2rem] transition-all',
                  isProductInWishlist && 'fill-current',
                )}
              />
            </Button>
          </div>

          <div className="border">
            <div className="flex gap-4 border-b p-4">
              <div className="flex items-center justify-center">
                <Truck className="h-[1.5rem] w-[1.5rem] transition-all" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-base">Entrega grátis</span>
                <span className="text-sm underline">
                  Insira seu código postal para disponibilidade de entrega
                </span>
              </div>
            </div>
            <div className="flex gap-4 p-4">
              <div className="flex items-center justify-center">
                <RotateCcw className="h-[1.5rem] w-[1.5rem] transition-all" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-base">Entrega de devolução</span>
                <span className="text-sm">
                  Devoluções com entrega gratuita em 30 dias.{' '}
                  <span className="underline">Detalhes</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator className="my-10" />

      <section className="flex flex-col gap-12">
        {productsWithoutCurrent && productsWithoutCurrent.length > 0 && (
          <span className="text-primary text-3xl font-medium">
            Mais de {product?.category.name}
          </span>
        )}

        <div className="grid grid-cols-4 gap-4">
          {!isFetchingProducts &&
            productsWithoutCurrent?.map((product) => {
              const { id } = product

              return <ProductCard key={id} data={product} />
            })}

          {isFetchingProducts &&
            products?.data.map((_, index) => {
              return <ProductCardSkeleton key={index} />
            })}
        </div>
      </section>
    </>
  )
}
