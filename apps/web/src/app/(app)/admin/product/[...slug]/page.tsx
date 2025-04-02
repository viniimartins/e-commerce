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

interface Params {
  slug: string[]
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const { isEditing } = normalizeSlug(params.slug)

  const title = isEditing ? 'Editar Produto' : 'Criar Produto'

  return {
    title,
  }
}

export default function ProductCreateAndEditPage({
  params,
}: {
  params: Params
}) {
  const { isEditing } = normalizeSlug(params.slug)

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Painel</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {isEditing ? 'Editar Produto' : 'Criar Produto'}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-2xl font-semibold">
        {isEditing ? 'Editar Produto' : 'Criar Produto'}
      </h1>
    </>
  )
}
