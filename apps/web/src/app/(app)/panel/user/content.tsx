'use client'

import { LoaderCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useCallback, useRef, useState } from 'react'

import { BadgeStatus } from '@/components/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
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
import { useGetInfiniteOrdersById } from '@/hooks/query/order/get-infinity-by-id'
import { useGetUsers } from '@/hooks/query/user/get'
import { useInfiniteScrollObserver } from '@/hooks/use-infinite-scroll-observer'
import { useModal } from '@/hooks/use-modal'
import { cn } from '@/lib/utils'
import type { TableParams } from '@/types/paginated-response'
import { formatDateLong, formatDateShort } from '@/utils/format-date'
import { formatPrice } from '@/utils/format-price'
import { randomDateFromToday } from '@/utils/random-date-from-today'

import { type IUserWithOrders } from '../../types'
import { DataTable } from '../_components/table'
import { getColumns } from './columns'

export function Content() {
  const [usersTableParams, setUsersTableParams] = useState<TableParams>({
    pageIndex: 1,
    perPage: 10,
  })

  const loadMoreRef = useRef<HTMLDivElement>(null)

  const { pageIndex, perPage } = usersTableParams

  const {
    actions: viewOrdersModalActions,
    isOpen: isViewOrdersModalOpen,
    target: viewOrdersModalTarget,
  } = useModal<IUserWithOrders>()

  const { data: users, isFetching: isFetchingUsers } = useGetUsers({
    pageIndex,
    perPage,
  })

  const {
    data: orders,
    isLoading: isOrdersLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetInfiniteOrdersById({
    userId: viewOrdersModalTarget?.id,
    viewOrders: isViewOrdersModalOpen,
  })

  useInfiniteScrollObserver({
    targetRef: loadMoreRef,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isActive: true,
  })

  const onChangeUsersTableParams = useCallback(
    (updatedParams: Partial<TableParams>) => {
      return setUsersTableParams((state) => ({ ...state, ...updatedParams }))
    },
    [],
  )

  return (
    <>
      <Card className="h-full rounded-none">
        <CardHeader>
          <CardTitle className="text-2xl">Usuários</CardTitle>
          <CardDescription>
            Gerencie seus usuários e visualize seu desempenho de vendas
          </CardDescription>
        </CardHeader>

        <CardContent className="h-full">
          <DataTable
            columns={getColumns({
              isLoading: isFetchingUsers,
              viewOrdersModalActions,
            })}
            data={users?.data ?? []}
            meta={users?.meta}
            onChangeParams={onChangeUsersTableParams}
          />
        </CardContent>
      </Card>

      <Dialog
        open={isViewOrdersModalOpen}
        onOpenChange={viewOrdersModalActions.close}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Visualizar pedidos do usuário</DialogTitle>
            <DialogDescription>
              Visualize todos os pedidos do usuário
            </DialogDescription>
          </DialogHeader>

          <ScrollArea
            className={cn(orders && orders.length > 5 ? 'h-96' : 'h-auto')}
          >
            {orders?.map((order, index) => {
              const lastIndex = orders.length === index + 1

              const { id, products, createdAt, total, currentStatus } = order

              return (
                <Fragment key={id}>
                  <Card className="w-full gap-0 rounded-none pb-0">
                    <CardHeader className="h-14 border-b">
                      <CardTitle className="flex h-8 justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-muted-foreground text-sm font-medium">
                            {formatDateShort(createdAt)}
                          </span>
                          <Separator orientation="vertical" />
                          <span className="text-sm font-medium">
                            {formatPrice(Number(total) / 100)}
                          </span>
                        </div>

                        <div className="flex h-8 gap-3">
                          <BadgeStatus status={currentStatus} className="h-8" />
                        </div>
                      </CardTitle>
                      <CardDescription className="hidden" />
                    </CardHeader>
                    <CardContent className="flex flex-col gap-1 px-0">
                      <Accordion
                        type="single"
                        collapsible
                        className="w-full px-6"
                      >
                        <AccordionItem value="products">
                          <AccordionTrigger>Ver Produtos</AccordionTrigger>
                          <AccordionContent>
                            {products?.map(({ quantity, product }, index) => {
                              const { id, name, price, productImage } = product

                              const isLast = index === products.length - 1

                              return (
                                <div
                                  key={id}
                                  className={cn(
                                    'flex flex-1 gap-3 border-b py-4',
                                    {
                                      'border-b-0': isLast,
                                    },
                                  )}
                                >
                                  <div className="dark:bg-muted-foreground/10 group relative mb-1 flex h-[5rem] w-[5rem] items-center justify-center border bg-neutral-100 p-0">
                                    <Image
                                      src={productImage[0].image.url}
                                      alt="product"
                                      fill
                                      quality={100}
                                      priority
                                      className="object-cover p-2"
                                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                      unoptimized
                                    />
                                  </div>

                                  <div className="flex w-full flex-col justify-between">
                                    <span className="w-[20rem] truncate">
                                      <Link
                                        href={`/shop/${id}`}
                                        className="text-primary h-0 p-0 text-base font-semibold hover:underline"
                                      >
                                        {name}
                                      </Link>
                                    </span>

                                    <span className="text-muted-foreground text-sm font-medium">
                                      {formatDateLong(randomDateFromToday())}
                                    </span>
                                    <span className="text-sm">
                                      {quantity} un. R$ {formatPrice(price)}
                                    </span>
                                  </div>
                                </div>
                              )
                            })}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>

                  {!lastIndex && <Separator className="my-2" />}

                  {lastIndex && <div ref={loadMoreRef} className="h-1" />}
                </Fragment>
              )
            })}

            {isOrdersLoading && (
              <div className="flex items-center justify-center">
                <LoaderCircle className="animate-spin" />
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  )
}
