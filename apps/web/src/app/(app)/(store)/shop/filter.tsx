'use client'

import { useSearchParams } from 'next/navigation'
import { Fragment, useRef } from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetInfiniteCategories } from '@/hooks/query/category/get-infinite'
import { useInfiniteScrollObserver } from '@/hooks/use-infinite-scroll-observer'
import { formatPrice } from '@/utils/formatPrice'

export function Filter() {
  const searchParams = useSearchParams()
  const categoryActiveId = searchParams.get('category')
  const loadMoreRef = useRef<HTMLDivElement>(null)

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
                  <a
                    data-active={categoryActiveId === id}
                    href={`/shop/?category=${id}`}
                    className="text-muted-foreground data-[active=true]:text-foreground hover:text-foreground text-sm font-medium hover:cursor-pointer hover:underline"
                  >
                    {name}
                  </a>

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
          <div className="flex w-full items-center justify-between">
            <label
              htmlFor="allprice"
              className="text-muted-foreground text-sm font-medium"
            >
              Todos os preços
            </label>
            <Checkbox id="allprice" />
          </div>

          <div className="flex w-full items-center justify-between">
            <label
              htmlFor="1"
              className="text-muted-foreground text-sm font-medium"
            >
              {formatPrice(0)} - {formatPrice(99.99)}
            </label>
            <Checkbox id="1" />
          </div>

          <div className="flex w-full items-center justify-between">
            <label
              htmlFor="2"
              className="text-muted-foreground text-sm font-medium"
            >
              {formatPrice(100)} - {formatPrice(199.99)}
            </label>
            <Checkbox id="2" />
          </div>

          <div className="flex w-full items-center justify-between">
            <label
              htmlFor="1"
              className="text-muted-foreground text-sm font-medium"
            >
              {formatPrice(200)} - {formatPrice(299.99)}
            </label>
            <Checkbox id="1" />
          </div>

          <div className="flex w-full items-center justify-between">
            <label
              htmlFor="1"
              className="text-muted-foreground text-sm font-medium"
            >
              {formatPrice(300)} - {formatPrice(399.99)}
            </label>
            <Checkbox id="1" />
          </div>

          <div className="flex w-full items-center justify-between">
            <label
              htmlFor="1"
              className="text-muted-foreground text-sm font-medium"
            >
              {formatPrice(400)}+
            </label>
            <Checkbox id="1" />
          </div>
        </div>
      </div>
    </aside>
  )
}
