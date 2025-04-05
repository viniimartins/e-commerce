import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { getProduct } from '@/service/product'

import { Content } from './content'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productId: string }>
}): Promise<Metadata> {
  const { productId } = await params

  const data = await getProduct({ id: productId })

  return {
    title: `${data?.name}`,
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>
}) {
  const { productId } = await params

  const product = await getProduct({ id: productId })

  if (!product) {
    notFound()
  }
  return (
    <>
      <Breadcrumb className="mt-14">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product?.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Content product={product} />
    </>
  )
}
