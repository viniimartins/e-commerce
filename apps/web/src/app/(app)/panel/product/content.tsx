'use client'

import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useState } from 'react'

import { Button } from '@/components/ui/button'

import { DataTable } from '../components/table'
import { columns } from './columns'
import { useGetTableProducts } from './hooks/use-get-table-products'
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

  const { data: products, isLoading } = useGetTableProducts({
    page: pageIndex,
    perPage,
  })

  return (
    <>
      <div className="flex justify-end">
        <Link href="/panel/product/create">
          <Button variant="outline">
            <PlusIcon className="size-4" />
            Adicionar Produto
          </Button>
        </Link>
      </div>

      <div className="space-y-4 border p-8">
        <div className="space-y-2">
          <span className="text-2xl font-bold">Produtos</span>
          <p className="text-muted-foreground text-sm">
            Gerencie seus produtos e visualize seu desempenho de vendas
          </p>
        </div>

        <DataTable
          columns={columns({ isLoading })}
          data={products?.data ?? []}
          meta={products?.meta}
          onChangeParams={onChangeProductsTableParams}
        />
      </div>
    </>
  )
}
