'use client'

import { ArrowUp, Gamepad2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useRef, useState } from 'react'

import entrega from '@/assets/homepage/delivery.svg'
import mulher from '@/assets/homepage/mulher.png'
import perfume from '@/assets/homepage/perfume.png'
import ps5slim from '@/assets/homepage/ps5slim.png'
import speakers from '@/assets/homepage/speakers.png'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useInfiniteScrollObserver } from '@/hooks/use-infinite-scroll-observer'

import { useGetCategories } from '../hooks/use-get-category'
import { useGetProducts } from '../panel/product/hooks/use-get-products'
import { BannerCarousel } from './components/banner-carousel'
import { CategoryCard } from './components/category-card'
import { CarouselControls } from './components/controls-carousel'
import { ProductCard } from './components/product-card'
import { ProductCardSkeleton } from './components/product-card/skeleton'
// import { ProductCard } from './components/product-card'
// import { ProductCardSkeleton } from './components/product-card/skeleton'

export function Content() {
  const [apiBestSelling, setApiBestSelling] = useState<CarouselApi>()
  // const [apiCarrousel, setApiCarrousel] = useState<CarouselApi>()
  const [apiCategory, setApiCategory] = useState<CarouselApi>()
  const loadMoreRef = useRef<HTMLDivElement>(null)

  const {
    data: categories,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingCategory,
  } = useGetCategories()

  useInfiniteScrollObserver({
    targetRef: loadMoreRef,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isActive: true,
  })

  const { data: products, isLoading: isLoadingProducts } = useGetProducts({
    page: 1,
    perPage: 10,
  })

  return (
    <>
      <BannerCarousel />

      <section className="space-y-12">
        <div className="flex justify-between">
          <span className="text-primary text-3xl font-medium">
            New
            <br />
            Arrivals
          </span>
          <CarouselControls api={apiBestSelling} />
        </div>

        <Carousel
          opts={{
            align: 'start',
          }}
          setApi={setApiBestSelling}
          className="w-full"
        >
          <CarouselContent>
            {products?.data.map((product) => {
              const { id } = product

              return (
                <CarouselItem key={id} className="basis-1/4">
                  <ProductCard data={product} />
                </CarouselItem>
              )
            })}

            {isLoadingProducts &&
              Array.from({ length: 4 }).map((_, index) => {
                return (
                  <CarouselItem key={index} className="basis-1/4">
                    <ProductCardSkeleton />
                  </CarouselItem>
                )
              })}
          </CarouselContent>
        </Carousel>

        <div className="flex justify-center">
          <Link href="/shop">
            <Button size="lg">Ver todos os produtos</Button>
          </Link>
        </div>
      </section>

      <Separator />

      <section className="space-y-12">
        <div className="flex justify-between">
          <span className="text-primary text-3xl font-medium">Categorias</span>

          <CarouselControls api={apiCategory} />
        </div>

        <div className="flex gap-6">
          <Carousel
            opts={{
              align: 'start',
            }}
            setApi={setApiCategory}
            className="w-full"
          >
            <CarouselContent>
              {categories?.map((category, index) => {
                const { id } = category

                return (
                  <Fragment key={id}>
                    <CarouselItem key={id} className="basis-1/6">
                      <CategoryCard
                        {...category}
                        icon={
                          <Gamepad2
                            width={56}
                            height={56}
                            strokeWidth={1}
                            className="group-hover:text-primary dark:group-hover:text-primary"
                          />
                        }
                        href={`/shop?category=${id}`}
                      />
                    </CarouselItem>

                    {index === categories.length - 1 && (
                      <div ref={loadMoreRef} className="h-1" />
                    )}
                  </Fragment>
                )
              })}

              {isLoadingCategory && (
                <div className="grid grid-cols-6 gap-5">
                  {Array.from({ length: 6 }).map((_, index) => {
                    return (
                      <div key={index} className="col-span-1 grid">
                        <Skeleton className="h-[9.063rem] w-[10.625rem]" />
                      </div>
                    )
                  })}
                </div>
              )}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      <Separator />

      <div>BANNER</div>

      <section className="space-y-12">
        <div className="flex justify-between">
          <span className="text-primary text-3xl font-medium">
            New
            <br />
            Arrivals
          </span>
          {/* <CarouselControls api={apiCarrousel} /> */}
        </div>

        {/* <Carousel
          opts={{
            align: 'start',
          }}
          setApi={setApiCarrousel}
          className="w-full"
        >
          <CarouselContent>
            {products?.data.map((product) => {
              const { id } = product

              return (
                <CarouselItem key={id} className="basis-1/4">
                  <ProductCard data={product} />
                </CarouselItem>
              )
            })}

            {isLoadingProducts &&
              Array.from({ length: 4 }).map((_, index) => {
                return (
                  <CarouselItem key={index} className="basis-1/4">
                    <ProductCardSkeleton />
                  </CarouselItem>
                )
              })}
          </CarouselContent>
        </Carousel> */}

        <div className="flex justify-center">
          <Link href="/shop">
            <Button size="lg">Ver todos os produtos</Button>
          </Link>
        </div>
      </section>

      <section className="space-y-12">
        <div className="grid grid-cols-4 grid-rows-2 gap-6 text-white">
          <div className="col relative col-span-2 row-span-2 flex justify-center bg-black">
            <Image
              src={ps5slim}
              alt="Product"
              className="h-auto w-auto object-cover"
            />
            <div className="absolute bottom-3 flex w-full flex-col space-y-1 px-6">
              <span className="font-inter text-2xl font-semibold">
                PlayStation 5
              </span>
              <p className="text-sm font-medium">
                Versões Preto e Branco do PS5 <br /> chegando agora para venda!
              </p>

              <div className="mr-auto">
                <Button variant="link" className="px-0 text-white">
                  Compre Agora
                </Button>
              </div>
            </div>
          </div>

          <div className="relative col-span-2 flex justify-end bg-black">
            <div className="absolute bottom-3 left-0 flex flex-col space-y-2 px-6">
              <span className="font-inter text-2xl font-semibold">
                Coleção Feminina
              </span>

              <p className="text-sm font-medium">
                Destaques da coleção feminina que <br /> te darão outra vibe.
              </p>

              <div className="mr-auto">
                <Button variant="link" className="px-0 text-white">
                  Compre Agora
                </Button>
              </div>
            </div>
            <Image
              src={mulher}
              alt="Product"
              width={400}
              height={400}
              className="h-auto w-auto"
            />
          </div>

          <div className="relative col-span-1 flex items-center justify-center bg-black">
            <div className="absolute bottom-3 left-0 flex flex-col px-6">
              <span className="font-inter text-2xl font-semibold">
                Speakers
              </span>

              <p className="text-sm font-medium">Speakers sem fio da Amazon.</p>

              <div className="mr-auto">
                <Button variant="link" className="px-0 text-white">
                  Compre Agora
                </Button>
              </div>
            </div>
            <Image
              src={speakers}
              alt="Product"
              width={200}
              height={200}
              className="h-auto w-auto"
            />
          </div>

          <div className="relative col-span-1 flex items-center justify-center bg-black">
            <div className="absolute bottom-3 left-0 flex flex-col px-6">
              <span className="font-inter text-2xl font-semibold">
                Fragrâncias
              </span>

              <p className="text-sm font-medium">GUCCI INTENSE OUD EDP</p>

              <div className="mr-auto">
                <Button variant="link" className="px-0 text-white">
                  Compre Agora
                </Button>
              </div>
            </div>
            <Image
              src={perfume}
              alt="Product"
              width={200}
              height={200}
              className="h-auto w-auto"
            />
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1 flex flex-col items-center justify-center gap-2">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-400">
              <Image
                src={entrega}
                alt="Vantages"
                width={60}
                height={60}
                className="m-3 rounded-full bg-black p-3"
              />
            </div>
            <div className="space-y-2 text-center">
              <p className="text-xl font-semibold">ENTREGA RÁPIDA E GRATUITA</p>
              <p className="text-base font-medium">
                Frete grátis para todas as compras acima de R$200!
              </p>
            </div>
          </div>
          <div className="col-span-1 flex flex-col items-center justify-center gap-2">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-400">
              <Image
                src={entrega}
                alt="Vantages"
                width={60}
                height={60}
                className="m-3 rounded-full bg-black p-3"
              />
            </div>
            <div className="space-y-2 text-center">
              <p className="text-xl font-semibold">ENTREGA RÁPIDA E GRATUITA</p>
              <p className="text-base font-medium">
                Frete grátis para todas as compras acima de R$200!
              </p>
            </div>
          </div>
          <div className="col-span-1 flex flex-col items-center justify-center gap-2">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-400">
              <Image
                src={entrega}
                alt="Vantages"
                width={60}
                height={60}
                className="m-3 rounded-full bg-black p-3"
              />
            </div>
            <div className="space-y-2 text-center">
              <p className="text-xl font-semibold">ENTREGA RÁPIDA E GRATUITA</p>
              <p className="text-base font-medium">
                Frete grátis para todas as compras acima de R$200!
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="ml-auto">
        <Button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          size="icon"
          variant="default"
        >
          <ArrowUp className="h-[1.5rem] w-[1.5rem]" />
        </Button>
      </div>
    </>
  )
}
