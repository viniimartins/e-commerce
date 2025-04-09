/* eslint-disable prettier/prettier */
import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { TableCell, TableHead } from '@/components/ui/table'
import { formatPrice } from '@/utils/formatPrice'

import type { IBestSellerProduct } from '../types'

interface ColumnsProps {
  isLoading: boolean
}

export function getBestSellerProductsColumns({
  isLoading,
}: ColumnsProps): ColumnDef<IBestSellerProduct>[] {
  return [
    {
      accessorKey: 'product.name',
      header: () => <TableHead>Nome</TableHead>,
      cell: ({ row }) => {
        return (
          <TableCell isLoading={isLoading} className='flex items-center gap-2'>
            <Avatar className="relative h-10 w-10 rounded-full">
              <AvatarImage
                src={row.original.product.productImage[0].image.url}
                alt={row.original.product.name}
                className="object-cover"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span>{row.original.product.name}</span>
          </TableCell>
        )
      },
    },
    {
      accessorKey: 'product.price',
      header: () => <TableHead>Preço</TableHead>,
      cell: ({ row }) => {
        return (
          <TableCell isLoading={isLoading} >
            {formatPrice(Number(row.original.product.price) / 100)}
          </TableCell>
        )
      },
    },
    {
      accessorKey: 'totalSold',
      header: () => <TableHead>Total</TableHead>,
      cell: ({ row }) => {
        return (
          <TableCell isLoading={isLoading} >
            {row.original.totalSold}
          </TableCell>
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
              <Link href={`/shop/${row.original.product.id}`}>
                <DropdownMenuItem>
                  Visualizar
                </DropdownMenuItem>
              </Link>
              <Link href={`/panel/product/${row.original.product.id}/edit`}>
                <DropdownMenuItem>
                  Editar
                </DropdownMenuItem>
              </Link>

            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      ),
    },
  ]
}