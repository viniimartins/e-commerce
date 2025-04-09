/* eslint-disable prettier/prettier */
import { ColumnDef } from '@tanstack/react-table'
import { Eye, MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { TableCell, TableHead } from '@/components/ui/table'
import type { ModalActions } from '@/types/modal'

import type { ICategory } from '../../types'


interface Props {
  categoryModalActions: ModalActions<ICategory>
  deleteCategoryModalActions: ModalActions<ICategory>
  viewProductsModalActions: ModalActions<ICategory>
  isLoading: boolean
}

export function getColumns({
  categoryModalActions,
  deleteCategoryModalActions,
  viewProductsModalActions,
  isLoading,
}: Props): ColumnDef<ICategory>[] {
  return [
    {
      accessorKey: 'name',
      header: () => <TableHead>Nome</TableHead>,
      cell: ({ row }) => {
        return <TableCell isLoading={isLoading} className="w-full">{row.original.name}</TableCell>
      },
    },
    {
      accessorKey: 'count',
      header: () => <TableHead className="text-center">Produtos</TableHead>,
      cell: ({ row }) => {
        return <TableCell isLoading={isLoading}>
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-medium">{row.original.count}</span>
            <Button size="icon" variant="outline" className="p-0" onClick={() => viewProductsModalActions.open(row.original)}>
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </TableCell>
      },
    },
    {
      accessorKey: 'actions',
      header: () => <TableHead className="text-center">Ações</TableHead>,
      size: 200,
      cell: ({ row }) => (
        <TableCell className='px-10'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => categoryModalActions.open(row.original)}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => deleteCategoryModalActions.open(row.original)}>
                Deletar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      ),
    },
  ]
}