'use client'

import { useSearchParams } from 'next/navigation'

import { useGetCategories } from '@/app/(app)/hooks/use-get-category'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { formatPrice } from '@/utils/formatPrice'

export function Filter() {
  const searchParams = useSearchParams()
  const categoryActiveId = searchParams.get('category')

  const { data: categories, isLoading: isLoadingCategories } = useGetCategories(
    {
      page: 1,
      perPage: 15,
    },
  )

  const isLoading = isLoadingCategories

  return (
    <aside className="space-y-10">
      <div className="flex flex-col gap-2">
        <span className="text-xl font-semibold">Categorias</span>

        <ScrollArea>
          <div className="flex h-56 flex-col items-start gap-2">
            <a
              data-active={!categoryActiveId}
              href="/shop"
              className="text-muted-foreground data-[active=true]:text-foreground hover:text-foreground text-sm font-medium hover:cursor-pointer hover:underline"
            >
              Todas categorias
            </a>

            {categories?.data.map((category) => {
              const { id, name } = category

              return (
                <a
                  data-active={categoryActiveId === id}
                  key={id}
                  href={`/shop/?category=${id}`}
                  className="text-muted-foreground data-[active=true]:text-foreground hover:text-foreground text-sm font-medium hover:cursor-pointer hover:underline"
                >
                  {name}
                </a>
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
