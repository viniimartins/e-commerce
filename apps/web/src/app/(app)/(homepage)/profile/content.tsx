'use client'

import { Tabs } from 'radix-ui'

import { Skeleton } from '@/components/ui/skeleton'

import { OrderCard } from './components/order-card'
import { useGetOrders } from './hooks/use-get-orders'

export function Content() {
  const { data: orders, isLoading } = useGetOrders({
    params: {
      page: 1,
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
          {orders?.data.map((order) => {
            const { id } = order

            return <OrderCard key={id} data={order} />
          })}

          {orders?.data.length === 0 && (
            <span className="text-muted-foreground text-sm">
              Nenhum pedido encontrado
            </span>
          )}

          {!isLoading &&
            Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-[13rem] w-full" />
            ))}
        </Tabs.Content>
      </div>
    </Tabs.Root>
  )
}
