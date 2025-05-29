'use client'

import Image from 'next/image'
import { Fragment, useCallback, useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useNextStatusOrder } from '@/hooks/mutation/order/next-status'
import { useGetAllOrders } from '@/hooks/query/order/get-all'
import { useModal } from '@/hooks/use-modal'
import { cn } from '@/lib/utils'
import type { TableParams } from '@/types/paginated-response'
import { formatPrice } from '@/utils/format-price'

import { type IOrderWithUser } from '../../types'
import { DataTable } from '../_components/table'
import { getColumns } from './columns'

export function Content() {
  const [ordersTableParams, setOrdersTableParams] = useState<TableParams>({
    pageIndex: 1,
    perPage: 10,
  })

  const {
    actions: viewOrdersModalActions,
    isOpen: isViewOrdersModalOpen,
    target: viewOrdersModalTarget,
  } = useModal<IOrderWithUser>()

  const { pageIndex, perPage } = ordersTableParams

  const {
    data: orders,
    isFetching: isFetchingOrders,
    queryKey,
  } = useGetAllOrders({
    params: {
      pageIndex,
      perPage,
    },
  })

  const { mutate: nextStatusOrder } = useNextStatusOrder({ queryKey })

  const onChangeOrdersTableParams = useCallback(
    (updatedParams: Partial<TableParams>) => {
      return setOrdersTableParams((state) => ({
        ...state,
        ...updatedParams,
      }))
    },
    [],
  )

  function handleNextStatusOrder(orderId: string) {
    nextStatusOrder({ order: { id: orderId } })
  }

  return (
    <>
      <Card className="h-full rounded-none">
        <CardHeader>
          <CardTitle className="text-2xl">Pedidos </CardTitle>
          <CardDescription>
            Visualize e gerencie todos os pedidos da plataforma
          </CardDescription>
        </CardHeader>

        <CardContent className="h-full">
          <DataTable
            columns={getColumns({
              isLoading: isFetchingOrders,
              viewOrdersModalActions,
              handleNextStatusOrder,
            })}
            data={orders?.data ?? []}
            meta={orders?.meta}
            onChangeParams={onChangeOrdersTableParams}
          />
        </CardContent>
      </Card>

      <Dialog
        open={isViewOrdersModalOpen}
        onOpenChange={viewOrdersModalActions.close}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes do Pedido</DialogTitle>
            <DialogDescription>
              Confira os produtos, quantidades e valores deste pedido
            </DialogDescription>
          </DialogHeader>

          <ScrollArea
            className={cn(
              viewOrdersModalTarget?.products &&
                viewOrdersModalTarget?.products.length > 5
                ? 'h-96'
                : 'h-auto',
            )}
          >
            {viewOrdersModalTarget?.products?.map(
              ({ product, quantity }, index) => {
                const lastIndex =
                  viewOrdersModalTarget?.products.length === index + 1

                const { id, name, price, productImage } = product

                return (
                  <Fragment key={id}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="dark:bg-muted-foreground/10 relative mb-1 flex h-[4rem] w-[4rem] items-center justify-center border bg-neutral-100 p-0">
                          <Image
                            src={productImage[0].image.url}
                            alt="product"
                            fill
                            quality={100}
                            priority
                            className="object-cover p-1"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>

                        <div className="flex h-full flex-col justify-between">
                          <span className="t max-w-[21rem] text-base font-medium">
                            {name}
                          </span>

                          <span className="text-muted-foreground text-sm">
                            {quantity} un.
                          </span>
                        </div>
                      </div>

                      <span className="text-sm font-medium">
                        {formatPrice(price)}
                      </span>
                    </div>

                    {!lastIndex && <Separator className="my-2" />}
                  </Fragment>
                )
              },
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  )
}
