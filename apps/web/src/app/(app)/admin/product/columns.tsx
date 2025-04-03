'use client'

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { TableCell, TableHead } from '@/components/ui/table'
import { formatPrice } from '@/utils/formatPrice'

import type { IProduct } from '../../types'

export const columns: ColumnDef<IProduct>[] = [
  {
    accessorKey: 'productImage',
    header: () => <TableHead>Imagem</TableHead>,
    cell: ({ row }) => {
      return (
        <TableCell>
          <div className="relative h-14 w-14">
            <Image
              src={row.original.productImage[0].url}
              alt={row.original.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </TableCell>
      )
    },
  },
  {
    accessorKey: 'name',
    header: () => <TableHead>Nome</TableHead>,
    cell: ({ row }) => <TableCell>{row.original.name}</TableCell>,
  },
  {
    accessorKey: 'description',
    header: () => <TableHead>Descrição</TableHead>,
    cell: ({ row }) => {
      return (
        <TableCell>
          <div className="w-full max-w-96 truncate">
            <span>{row.original.description}</span>
          </div>
        </TableCell>
      )
    },
  },
  {
    accessorKey: 'price',
    header: () => <TableHead>Preço</TableHead>,
    cell: ({ row }) => {
      return <TableCell>{formatPrice(row.original.price)}</TableCell>
    },
  },
  {
    accessorKey: 'quantity',
    header: () => <TableHead>Quantidade</TableHead>,
    cell: ({ row }) => <TableCell>{row.original.quantity}</TableCell>,
  },
  {
    accessorKey: 'category',
    header: () => <TableHead>Categoria</TableHead>,
    cell: ({ row }) => {
      return <TableCell>{row.original.category.name}</TableCell>
    },
  },
  {
    accessorKey: 'actions',
    header: () => <TableHead className="text-center">Ações</TableHead>,
    cell: ({ row }) => {
      return (
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href={`/admin/product/${row.original.id}/edit`}>
                <DropdownMenuItem>Editar</DropdownMenuItem>
              </Link>
              <DropdownMenuItem>Deletar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      )
    },
  },
]
