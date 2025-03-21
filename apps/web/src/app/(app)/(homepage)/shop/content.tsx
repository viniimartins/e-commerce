'use client'

import { Columns2, Grid2x2, Grid3x3, Rows2 } from 'lucide-react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

import filter from '@/assets/filter.svg'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

import { useGetProducts } from '../../hooks/use-get-products'
import { ProductCard } from '../components/product-card'
import { ProductCardSkeleton } from '../components/product-card/skeleton'
import { Filter } from './components/filter'
import { useGetCategory } from './hooks/use-get-category'

export function Content() {
  const searchParams = useSearchParams()
  const categoryActiveId = searchParams.get('category')

  const { data: products, isLoading: isLoadingProducts } = useGetProducts({
    page: 1,
    perPage: 15,
    categoryId: categoryActiveId,
  })

  const { data: category, isLoading: isLoadingCategory } = useGetCategory({
    category: { id: categoryActiveId! },
  })

  const isLoading = isLoadingProducts || isLoadingCategory

  return (
    <section className="grid grid-cols-4 gap-8">
      <div className="col-span-1 space-y-8">
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
      <div className="col-span-3 space-y-8">
        <div>
          {isLoading && <Skeleton className="h-5 w-56" />}

          <h2 className="text-xl font-semibold">
            {(!isLoading && category?.name) ?? 'All'}
          </h2>

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

        <div className="grid grid-cols-3 gap-4">
          {products?.data.map((product) => {
            const { id } = product

            return <ProductCard key={id} data={product} />
          })}

          {isLoading &&
            Array.from({ length: 12 }).map((_, index) => {
              return <ProductCardSkeleton key={index} />
            })}
        </div>

        <div className="flex justify-center">
          <Button size="lg">Show more</Button>
        </div>
      </div>
    </section>
  )
}
