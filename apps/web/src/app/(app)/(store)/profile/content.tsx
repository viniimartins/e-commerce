'use client'

import { Tabs } from 'radix-ui'

import { Skeleton } from '@/components/ui/skeleton'
import { useGetOrders } from '@/hooks/query/order/get'

import { Order } from './order'

export function Content() {
  const { data: orders, isFetching: isFetchingOrders } = useGetOrders({
    params: {
      pageIndex: 1,
      perPage: 10,
    },
  })

  return (
    <Tabs.Root defaultValue="pedidos" className="grid w-full grid-cols-4 gap-6">
      <aside className="col-span-1 space-y-3">
        <h2 className="text-primary text-lg font-semibold">Minhas Compras</h2>
        <Tabs.List className="flex w-full flex-col space-y-2 px-3">
          <Tabs.Trigger
            value="pedidos"
            className="text-muted-foreground data-[state=active]:text-primary group w-full text-start text-base hover:cursor-pointer"
          >
            Meus Pedidos
          </Tabs.Trigger>
        </Tabs.List>
      </aside>
      <div className="col-span-3">
        <Tabs.Content value="pedidos" className="space-y-4">
          {!isFetchingOrders &&
            orders?.data.map((order) => {
              const { id } = order

              return <Order key={id} data={order} />
            })}

          {isFetchingOrders &&
            orders?.data.map(({ id }) => (
              <Skeleton key={id} className="h-[13rem] w-full" />
            ))}

          {orders?.data.length === 0 && (
            <span className="text-muted-foreground text-sm">
              Nenhum pedido encontrado
            </span>
          )}
        </Tabs.Content>
      </div>
    </Tabs.Root>
  )
}
