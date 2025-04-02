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
import { formatPrice } from '@/utils/formatPrice'

import type { IProduct } from '../../types'

export const columns: ColumnDef<IProduct>[] = [
  {
    accessorKey: 'productImage',
    header: 'Imagem',
    cell: ({ row }) => {
      return (
        <div className="relative h-12 w-12">
          <Image
            src={row.original.productImage[0].url}
            alt={row.original.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )
    },
  },
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'description',
    header: 'Descrição',
    cell: ({ row }) => {
      return (
        <div className="max-w-96 truncate">
          <span>{row.original.description}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'price',
    header: 'Preço',
    cell: ({ row }) => {
      return <span>{formatPrice(row.original.price)}</span>
    },
  },
  {
    accessorKey: 'quantity',
    header: 'Quantidade',
  },
  {
    accessorKey: 'category',
    header: 'Categoria',
    cell: ({ row }) => {
      return <span>{row.original.category.name}</span>
    },
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row }) => {
      return (
        <div className="flex w-full items-center">
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
        </div>
      )
    },
  },
]
