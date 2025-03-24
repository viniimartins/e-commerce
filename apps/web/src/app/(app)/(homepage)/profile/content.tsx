import { Tabs } from 'radix-ui'

import { ProductCard } from './components/product-card'

export function Content() {
  return (
    <Tabs.Root defaultValue="pedidos" className="grid w-full grid-cols-4 gap-6">
      <aside className="col-span-1 space-y-3">
        <h2 className="text-primary text-lg font-semibold">Minhas Compras</h2>
        <Tabs.List className="flex w-full flex-col space-y-2 px-3">
          <Tabs.Trigger
            value="pedidos"
            className="group text-muted-foreground data-[state=active]:text-primary w-full text-start text-base hover:cursor-pointer"
          >
            Meus Pedidos
          </Tabs.Trigger>
          <Tabs.Trigger
            value="cancelamentos"
            className="group text-muted-foreground data-[state=active]:text-primary w-full text-start text-base hover:cursor-pointer"
          >
            Meus Cancelamentos
          </Tabs.Trigger>
        </Tabs.List>
      </aside>
      <div className="col-span-3">
        <Tabs.Content value="pedidos" className="space-y-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <ProductCard key={index} />
          ))}
        </Tabs.Content>
        <Tabs.Content value="cancelamentos">
          <p className="text-sm">Conteúdo de Meus Cancelamentos</p>
        </Tabs.Content>
      </div>
    </Tabs.Root>
  )
}
