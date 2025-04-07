import { notFound } from 'next/navigation'

import { OrderStatusLabels } from '@/app/(app)/types'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { getOrder } from '@/service/order'

import { Content } from './content'

interface Params {
  params: Promise<{ orderId: string }>
}

async function fetchOrderData(orderId: string) {
  const order = await getOrder({ id: orderId })

  if (!order) {
    notFound()
  }

  return order
}

export async function generateMetadata({ params }: Params) {
  const { orderId } = await params

  const order = await fetchOrderData(orderId)

  return {
    title: OrderStatusLabels[order.currentStatus],
  }
}

export default async function OrderPage({ params }: Params) {
  const { orderId } = await params

  const order = await fetchOrderData(orderId)

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

      <Content data={order} />
    </>
  )
}
