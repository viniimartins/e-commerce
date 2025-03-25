import Image from 'next/image'

import product from '@/assets/gamepad.png'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { formatPrice } from '@/utils/formatPrice'

export function OrderCard() {
  return (
    <Card className="gap-0 rounded-none pb-0">
      <CardHeader className="border-b">
        <CardTitle className="flex justify-between">
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              28 de novembro de 2024
            </span>
            <Separator orientation="vertical" />
            <span>{formatPrice(1000)}</span>
          </div>
          <Badge variant="outline" className="bg-green-500">
            Entregue
          </Badge>
        </CardTitle>
        <CardDescription className="hidden" />
      </CardHeader>
      <CardContent className="flex flex-col gap-1 px-0">
        <div className="flex flex-1 gap-2 border-b p-4">
          <div className="group dark:bg-muted-foreground/10 relative mb-1 flex h-[5rem] w-[5rem] items-center justify-center bg-neutral-100 p-0 dark:border">
            <Image
              src={product}
              alt="product"
              fill
              quality={100}
              priority
              className="object-cover p-2"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <div className="flex w-full flex-col justify-between">
            <span className="w-[43.6rem] truncate">
              <a
                href="#"
                className="text-primary h-0 p-0 text-base font-semibold hover:underline"
              >
                Placa Pedra Massageadora Facial De Jade Natural Guasha Placa
                Pedra Massageadora Facial De Jade Natural Guasha
              </a>
            </span>

            <span className="text-muted-foreground text-sm font-medium">
              Entrega até 24/12/2024
            </span>
            <span className="text-sm">1 un. R$ 61,13</span>
          </div>
        </div>
        <div className="flex flex-1 gap-2 p-4">
          <div className="group dark:bg-muted-foreground/10 relative mb-1 flex h-[5rem] w-[5rem] items-center justify-center bg-neutral-100 p-0 dark:border">
            <Image
              src={product}
              alt="product"
              fill
              quality={100}
              priority
              className="object-cover p-2"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <div className="flex w-full flex-col justify-between">
            <span className="w-[43.6rem] truncate">
              <a
                href="#"
                className="text-primary h-0 p-0 text-base font-semibold hover:underline"
              >
                Placa Pedra Massageadora Facial De Jade Natural Guasha Placa
                Pedra Massageadora Facial De Jade Natural Guasha
              </a>
            </span>

            <span className="text-muted-foreground text-sm font-medium">
              Entrega até 24/12/2024
            </span>
            <span className="text-sm">1 un. R$ 61,13</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
