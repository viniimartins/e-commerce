'use client'

import { Heart, RotateCcw, Truck } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'

import { useGetProducts } from '@/app/(app)/hooks/use-get-products'
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
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/providers/cart-provider'
import { formatPrice } from '@/utils/formatPrice'

import Counter from '../../components/counter'
import { ProductCard } from '../../components/product-card'
import { ProductCardSkeleton } from '../../components/product-card/skeleton'
import { useAddToWishlist } from '../../wishlist/hooks/use-add-to-wishlist'
import { useGetProduct } from './hooks/use-get-product'

export function Content() {
  const { productId } = useParams<{ productId: string }>()

  const { data: product } = useGetProduct({
    product: { id: productId },
  })

  const { data: products, isLoading: isLoadingProducts } = useGetProducts({
    categoryId: product?.category.id,
    perPage: 4,
    page: 1,
  })

  const { mutate: addToWishlist } = useAddToWishlist({
    queryKey: ['get-wishlist'],
  })

  const { addToCart } = useCart()

  const isInStock = product?.quantity && product.quantity > 0
  const stockText = isInStock ? 'Em estoque' : 'Sem estoque'

  return (
    <>
      <section className="flex grid-cols-5 gap-8">
        <div className="col-span-3 flex gap-4">
          <div className="flex flex-col gap-4">
            {!product &&
              Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="dark:bg-muted-foreground/10 relative flex w-44 flex-1 items-center justify-center bg-neutral-100 p-0 dark:border"
                />
              ))}

            {product?.productImage.slice(1).map((image) => {
              const { id, url } = image

              return (
                <div
                  key={id}
                  className="dark:bg-muted-foreground/10 relative flex w-44 flex-1 items-center justify-center bg-neutral-100 p-0 dark:border"
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
          <div className="dark:bg-muted-foreground/10 flex h-[35.5rem] w-[31.5rem] items-center justify-center bg-neutral-100 p-0 dark:border">
            {product?.productImage && (
              <Dialog>
                <DialogTrigger className="relative h-full w-full hover:cursor-pointer">
                  <Image
                    src={product?.productImage[0].url}
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
                      src={product?.productImage[0].url}
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

              <Badge variant={isInStock ? 'secondary' : 'destructive'}>
                {stockText}
              </Badge>
            </div>

            <p className="text-muted-foreground line-clamp-9 overflow-auto pr-2 text-base">
              {product?.description}
            </p>
          </div>
          <Separator />

          <div className="flex justify-between gap-4">
            <Counter />
            <Button
              className="flex-1"
              onClick={() => product && addToCart(product)}
            >
              Adicionar ao carrinho
            </Button>
            <Button
              onClick={() =>
                product && addToWishlist({ product: { id: product.id } })
              }
            >
              <Heart />
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
        <span className="text-primary text-3xl font-medium">
          Mais de {product?.category.name}
        </span>

        <div className="grid grid-cols-4 gap-4">
          {products?.data.map((product) => {
            const { id } = product

            return <ProductCard key={id} data={product} />
          })}

          {isLoadingProducts &&
            Array.from({ length: 4 }).map((_, index) => {
              return <ProductCardSkeleton key={index} />
            })}
        </div>
      </section>
    </>
  )
}
