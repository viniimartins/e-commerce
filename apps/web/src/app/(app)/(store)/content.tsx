'use client'

import { ArrowRight, ArrowUp } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import bedroom from '@/assets/homepage/bedroom.png'
import kitchen from '@/assets/homepage/kitchen.png'
import livingRoom from '@/assets/homepage/living-room.png'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { Separator } from '@/components/ui/separator'
import { useGetProducts } from '@/hooks/query/product/get'

import { BannerCarousel } from './_components/banner-carousel'
import { CarouselControls } from './_components/controls-carousel'
import { ProductCard } from './_components/product-card'
import { ProductCardSkeleton } from './_components/product-card/skeleton'

export function Content() {
  const [apiBestSelling, setApiBestSelling] = useState<CarouselApi>()

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
        <div className="grid grid-cols-2 gap-4">
          <div className="dark:bg-muted-foreground/10 col-span-1 flex h-[35rem] w-full flex-col border bg-neutral-100 p-8 dark:border">
            <div className="z-20 flex flex-col gap-4">
              <div className="flex flex-col items-start justify-start gap-2">
                <span className="text-2xl font-medium">Living Room</span>
                <Link href="/shop">
                  <button className="group border-primary hover:border-primary/90 flex cursor-pointer items-center gap-2 border-b py-2 text-sm">
                    Comprar agora
                    <ArrowRight className="size-4 transition-all group-hover:translate-x-1" />
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex flex-1 items-center justify-center">
              <Image
                src={livingRoom}
                alt="Living Room"
                width={350}
                height={300}
                quality={100}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
          <div className="col-span-1 flex flex-col gap-4">
            <div className="dark:bg-muted-foreground/10 flex h-[17rem] w-full justify-between border bg-neutral-100 p-8 dark:border">
              <div className="z-20 flex flex-col justify-end gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-2xl font-medium">Kitchen</span>
                  <Link href="/shop">
                    <button className="group border-primary hover:border-primary/90 flex cursor-pointer items-center gap-2 border-b py-2 text-sm">
                      Comprar agora
                      <ArrowRight className="size-4 transition-all group-hover:translate-x-1" />
                    </button>
                  </Link>
                </div>
              </div>
              <div className="flex w-full flex-1 items-end justify-center pl-20">
                <Image
                  src={kitchen}
                  alt="Kitchen"
                  width={200}
                  height={200}
                  quality={100}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
            <div className="dark:bg-muted-foreground/10 flex h-[17rem] w-full justify-between border bg-neutral-100 p-8 dark:border">
              <div className="z-20 flex flex-col justify-end gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-2xl font-medium">Bedroom</span>
                  <Link href="/shop">
                    <button className="group border-primary hover:border-primary/90 flex cursor-pointer items-center gap-2 border-b py-2 text-sm">
                      Comprar agora
                      <ArrowRight className="size-4 transition-all group-hover:translate-x-1" />
                    </button>
                  </Link>
                </div>
              </div>
              <div className="flex w-full flex-1 items-end justify-center pl-15">
                <Image
                  src={bedroom}
                  alt="Bedroom"
                  width={170}
                  height={150}
                  quality={100}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
          </div>
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
