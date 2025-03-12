import { Columns2, Grid2x2, Grid3x3, Rows2 } from 'lucide-react'
import Image from 'next/image'

import filter from '@/assets/filter.svg'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

import { ProductCard } from '../components/product-card'
import { Filter } from './components/filter'

export default function CategoryPage() {
  return (
    <>
      <section className="relative h-96 bg-muted-foreground/10">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <h1 className="text-4xl font-medium">Shop Page</h1>
          <p className="text-base text-muted-foreground">
            Let’s design the place you always imagined.
          </p>
        </div>
      </section>

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Shop</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section className="grid grid-cols-4 gap-10">
        <div className="col-span-1 space-y-10">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <Image
              src={filter}
              width={24}
              height={24}
              className="h-[1.5rem] w-[1.5rem] dark:invert"
              alt="Filter icon"
            />
            Filter
          </h2>

          <Filter />
        </div>
        <div className="col-span-3 space-y-10">
          <div>
            <h2 className="text-xl font-semibold">Living Room</h2>

            <div className="flex items-center justify-end">
              <ToggleGroup type="single">
                <ToggleGroupItem value="bold" aria-label="Toggle bold">
                  <Grid3x3 className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Toggle italic">
                  <Grid2x2 className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="strikethrough"
                  aria-label="Toggle strikethrough"
                >
                  <Columns2 className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="strikethrough"
                  aria-label="Toggle strikethrough"
                >
                  <Rows2 className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>

          <div className="grid grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => {
              return (
                <div className="pb-6" key={index}>
                  <ProductCard />
                </div>
              )
            })}
          </div>

          <div className="flex justify-center">
            <Button size="lg">Show more</Button>
          </div>
        </div>
      </section>
    </>
  )
}
