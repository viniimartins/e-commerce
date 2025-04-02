'use client'

import { PlusIcon } from 'lucide-react'
import { useCallback, useState } from 'react'

import { Button } from '@/components/ui/button'

import { useGetProducts } from '../../hooks/use-get-products'
import { DataTable } from '../components/table'
import { columns } from './columns'

interface ProductsTableParams {
  pageIndex: number
  perPage: number
}

export function Content() {
  const [productsTableParams, setProductsTableParams] =
    useState<ProductsTableParams>({
      pageIndex: 1,
      perPage: 10,
    })

  const { pageIndex, perPage } = productsTableParams

  const onChangeProductsTableParams = useCallback(
    (updatedParams: Partial<ProductsTableParams>) => {
      return setProductsTableParams((state) => ({ ...state, ...updatedParams }))
    },
    [],
  )

  const { data: products, isLoading } = useGetProducts({
    page: pageIndex,
    perPage,
  })

  return (
    <>
      <div className="flex justify-end">
        <Button>
          <PlusIcon className="size-4" />
          Adicionar Categoria
        </Button>
      </div>

      <div className="space-y-4 border p-8">
        <div className="space-y-2">
          <span className="text-2xl font-bold">Produtos</span>
          <p className="text-muted-foreground text-sm">
            Gerencie seus produtos e visualize seu desempenho de vendas
          </p>
        </div>

        <DataTable
          columns={columns}
          data={products?.data ?? []}
          isLoading={isLoading}
          meta={products?.meta}
          onChangeParams={onChangeProductsTableParams}
        />
      </div>
    </>
  )
}
