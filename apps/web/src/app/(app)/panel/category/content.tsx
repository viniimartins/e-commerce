'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle, PlusIcon } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
import { useModal } from '@/hooks/use-modal'
import type { TableParams } from '@/types/paginated-response'

import { useGetCategories } from '../../hooks/use-get-category'
import type { ICategory } from '../../types'
import { DataTable } from '../components/table'
import { getColumns } from './columns'
import { useCreateCategory } from './use-create-category'

const formCategorySchema = z.object({
  name: z.string().min(2, {
    message: 'O nome deve conter pelo menos 2 caracteres',
  }),
})

type FormCategorySchema = z.infer<typeof formCategorySchema>

export function Content() {
  const {
    actions: modalActions,
    isOpen: isModalOpen,
    target: modalTarget,
  } = useModal<ICategory>()

  const { mutate: createCategory } = useCreateCategory()

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

  function onSubmit(values: FormCategorySchema) {
    const { name } = values

    createCategory({ category: { name } })
  }

  useEffect(() => {
    reset({
      name: modalTarget?.name,
    })
  }, [reset, modalTarget, isModalOpen])

  return (
    <>
      <div className="flex justify-end">
        <Button variant="outline" onClick={() => modalActions.open()}>
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
          columns={getColumns({ modalActions })}
          data={categories?.data ?? []}
          isLoading={isLoading}
          meta={categories?.meta}
          onChangeParams={onChangeCategoriesTableParams}
        />
      </div>

      <Dialog open={isModalOpen} onOpenChange={modalActions.close}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {modalTarget ? 'Editar Categoria' : 'Adicionar Categoria'}
            </DialogTitle>
            <DialogDescription>
              {modalTarget
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
    </>
  )
}
