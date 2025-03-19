'use client'

import { useSearchParams } from 'next/navigation'

import { useGetCategories } from '@/app/(app)/hooks/use-get-category'
import { Checkbox } from '@/components/ui/checkbox'

export function Filter() {
  const searchParams = useSearchParams()
  const categoryActiveId = searchParams.get('category')

  const { data: categories } = useGetCategories({
    page: 1,
    perPage: 15,
  })

  return (
    <aside className="space-y-10">
      <div className="flex flex-col gap-1">
        <span className="text-xl font-medium">CATEGORIES</span>

        <div className="flex h-56 flex-col items-start gap-2 overflow-auto">
          <a
            data-active={!categoryActiveId}
            href="/shop"
            className="text-muted-foreground data-[active=true]:text-foreground hover:text-foreground text-sm font-medium hover:cursor-pointer hover:underline"
          >
            All
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
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xl font-medium">PRICE</span>

        <div className="flex flex-col items-start gap-2">
          <div className="flex w-full items-center justify-between">
            <label
              htmlFor="allprice"
              className="text-muted-foreground text-sm font-medium"
            >
              All price
            </label>
            <Checkbox id="allprice" />
          </div>

          <div className="flex w-full items-center justify-between">
            <label
              htmlFor="1"
              className="text-muted-foreground text-sm font-medium"
            >
              $0.00 - 99.99
            </label>
            <Checkbox id="1" />
          </div>

          <div className="flex w-full items-center justify-between">
            <label
              htmlFor="2"
              className="text-muted-foreground text-sm font-medium"
            >
              $100.00 - 199.99
            </label>
            <Checkbox id="2" />
          </div>

          <div className="flex w-full items-center justify-between">
            <label
              htmlFor="1"
              className="text-muted-foreground text-sm font-medium"
            >
              $200.00 - 299.99
            </label>
            <Checkbox id="1" />
          </div>

          <div className="flex w-full items-center justify-between">
            <label
              htmlFor="1"
              className="text-muted-foreground text-sm font-medium"
            >
              $300.00 - 399.99
            </label>
            <Checkbox id="1" />
          </div>

          <div className="flex w-full items-center justify-between">
            <label
              htmlFor="1"
              className="text-muted-foreground text-sm font-medium"
            >
              $400.00+
            </label>
            <Checkbox id="1" />
          </div>
        </div>
      </div>
    </aside>
  )
}
