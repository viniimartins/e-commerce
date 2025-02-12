'use client'

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
import { SectionHeader } from './components/section-header'
import Sidebar from './components/sidebar'

export function Content() {
  const [api, setApi] = useState<CarouselApi>()
  const [apiCategory, setApiCategory] = useState<CarouselApi>()

  return (
    <>
      <section className="grid grid-cols-[14rem_auto]">
        <div className="w-56">
          <Sidebar />
        </div>

        <div className="flex h-full w-full max-w-[50.75rem] items-center justify-center p-10">
          <BannerCarousel />
        </div>
      </section>

      <section className="space-y-12">
        <div className="flex justify-between">
          <SectionHeader title="This Month" subtitle="Best Selling Products" />

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
                  <ProductCard />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <div className="flex justify-center">
          <Button variant="destructive" size="lg">
            View All Products
          </Button>
        </div>
      </section>

      <Separator />

      <section className="space-y-12">
        <div className="flex justify-between">
          <SectionHeader title="Categories" subtitle="Browse By Category" />

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
    </>
  )
}
