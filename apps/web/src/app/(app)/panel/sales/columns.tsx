/* eslint-disable prettier/prettier */
import { ColumnDef } from '@tanstack/react-table'
import { ArrowRight, Eye, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'

import { BadgeStatus } from '@/components/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { TableCell, TableHead } from '@/components/ui/table'
import type { ModalActions } from '@/types/modal'
import { formatPrice } from '@/utils/formatPrice'

import { type IOrderWithUser } from '../../types'


interface Props {
  isLoading: boolean
  viewOrdersModalActions: ModalActions<IOrderWithUser>
  handleNextStatusOrder: (orderId: string) => void
}

export function getColumns({
  isLoading,
  viewOrdersModalActions,
  handleNextStatusOrder,
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
    {
      accessorKey: 'status',
      header: () => <TableHead>Proximo Status</TableHead>,
      cell: ({ row }) => {
        return (
          <TableCell isLoading={isLoading}>
            <Button variant="outline" onClick={() => handleNextStatusOrder(row.original.id)}>
              Proximo Status

              <ArrowRight className="h-4 w-4" />
            </Button>
          </TableCell >
        )
      },
    },
    {
      accessorKey: 'actions',
      header: () => <TableHead className="text-center">Ações</TableHead>,
      size: 200,
      cell: ({ row }) => (
        <TableCell className='text-center'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href={`/order/${row.original.id}`}>
                <DropdownMenuItem>
                  Visualizar
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      ),
    },
  ]
}