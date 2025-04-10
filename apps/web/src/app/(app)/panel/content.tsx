'use client'

import { ArrowRightIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useCallback, useState } from 'react'

import { Button } from '@/components/ui/button'
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
import { useGetBestSellerProducts } from '@/hooks/query/product/get-best-seller'
import { useGetStatistics } from '@/hooks/query/statistics/get'
import { useModal } from '@/hooks/use-modal'
import { cn } from '@/lib/utils'
import type { TableParams } from '@/types/paginated-response'
import { formatPrice } from '@/utils/formatPrice'

import type { IOrderWithUser } from '../types'
import { DataTable } from './_components/table'
import { getBestSellerProductsColumns } from './best-seller-columns'
import { getOrdersColumns } from './orders-columns'

export function Content() {
  const [ordersTableParams, setOrdersTableParams] = useState<TableParams>({
    pageIndex: 1,
    perPage: 10,
  })

  const { pageIndex: ordersPageIndex, perPage: ordersPerPage } =
    ordersTableParams

  const [bestSellerProductsTableParams, setBestSellerProductsTableParams] =
    useState<TableParams>({
      pageIndex: 1,
      perPage: 10,
    })

  const {
    pageIndex: bestSellerProductsPageIndex,
    perPage: bestSellerProductsPerPage,
  } = bestSellerProductsTableParams

  const {
    actions: viewOrdersModalActions,
    isOpen: isViewOrdersModalOpen,
    target: viewOrdersModalTarget,
  } = useModal<IOrderWithUser>()

  const { data: statistics, isLoading } = useGetStatistics()

  const { data: bestSellerProducts, isLoading: isLoadingBestSellerProducts } =
    useGetBestSellerProducts({
      page: bestSellerProductsPageIndex,
      perPage: bestSellerProductsPerPage,
    })

  const { data: orders, isLoading: isLoadingOrders } = useGetAllOrders({
    params: {
      page: ordersPageIndex,
      perPage: ordersPerPage,
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

  const onChangeBestSellerProductsTableParams = useCallback(
    (updatedParams: Partial<TableParams>) => {
      return setBestSellerProductsTableParams((state) => ({
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
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">Pedidos recentes</CardTitle>

              <Link href="/panel/sales">
                <Button variant="outline" size="sm">
                  Ver mais
                  <ArrowRightIcon className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <CardDescription>
              Visualize os pedidos recentes e gerencie seus pedidos
            </CardDescription>
          </CardHeader>

          <CardContent>
            <DataTable
              columns={getOrdersColumns({
                isLoading: isLoadingOrders,
                viewOrdersModalActions,
              })}
              data={orders?.data ?? []}
              meta={orders?.meta}
              onChangeParams={onChangeOrdersTableParams}
            />
          </CardContent>
        </Card>

        <Card className="rounded-none">
          <CardHeader>
            <CardTitle className="text-2xl">Produtos em destaque</CardTitle>
            <CardDescription>
              Confira os produtos com maior volume de vendas
            </CardDescription>
          </CardHeader>
          <CardContent className="h-full">
            <DataTable
              columns={getBestSellerProductsColumns({
                isLoading: isLoadingBestSellerProducts,
              })}
              data={bestSellerProducts?.data ?? []}
              meta={bestSellerProducts?.meta}
              onChangeParams={onChangeBestSellerProductsTableParams}
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
            {viewOrdersModalTarget?.products?.map(({ product }, index) => {
              const lastIndex =
                viewOrdersModalTarget?.products.length === index + 1

              const { id, name, price, productImage, quantity } = product

              return (
                <Fragment key={id}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="dark:bg-muted-foreground/10 relative mb-1 flex h-[3.5rem] w-[3.5rem] items-center justify-center border bg-neutral-100 p-0">
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
                </Fragment>
              )
            })}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  )
}
