import type { Metadata } from 'next'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { normalizeSlug } from '@/utils/normalized-slug'

import { Content } from './content'

interface Params {
  slug: string[]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params

  const { isEditing } = normalizeSlug(slug)

  return {
    title: isEditing ? 'Editar Produto' : 'Criar Produto',
  }
}

export default async function ProductCreateAndEditPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params

  const { isEditing } = normalizeSlug(slug)

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/panel">Painel</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {isEditing ? 'Editar Produto' : 'Adicionar Produto'}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Content />
    </>
  )
}
