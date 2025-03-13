'use client'

import { ArrowUp } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { Separator } from '@/components/ui/separator'

import { BannerCarousel } from './components/banner-carousel'
import { CategoryCard } from './components/category-card'
import { CarouselControls } from './components/controls-carousel'
import { ProductCard } from './components/product-card'

export function Content() {
  const [apiBestSelling, setApiBestSelling] = useState<CarouselApi>()
  const [api, setApi] = useState<CarouselApi>()
  const [apiCategory, setApiCategory] = useState<CarouselApi>()

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
            {Array.from({ length: 50 }).map((_, index) => (
              <CarouselItem key={index} className="basis-1/4">
                <ProductCard />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="flex justify-center">
          <Link href="/shop">
            <Button size="lg">View All Products</Button>
          </Link>
        </div>
      </section>

      <Separator />

      <section className="space-y-12">
        <div className="flex justify-between">
          <span className="text-primary text-3xl font-medium">Category</span>

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
              {Array.from({ length: 50 }).map((_, index) => (
                <CarouselItem key={index} className="basis-1/6">
                  <CategoryCard />
                </CarouselItem>
              ))}
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
          <CarouselControls api={api} />
        </div>

        <div className="flex gap-6">
          <Carousel
            opts={{
              align: 'start',
            }}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent>
              {Array.from({ length: 50 }).map((_, index) => (
                <CarouselItem key={index} className="basis-1/4">
                  <div className="flex flex-col gap-4">
                    <ProductCard />
                    <ProductCard />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <div className="flex justify-center">
          <Link href="/shop">
            <Button size="lg">View All Products</Button>
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
