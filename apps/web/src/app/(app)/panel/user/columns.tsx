import { ColumnDef } from '@tanstack/react-table'
import { Eye } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { TableCell, TableHead } from '@/components/ui/table'
import type { ModalActions } from '@/types/modal'
import { formatDateLong } from '@/utils/formatDate'

import type { IUserWithOrders } from '../../types'

interface Props {
  isLoading: boolean
  viewOrdersModalActions: ModalActions<IUserWithOrders>
}

export function getColumns({
  isLoading,
  viewOrdersModalActions,
}: Props): ColumnDef<IUserWithOrders>[] {
  return [
    {
      accessorKey: 'avatarUrl',
      header: () => <TableHead>Avatar</TableHead>,
      cell: ({ row }) => {
        return (
          <TableCell isLoading={isLoading}>
            <Avatar className="relative h-10 w-10 rounded-full">
              <AvatarImage
                src={row.original.avatarUrl}
                alt={row.original.name}
                className="object-cover"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </TableCell>
        )
      },
    },
    {
      accessorKey: 'name',
      header: () => <TableHead>Nome</TableHead>,
      cell: ({ row }) => {
        return <TableCell isLoading={isLoading}>{row.original.name}</TableCell>
      },
    },
    {
      accessorKey: 'email',
      header: () => <TableHead>Email</TableHead>,
      cell: ({ row }) => {
        return <TableCell isLoading={isLoading}>{row.original.email}</TableCell>
      },
    },
    {
      accessorKey: 'createdAt',
      header: () => <TableHead>Criado em</TableHead>,
      cell: ({ row }) => {
        return (
          <TableCell isLoading={isLoading}>
            {formatDateLong(row.original.createdAt)}
          </TableCell>
        )
      },
    },
    {
      accessorKey: 'orders',
      header: () => <TableHead>Pedidos</TableHead>,
      cell: ({ row }) => {
        return (
          <TableCell isLoading={isLoading}>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                {row.original._count.orders}
              </span>
              <Button
                size="icon"
                variant="outline"
                className="p-0"
                onClick={() => viewOrdersModalActions.open(row.original)}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </TableCell>
        )
      },
    },
  ]
}
