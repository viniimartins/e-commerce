import { notFound } from 'next/navigation'

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

interface Props {
  params: Promise<{ orderId: string }>
}

export default async function OrderPage({ params }: Props) {
  const { orderId } = await params

  const order = await getOrder({ id: orderId })

  if (!order) {
    notFound()
  }

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
