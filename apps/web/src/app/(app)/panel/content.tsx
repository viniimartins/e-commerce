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
import { Skeleton } from '@/components/ui/skeleton'
import { useGetAllOrders } from '@/hooks/query/order/get-all'
import { useGetStatistics } from '@/hooks/query/statistics/get'
import { useModal } from '@/hooks/use-modal'
import { cn } from '@/lib/utils'
import type { TableParams } from '@/types/paginated-response'
import { formatPrice } from '@/utils/formatPrice'

import type { IOrderWithUser } from '../types'
import { DataTable } from './_components/table'
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

  const { data: statistics, isLoading } = useGetStatistics()

  const { pageIndex, perPage } = ordersTableParams

  const { data: orders, isLoading: isLoadingOrders } = useGetAllOrders({
    params: {
      page: pageIndex,
      perPage,
    },
  })

  const onChangeOrdersTableParams = useCallback(
    (updatedParams: Partial<TableParams>) => {
      return setOrdersTableParams((state) => ({
        ...state,
        ...updatedParams,
      }))
    },
    [],
  )

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="rounded-none">
          <CardHeader className="relative">
            <CardDescription>Total de receita</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {!isLoading &&
                formatPrice(Number(statistics?.totalRevenue) / 100)}
              {isLoading && <Skeleton className="h-9 w-50" />}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="rounded-none">
          <CardHeader className="relative">
            <CardDescription>Total de pedidos</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {!isLoading && statistics?.totalOrders}
              {isLoading && <Skeleton className="h-9 w-50" />}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="rounded-none">
          <CardHeader className="relative">
            <CardDescription>Total de Usuários</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {!isLoading && statistics?.totalUsers}
              {isLoading && <Skeleton className="h-9 w-50" />}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="rounded-none">
          <CardHeader>
            <CardTitle className="text-2xl">Pedidos recentes</CardTitle>
            <CardDescription>
              Visualize os pedidos recentes e gerencie seus pedidos
            </CardDescription>
          </CardHeader>

          <CardContent>
            <DataTable
              columns={getColumns({
                isLoading: isLoadingOrders,
                viewOrdersModalActions,
              })}
              data={orders?.data ?? []}
              meta={orders?.meta}
              onChangeParams={onChangeOrdersTableParams}
            />
          </CardContent>
        </Card>
      </div>

      <Dialog
        open={isViewOrdersModalOpen}
        onOpenChange={viewOrdersModalActions.close}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Visualizar produtos do usuário</DialogTitle>
            <DialogDescription>
              Visualize todos os produtos do usuário
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
            {viewOrdersModalTarget?.products?.map(({ product }, index) => {
              const lastIndex =
                viewOrdersModalTarget?.products.length === index + 1

              const { id, name, price, productImage, quantity } = product

              return (
                <Fragment key={id}>
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="dark:bg-muted-foreground/10 relative mb-1 flex h-[3.5rem] w-[3.5rem] items-center justify-center bg-neutral-100 p-0 dark:border">
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
                          <span className="text-base font-medium">{name}</span>

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
                  </div>
                </Fragment>
              )
            })}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  )
}
