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

// import { getOrder } from '@/service/order'
import { Content } from './content'

interface Props {
  params: Promise<{ billingId: string }>
}

export default async function BillingPage({ params }: Props) {
  const { billingId } = await params

  const billing = await getOrder({ id: billingId })

  console.log(billing)

  if (!billing) {
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

      <Content data={billing} />
    </>
  )
}
