'use client'

import { TruckIcon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import product1 from '@/assets/gamepad.png'
import pix from '@/assets/pix.svg'
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
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/utils/formatPrice'

import { Stepper } from './components/stepper'

// Aguardando Pagamento – Pedido recebido, aguardando pagamento.

// Pagamento Aprovado – Pagamento confirmado.

// Pedido em Processamento – Pedido sendo preparado.

// Pedido Enviado – Pedido saiu para entrega.

// Pedido Entregue – Pedido chegou ao destino.

export default function BillingPage() {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false)

  const [items] = useState(5)

  return (
    <>
      <Breadcrumb className="mt-14">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Pedidos</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Status da compra</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-4">
          <Card className="rounded-none">
            <CardHeader className="flex flex-col items-start justify-between">
              <Badge variant="outline" className="h-8 bg-green-500">
                Entregue
              </Badge>
              <CardTitle className="text-xl">
                Chegou no dia 23 de novembro
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Entregamos seu pacote às 14:42h na
                <span className="font-bold">
                  {' '}
                  Avenida Visconde de Barbacena 188, Passagem,
                </span>{' '}
                Tubarão, Santa Catarina.
              </p>
            </CardContent>

            <Separator />

            <CardFooter>
              <Button>Comprar novamente</Button>
            </CardFooter>
          </Card>

          <Card
            className={cn(
              'gap-1 overflow-auto rounded-none px-2',
              items > 3 && 'h-[22.8rem]',
            )}
          >
            <CardContent className="space-y-3 overflow-auto px-4">
              {Array.from({ length: items }).map((_, index) => {
                const item = items === index + 1

                return (
                  <div key={index}>
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
                          <span className="text-base font-medium">
                            Brinquedo{' '}
                          </span>

                          <span className="text-muted-foreground text-sm">
                            1 un.
                          </span>
                        </div>
                      </div>

                      <span className="text-sm font-medium">R$ 167,02</span>
                    </div>

                    {!item && <Separator className="my-2" />}
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>

        <Card
          className={cn(
            'col-span-1 h-[19rem] gap-1 rounded-none',
            isAccordionOpen && 'h-auto',
          )}
        >
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
            <Accordion
              type="single"
              collapsible
              className="w-full"
              onValueChange={(value) => setIsAccordionOpen(!!value)}
            >
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
