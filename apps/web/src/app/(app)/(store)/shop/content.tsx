'use client'

import { Columns2, Grid2x2, Grid3x3, LoaderCircle, Rows2 } from 'lucide-react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Fragment, useState } from 'react'

import filter from '@/assets/icon/filter.svg'
import { ProductCardSkeleton } from '@/components/skeletons/product-card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useGetCategory } from '@/hooks/query/category/get-by-id'
import { useGetInfiniteProducts } from '@/hooks/query/product/get-infinity'
import { cn } from '@/lib/utils'

import { Filter } from './filter'
import { ProductCard } from './product-card'

export type GridView = 'grid3x3' | 'grid2x2' | 'columns2' | 'rows2'

export function Content() {
  const searchParams = useSearchParams()

  const { categoryId, minPrice, maxPrice } = {
    categoryId: searchParams.get('category'),
    minPrice: searchParams.get('minPrice'),
    maxPrice: searchParams.get('maxPrice'),
  }

  const [gridView, setGridView] = useState<GridView>('grid3x3')

  const {
    data: products,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching: isFetchingProducts,
  } = useGetInfiniteProducts({
    categoryId,
    minPrice,
    maxPrice,
  })

  const { data: category, isLoading: isLoadingCategory } = useGetCategory({
    category: { id: categoryId! },
  })

  const isFetching = isFetchingProducts || isLoadingCategory

  function handleLoadMore() {
    if (hasNextPage && !isFetching) {
      fetchNextPage()
    }
  }

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
          Filtros
        </h2>

        <Filter />
      </div>
      <div className="col-span-3 space-y-8">
        <Fragment>
          {isFetching && <Skeleton className="h-5 w-56" />}

          <h2 className="text-xl font-semibold">
            {(!isFetching && category?.name) ?? 'Todos os produtos'}
          </h2>

          <div className="flex items-center justify-end">
            <ToggleGroup
              type="single"
              defaultValue="grid3x3"
              onValueChange={(value) => {
                setGridView(value as GridView)
              }}
            >
              <ToggleGroupItem value="grid3x3" aria-label="Grid 3x3">
                <Grid3x3 className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="grid2x2" aria-label="Grid 2x2">
                <Grid2x2 className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="columns2" aria-label="Columns 2">
                <Columns2 className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="rows2" aria-label="Rows 2">
                <Rows2 className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </Fragment>

        <ScrollArea className="h-[calc(100vh-10rem)]">
          <div
            className={cn('grid px-4', {
              'grid-cols-3 gap-4': gridView === 'grid3x3',
              'grid-cols-2 gap-4': gridView === 'grid2x2',
              'grid-cols-2 gap-[1rem]': gridView === 'columns2',
              'grid-cols-1 gap-4': gridView === 'rows2',
            })}
          >
            {!isFetching &&
              products?.map((product) => {
                const { id } = product

                return (
                  <ProductCard key={id} data={product} gridView={gridView} />
                )
              })}

            {isFetching &&
              products?.map(({ id }) => <ProductCardSkeleton key={id} />)}

            {!isFetching && products?.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <p className="text-muted-foreground mb-2 text-lg">
                  Nenhum produto encontrado
                </p>
                <p className="text-muted-foreground text-sm">
                  Tente mudar os filtros ou buscar por outra categoria
                </p>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="flex justify-center">
          <Button
            size="lg"
            variant="outline"
            onClick={handleLoadMore}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage && (
              <>
                Carregando...
                <LoaderCircle size={18} className="ml-2 animate-spin" />
              </>
            )}

            {!isFetchingNextPage && hasNextPage && 'Carregar mais'}

            {!hasNextPage && 'Sem mais produtos'}
          </Button>
        </div>
      </div>
    </section>
  )
}
