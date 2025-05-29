/* eslint-disable prettier/prettier */
import { ColumnDef } from '@tanstack/react-table'
import { Eye } from 'lucide-react'

import { BadgeStatus } from '@/components/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { TableCell, TableHead } from '@/components/ui/table'
import type { ModalActions } from '@/types/modal'
import { formatPrice } from '@/utils/format-price'

import { type IOrderWithUser } from '../types'



interface Props {
  isLoading: boolean
  viewOrdersModalActions: ModalActions<IOrderWithUser>
}

export function getOrdersColumns({
  isLoading,
  viewOrdersModalActions,
}: Props): ColumnDef<IOrderWithUser>[] {
  return [
    {
      accessorKey: 'user.name',
      header: () => <TableHead>Nome</TableHead>,
      cell: ({ row }) => {
        return (
          <TableCell isLoading={isLoading} className='flex items-center gap-2'>
            <Avatar className="relative h-10 w-10 rounded-full">
              <AvatarImage
                src={row.original.user.avatarUrl}
                alt={row.original.user.name}
                className="object-cover"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span>{row.original.user.name}</span>
          </TableCell>
        )
      },
    },
    {
      accessorKey: 'products',
      header: () => <TableHead className='text-center'>Produtos</TableHead>,
      cell: ({ row }) => {
        return (
          <TableCell isLoading={isLoading}>
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm font-medium">
                {row.original.products.length}
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
    {
      accessorKey: 'total',
      header: () => <TableHead>Total</TableHead>,
      cell: ({ row }) => {
        return (
          <TableCell isLoading={isLoading} >
            {formatPrice(Number(row.original.total) / 100)}
          </TableCell>
        )
      },
    },
    {
      accessorKey: 'currentStatus',
      header: () => <TableHead>Status</TableHead>,
      cell: ({ row }) => {

        return (
          <TableCell isLoading={isLoading}>
            <BadgeStatus status={row.original.currentStatus} className='h-9' />
          </TableCell>
        )
      },
    },
  ]
}