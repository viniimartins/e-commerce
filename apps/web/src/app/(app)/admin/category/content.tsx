'use client'

import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useState } from 'react'

import { Button } from '@/components/ui/button'
import type { TableParams } from '@/types/paginated-response'

import { useGetCategories } from '../../hooks/use-get-category'
import { DataTable } from '../components/table'
import { columns } from './columns'

export function Content() {
  const [categoriesTableParams, setCategoriesTableParams] =
    useState<TableParams>({
      pageIndex: 1,
      perPage: 10,
    })

  const { pageIndex, perPage } = categoriesTableParams

  const onChangeCategoriesTableParams = useCallback(
    (updatedParams: Partial<TableParams>) => {
      return setCategoriesTableParams((state) => ({
        ...state,
        ...updatedParams,
      }))
    },
    [],
  )

  const { data: categories, isLoading } = useGetCategories({
    page: pageIndex,
    perPage,
  })

  return (
    <>
      <div className="flex justify-end">
        <Link href="/admin/product/create">
          <Button variant="outline">
            <PlusIcon className="size-4" />
            Adicionar Categoria
          </Button>
        </Link>
      </div>

      <div className="space-y-4 border p-8">
        <div className="space-y-2">
          <span className="text-2xl font-bold">Categorias</span>
          <p className="text-muted-foreground text-sm">
            Gerencie suas categorias e visualize seu desempenho de vendas
          </p>
        </div>

        <DataTable
          columns={columns}
          data={categories?.data ?? []}
          isLoading={isLoading}
          meta={categories?.meta}
          onChangeParams={onChangeCategoriesTableParams}
        />
      </div>
    </>
  )
}
