/* eslint-disable prettier/prettier */
import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'

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

interface ColumnsProps {
  modalActions: ModalActions<ICategory>
}

export const getColumns = ({
  modalActions,
}: ColumnsProps): ColumnDef<ICategory>[] => [
    {
      accessorKey: 'name',
      header: () => <TableHead>Nome</TableHead>,
      cell: ({ row }) => {
        return <TableCell className="w-full">{row.original.name}</TableCell>
      },
    },
    {
      accessorKey: 'actions',
      header: () => <TableHead className="text-center">Ações</TableHead>,
      size: 200,
      cell: ({ row }) => (
        <TableCell className="flex justify-end gap-2">
          <Button variant="link">Ver produtos</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => modalActions.open(row.original)}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem>Deletar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      ),
    },
  ]
