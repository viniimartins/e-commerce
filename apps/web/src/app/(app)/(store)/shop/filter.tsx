'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Fragment, useRef, useState } from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetInfiniteCategories } from '@/hooks/query/category/get-infinite'
import { useInfiniteScrollObserver } from '@/hooks/use-infinite-scroll-observer'
import { type PriceOption, priceOptions } from '@/shared/price-options'

type HandleSelectCheckbox = Omit<PriceOption, 'label'>

type HandlePriceFilter = Omit<PriceOption, 'label' | 'id'>

export function Filter() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const categoryActiveId = searchParams.get('category')

  const loadMoreRef = useRef<HTMLDivElement>(null)

  const [selectedCheckBoxId, setSelectedCheckBoxId] = useState<
    PriceOption['id'] | null
  >()

  const params = new URLSearchParams(searchParams.toString())

  const {
    data: categories,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching: isFetchingCategories,
  } = useGetInfiniteCategories()

  useInfiniteScrollObserver({
    targetRef: loadMoreRef,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isActive: true,
  })

  const handlePriceFilterChange = ({ min, max }: HandlePriceFilter) => {
    if (min !== undefined) {
      params.set('minPrice', min.toString())
    } else {
      params.delete('minPrice')
    }

    if (max !== undefined) {
      params.set('maxPrice', max.toString())
    } else {
      params.delete('maxPrice')
    }

    router.push(`?${params.toString()}`, { scroll: false })
  }

  const handleSelectCheckbox = ({ id, min, max }: HandleSelectCheckbox) => {
    if (selectedCheckBoxId === id) {
      setSelectedCheckBoxId(null)
      handlePriceFilterChange({ min: 0, max: 0 })
      return
    }

    setSelectedCheckBoxId(id)
    handlePriceFilterChange({ min, max })
  }

  const handleCategoryClick = (id?: string) => {
    if (!id) {
      params.delete('category')
    }

    if (id) {
      params.set('category', id)
    }

    router.push(`?${params.toString()}`, { scroll: false })
  }

  return (
    <aside className="space-y-10">
      <div className="flex flex-col gap-2">
        <span className="text-xl font-semibold">Categorias</span>

        <ScrollArea className="h-56">
          <div className="flex flex-col items-start gap-2">
            <span
              data-active={!categoryActiveId}
              onClick={() => handleCategoryClick()}
              className="text-muted-foreground data-[active=true]:text-foreground hover:text-foreground text-sm font-medium hover:cursor-pointer hover:underline"
            >
              Todas categorias
            </span>

            {!isFetchingCategories &&
              categories?.map((category, index) => {
                const { id, name } = category

                const lastIndex = index === categories.length - 1

                return (
                  <Fragment key={id}>
                    <span
                      data-active={categoryActiveId === id}
                      onClick={() => handleCategoryClick(id)}
                      className="text-muted-foreground data-[active=true]:text-foreground hover:text-foreground text-sm font-medium hover:cursor-pointer hover:underline"
                    >
                      {name}
                    </span>

                    {lastIndex && (
                      <div ref={loadMoreRef} className="h-1 w-full" />
                    )}
                  </Fragment>
                )
              })}

            {isFetchingCategories &&
              categories?.map(({ id }) => (
                <Skeleton key={id} className="h-4 w-full" />
              ))}
          </div>
        </ScrollArea>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xl font-semibold">Preço</span>

        <div className="flex flex-col items-start gap-2">
          {priceOptions.map(({ id, label, min, max }) => (
            <div key={id} className="flex w-full items-center justify-between">
              <label
                htmlFor={id}
                className="text-muted-foreground text-sm font-medium"
              >
                {label}
              </label>
              <Checkbox
                id={id}
                checked={selectedCheckBoxId === id}
                onCheckedChange={() => handleSelectCheckbox({ id, min, max })}
              />
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
