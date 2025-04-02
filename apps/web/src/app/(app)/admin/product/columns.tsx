'use client'

import { ColumnDef } from '@tanstack/react-table'
import { PencilIcon } from 'lucide-react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
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
    cell: () => {
      return (
        <Button>
          <PencilIcon className="size-4" />
        </Button>
      )
    },
  },
]
