'use client'

import { Tabs } from 'radix-ui'

import { BillingCard } from './components/billing-card'
import { useGetBilling } from './hooks/use-get-billing'

export function Content() {
  const { data: billing, isLoading } = useGetBilling({
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
          <Tabs.Trigger
            value="cancelamentos"
            className="text-muted-foreground data-[state=active]:text-primary group w-full text-start text-base hover:cursor-pointer"
          >
            Meus Cancelamentos
          </Tabs.Trigger>
        </Tabs.List>
      </aside>
      <div className="col-span-3">
        <Tabs.Content value="pedidos" className="space-y-4">
          {billing?.data.map((order) => {
            const { id } = order

            return <BillingCard key={id} data={order} />
          })}

          {billing?.data.length === 0 && (
            <span className="text-muted-foreground text-sm">
              Nenhum pedido encontrado
            </span>
          )}

          {isLoading && (
            <span className="text-muted-foreground text-sm">
              Carregando pedidos...
            </span>
          )}
        </Tabs.Content>
        <Tabs.Content value="cancelamentos">
          <p className="text-sm">Conteúdo de Meus Cancelamentos</p>
        </Tabs.Content>
      </div>
    </Tabs.Root>
  )
}
