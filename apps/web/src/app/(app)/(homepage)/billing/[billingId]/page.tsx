import { TruckIcon } from 'lucide-react'
import Image from 'next/image'

import product1 from '@/assets/gamepad.png'
import pix from '@/assets/pix.svg'
import truck from '@/assets/truck.svg'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { formatPrice } from '@/utils/formatPrice'

import { Stepper } from './components/stepper'

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

      <div className="ml-auto flex h-10">
        <Badge variant="outline" className="h-full">
          Aguardando Pagamento{' '}
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="col-span-2 gap-1 rounded-none">
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="group dark:bg-muted-foreground/10 relative mb-1 flex h-[3.5rem] w-[3.5rem] items-center justify-center bg-neutral-100 p-0 dark:border">
                  <Image
                    src={product1}
                    alt="product"
                    fill
                    quality={100}
                    priority
                    className="object-cover p-1"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                <div className="flex h-full flex-col justify-between">
                  <span className="text-base font-medium">Brinquedo </span>

                  <span className="text-muted-foreground text-sm">1 un.</span>
                </div>
              </div>

              <span className="text-sm font-medium">R$ 167,02</span>
            </div>

            <Separator />
          </CardContent>
        </Card>

        <Card className="col-span-1 gap-1 rounded-none">
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Detalhe da compra
            </CardTitle>
            <CardDescription className="flex h-4 items-center gap-2">
              <span className="text-sm">10 de dezembro de 2024</span>

              <Separator orientation="vertical" />
              <span className="text-muted-foreground text-sm"># 12345678</span>
            </CardDescription>

            <Separator className="my-2" />
          </CardHeader>

          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Desconto à vista</span>
              <span className="text-muted-foreground text-sm">
                {formatPrice(100)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">Frete</span>
              <span className="text-muted-foreground text-sm">
                {formatPrice(100)}
              </span>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <span className="text-sm">Total</span>
              <span className="text-muted-foreground text-sm">
                {formatPrice(100)}
              </span>
            </div>

            <Separator className="mt-6" />
          </CardContent>

          <CardFooter>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="w-full">
                <AccordionTrigger className="w-full">
                  Detalhes do pagamento e envio
                </AccordionTrigger>
                <AccordionContent className="space-y-8">
                  <div className="mt-4 flex flex-col gap-2">
                    <span className="text-base font-semibold">Pagamento</span>
                    <div className="flex w-full gap-4 border p-4">
                      <div className="dark:bg-muted-foreground/10 relative flex h-[3rem] w-[3rem] items-center justify-center rounded-full bg-neutral-100 dark:border">
                        <Image
                          src={pix}
                          alt="pix"
                          fill
                          quality={100}
                          priority
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>

                      <div className="flex flex-1 flex-col gap-1">
                        <span className="text-sm font-medium">
                          {formatPrice(999)}
                        </span>
                        <span className="text-muted-foreground text-sm font-medium">
                          PIX
                        </span>

                        <span className="text-muted-foreground text-sm">
                          21 de novembro de 2024
                        </span>

                        <span className="text-sm font-medium text-green-500">
                          Pagamento Aprovado
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-base font-semibold">Frete</span>
                    <div className="flex w-full gap-4 border p-4">
                      <div className="dark:bg-muted-foreground/10 relative flex h-[3rem] w-[3rem] items-center justify-center rounded-full bg-neutral-100 dark:border">
                        <TruckIcon className="size-6" />
                      </div>

                      <div className="flex flex-1 flex-col gap-1">
                        <span className="text-sm font-medium">
                          Avenida Visconde de Barbacena 188
                        </span>
                        <span className="text-muted-foreground text-sm font-medium">
                          Tubarão - Ssanta Catarina
                        </span>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-10">
        <Card className="rounded-none">
          <CardHeader>
            <CardTitle className="text-xl font-medium">
              Status do Pedido
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Stepper />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
