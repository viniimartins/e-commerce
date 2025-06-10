'use client'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetStatistics } from '@/hooks/query/statistics/get'
import { formatPrice } from '@/utils/format-price'

import { Products } from './products'
import { Revenue } from './revenue'
import { Sales } from './sales'
import { Users } from './users'

export function Content() {
  const { data: statistics, isLoading } = useGetStatistics()

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-none">
          <CardHeader className="relative">
            <CardDescription>Total de receita</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {!isLoading &&
                formatPrice(Number(statistics?.totalRevenue) / 100)}
              {isLoading && <Skeleton className="h-9 w-50" />}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="rounded-none">
          <CardHeader className="relative">
            <CardDescription>Total de lucro</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {!isLoading && formatPrice(Number(statistics?.totalProfit) / 100)}
              {isLoading && <Skeleton className="h-9 w-50" />}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="rounded-none">
          <CardHeader className="relative">
            <CardDescription>Total de pedidos</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {!isLoading && statistics?.totalOrders}
              {isLoading && <Skeleton className="h-9 w-50" />}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="rounded-none">
          <CardHeader className="relative">
            <CardDescription>Total de Usuários</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {!isLoading && statistics?.totalUsers}
              {isLoading && <Skeleton className="h-9 w-50" />}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="flex flex-col gap-4">
          <span className="text-xl font-semibold">Vendas</span>
          <Sales data={statistics?.dailySales ?? []} />
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-xl font-semibold">Receita</span>
          <Revenue data={statistics?.dailyMoney ?? []} />
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <span className="text-xl font-semibold">Produtos</span>
            <Products data={statistics?.topProducts ?? []} />
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-xl font-semibold">Usuários</span>
            <Users data={statistics?.monthlyUsers ?? []} />
          </div>
        </div>
      </div>
    </>
  )
}
