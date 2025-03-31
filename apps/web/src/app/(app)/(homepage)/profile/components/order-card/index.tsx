import Image from 'next/image'
import Link from 'next/link'

import { type IOrder, OrderStatusLabels } from '@/app/(app)/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { formatDateLong } from '@/utils/formatDate'
import { formatPrice } from '@/utils/formatPrice'

interface Props {
  data: IOrder
}

export function OrderCard({ data }: Props) {
  const { createdAt, products, total, id, currentStatus } = data

  return (
    <Card className="gap-0 rounded-none pb-0">
      <CardHeader className="h-14 border-b">
        <CardTitle className="flex h-8 justify-between">
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground text-base font-semibold">
              {formatDateLong(createdAt)}
            </span>
            <Separator orientation="vertical" />
            <span>{formatPrice(total / 100)}</span>
          </div>

          <div className="flex h-8 gap-3">
            <Link href={`/order/${id}`}>
              <Button size="sm" variant="secondary">
                Ver detalhes
              </Button>
            </Link>

            <Badge
              variant="outline"
              data-status={currentStatus}
              className="h-8 data-[status=DELIVERED]:bg-green-500"
            >
              {OrderStatusLabels[currentStatus]}
            </Badge>
          </div>
        </CardTitle>
        <CardDescription className="hidden" />
      </CardHeader>
      <CardContent className="flex flex-col gap-1 px-0">
        {products?.map(({ quantity, product }, index) => {
          const { id, name, price, productImage } = product

          const isLast = index === products.length - 1

          return (
            <div
              key={id}
              className={cn('flex flex-1 gap-3 border-b p-4', {
                'border-b-0': isLast,
              })}
            >
              <div className="dark:bg-muted-foreground/10 group relative mb-1 flex h-[5rem] w-[5rem] items-center justify-center bg-neutral-100 p-0 dark:border">
                <Image
                  src={productImage[0]?.url}
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
                    {name}
                  </a>
                </span>

                <span className="text-muted-foreground text-sm font-medium">
                  Entrega até 24/12/2024
                </span>
                <span className="text-sm">
                  {quantity} un. R$ {formatPrice(price)}
                </span>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
