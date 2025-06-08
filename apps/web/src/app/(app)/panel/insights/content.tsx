'use client'

import { useGetStatistics } from '@/hooks/query/statistics/get'

import { Products } from './products'
import { Revenue } from './revenue'
import { Sales } from './sales'

export function Content() {
  const { data: statistics } = useGetStatistics()

  return (
    <>
      <Sales data={statistics?.dailySales ?? []} />
      <Revenue data={statistics?.dailyMoney ?? []} />

      <Products data={statistics?.topProducts ?? []} />
    </>
  )
}
