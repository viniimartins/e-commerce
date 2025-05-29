'use client'

import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useState } from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useDeleteProduct } from '@/hooks/mutation/product/delete'
import { useGetProducts } from '@/hooks/query/product/get'
import { useModal } from '@/hooks/use-modal'

import type { IProduct } from '../../types'
import { DataTable } from '../_components/table'
import { getColumns } from './columns'
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

  const {
    actions: deleteProductModalActions,
    isOpen: isDeleteProductModalOpen,
    target: deleteProductModalTarget,
  } = useModal<IProduct>()

  const {
    data: products,
    isFetching: isFetchingProducts,
    queryKey,
  } = useGetProducts({
    pageIndex,
    perPage,
  })
  const { mutateAsync: deleteProduct } = useDeleteProduct({ queryKey })

  const onChangeProductsTableParams = useCallback(
    (updatedParams: Partial<ProductsTableParams>) => {
      return setProductsTableParams((state) => ({ ...state, ...updatedParams }))
    },
    [],
  )

  function handleDeleteProduct() {
    deleteProductModalTarget &&
      deleteProduct({ product: { id: deleteProductModalTarget.id } })
  }

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

      <Card className="h-full rounded-none">
        <CardHeader>
          <CardTitle className="text-2xl">Produtos</CardTitle>
          <CardDescription>
            Gerencie todos os produtos da plataforma
          </CardDescription>
        </CardHeader>

        <CardContent className="h-full">
          <DataTable
            columns={getColumns({
              deleteProductModalActions,
              isLoading: isFetchingProducts,
            })}
            data={products?.data ?? []}
            meta={products?.meta}
            onChangeParams={onChangeProductsTableParams}
          />
        </CardContent>
      </Card>

      <AlertDialog
        open={isDeleteProductModalOpen}
        onOpenChange={deleteProductModalActions.close}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja deletar o produto?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser revertida. Isso irá deletar o produto
              permanentemente e remover seus dados dos nossos servidores.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteProduct}>
              Deletar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
