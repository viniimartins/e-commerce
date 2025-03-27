import { Badge } from '@/components/ui/badge'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

// Aguardando Pagamento – Pedido recebido, aguardando pagamento.

// Pagamento Aprovado – Pagamento confirmado.

// Pedido em Processamento – Pedido sendo preparado.

// Pedido Enviado – Pedido saiu para entrega.

// Pedido Entregue – Pedido chegou ao destino.

export default function BillingPage() {
  return (
    <>
      <Breadcrumb className="mt-14">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Pedidos</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Pedido 1234567890</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex justify-between">
        <span className="text-muted-foreground text-sm">
          10 de dezembro de 2024
        </span>

        <Badge variant="outline">Aguardando Pagamento </Badge>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <h3 className="text-lg font-semibold">Endereço</h3>
          <span className="text-base font-medium">
            Vinicius Martins Ribeiro
          </span>
          <p className="text-sm">
            Avenida Visconde de Barbacena 188, cada piso marrom Passagem -
            Tubarão - SC 88705-665 Brasil
          </p>
        </div>
        <div className="col-span-1">
          <h1 className="text-2xl font-bold">Forma de Pagamento</h1>
          <span className="text-base font-medium">Pix R$ 167,02</span>
        </div>
        <div className="col-span-1">
          <h1 className="text-2xl font-bold">Resumo</h1>
          <span className="text-base font-medium">Frete</span>

          <span className="text-base font-medium">Total R$ 167,02</span>
        </div>
      </div>
    </>
  )
}
