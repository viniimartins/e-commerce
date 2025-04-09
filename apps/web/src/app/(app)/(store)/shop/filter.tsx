'use client'

import Link from 'next/link'
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

  const {
    data: categories,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetInfiniteCategories()

  useInfiniteScrollObserver({
    targetRef: loadMoreRef,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isActive: true,
  })

  const handlePriceFilterChange = ({ min, max }: HandlePriceFilter) => {
    const params = new URLSearchParams(searchParams.toString())

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

  return (
    <aside className="space-y-10">
      <div className="flex flex-col gap-2">
        <span className="text-xl font-semibold">Categorias</span>

        <ScrollArea className="h-56">
          <div className="flex flex-col items-start gap-2">
            <a
              data-active={!categoryActiveId}
              href="/shop"
              className="text-muted-foreground data-[active=true]:text-foreground hover:text-foreground text-sm font-medium hover:cursor-pointer hover:underline"
            >
              Todas categorias
            </a>

            {categories?.map((category, index) => {
              const { id, name } = category

              const isLastItem = index === categories.length - 1

              return (
                <Fragment key={id}>
                  <Link
                    data-active={categoryActiveId === id}
                    href={`/shop/?category=${id}`}
                    className="text-muted-foreground data-[active=true]:text-foreground hover:text-foreground text-sm font-medium hover:cursor-pointer hover:underline"
                  >
                    {name}
                  </Link>

                  {isLastItem && (
                    <div ref={loadMoreRef} className="h-1 w-full" />
                  )}
                </Fragment>
              )
            })}

            {isLoading &&
              Array.from({ length: 12 }).map((_, index) => {
                return <Skeleton key={index} className="h-4 w-full" />
              })}
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
