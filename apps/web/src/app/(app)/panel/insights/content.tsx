"use client"

import { useGetStatistics } from "@/hooks/query/statistics/get";
import { Sales } from "./sales";
import { Revenue } from "./revenue";
import { Products } from "./products";

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