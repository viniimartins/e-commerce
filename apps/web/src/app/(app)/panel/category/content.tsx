'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle, PlusIcon } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useModal } from '@/hooks/use-modal'
import type { TableParams } from '@/types/paginated-response'
import { formatPrice } from '@/utils/formatPrice'

import { DataTable } from '../components/table'
import { getColumns } from './columns'
import { useCreateCategory } from './hooks/use-create-category'
import { useDeleteCategory } from './hooks/use-delete-category'
import { useGetCategoriesWithProducts } from './hooks/use-get-categories-with-products'
import type { ICategoryWithProducts } from './types'

const formCategorySchema = z.object({
  name: z.string().min(2, {
    message: 'O nome deve conter pelo menos 2 caracteres',
  }),
})

type FormCategorySchema = z.infer<typeof formCategorySchema>

export function Content() {
  const [categoriesTableParams, setCategoriesTableParams] =
    useState<TableParams>({
      pageIndex: 1,
      perPage: 10,
    })

  const form = useForm<FormCategorySchema>({
    resolver: zodResolver(formCategorySchema),
    defaultValues: {
      name: '',
    },
  })

  const {
    formState: { isSubmitting },
    reset,
  } = form

  const {
    actions: categoryModalActions,
    isOpen: isCategoryModalOpen,
    target: categoryModalTarget,
  } = useModal<ICategoryWithProducts>()

  const {
    actions: deleteCategoryModalActions,
    isOpen: isDeleteCategoryModalOpen,
    target: deleteCategoryModalTarget,
  } = useModal<ICategoryWithProducts>()

  const {
    actions: viewProductsModalActions,
    isOpen: isViewProductsModalOpen,
    target: viewProductsModalTarget,
  } = useModal<ICategoryWithProducts>()

  const { pageIndex, perPage } = categoriesTableParams

  const {
    data: categories,
    isLoading,
    queryKey,
  } = useGetCategoriesWithProducts({
    page: pageIndex,
    perPage,
  })

  const { mutate: createCategory } = useCreateCategory({ queryKey })

  const onChangeCategoriesTableParams = useCallback(
    (updatedParams: Partial<TableParams>) => {
      return setCategoriesTableParams((state) => ({
        ...state,
        ...updatedParams,
      }))
    },
    [],
  )

  const { mutateAsync: deleteCategory } = useDeleteCategory({ queryKey })

  function onSubmit(values: FormCategorySchema) {
    const { name } = values

    createCategory(
      { category: { name } },
      {
        onSuccess: () => {
          categoryModalActions.close()
        },
      },
    )
  }

  function handleDeleteCategory() {
    deleteCategoryModalTarget &&
      deleteCategory({ category: { id: deleteCategoryModalTarget.id } })
  }

  useEffect(() => {
    reset({
      name: categoryModalTarget?.name ?? '',
    })
  }, [reset, categoryModalTarget, isCategoryModalOpen])

  return (
    <>
      <div className="flex justify-end">
        <Button variant="outline" onClick={() => categoryModalActions.open()}>
          <PlusIcon className="size-4" />
          Adicionar Categoria
        </Button>
      </div>

      <div className="space-y-4 border p-8">
        <div className="space-y-2">
          <span className="text-2xl font-bold">Categorias</span>
          <p className="text-muted-foreground text-sm">
            Gerencie suas categorias e visualize seu desempenho de vendas
          </p>
        </div>

        <DataTable
          columns={getColumns({
            categoryModalActions,
            deleteCategoryModalActions,
            viewProductsModalActions,
          })}
          data={categories?.data ?? []}
          isLoading={isLoading}
          meta={categories?.meta}
          onChangeParams={onChangeCategoriesTableParams}
        />
      </div>

      <Dialog
        open={isCategoryModalOpen}
        onOpenChange={categoryModalActions.close}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {categoryModalTarget ? 'Editar Categoria' : 'Adicionar Categoria'}
            </DialogTitle>
            <DialogDescription>
              {categoryModalTarget
                ? 'Edite a categoria para gerenciar seus produtos'
                : 'Adicione uma nova categoria para gerenciar seus produtos'}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} id="form-category">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome da categoria</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome da categoria" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancelar
              </Button>
            </DialogClose>

            <Button type="submit" form="form-category" disabled={isSubmitting}>
              Adicionar
              {isSubmitting && (
                <LoaderCircle size={18} className="animate-spin" />
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={isDeleteCategoryModalOpen}
        onOpenChange={deleteCategoryModalActions.close}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja deletar a categoria?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser revertida. Isso irá deletar a categoria
              permanentemente e remover seus dados dos nossos servidores.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCategory}>
              Deletar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog
        open={isViewProductsModalOpen}
        onOpenChange={viewProductsModalActions.close}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Visualizar produtos da categoria</DialogTitle>
            <DialogDescription>
              Visualize todos os produtos da categoria
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="h-96 pr-3">
            {viewProductsModalTarget?.products.map((product, index) => {
              const lastIndex =
                viewProductsModalTarget?.products.length === index + 1

              const { id, name, price, productImage, quantity } = product

              return (
                <div key={id}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="dark:bg-muted-foreground/10 relative mb-1 flex h-[3.5rem] w-[3.5rem] items-center justify-center bg-neutral-100 p-0 dark:border">
                        <Image
                          src={productImage[0].url}
                          alt="product"
                          fill
                          quality={100}
                          priority
                          className="object-cover p-1"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>

                      <div className="flex h-full flex-col justify-between">
                        <span className="text-base font-medium">{name}</span>

                        <span className="text-muted-foreground text-sm">
                          {quantity} un.
                        </span>
                      </div>
                    </div>

                    <span className="text-sm font-medium">
                      {formatPrice(price)}
                    </span>
                  </div>

                  {!lastIndex && <Separator className="my-2" />}
                </div>
              )
            })}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  )
}
