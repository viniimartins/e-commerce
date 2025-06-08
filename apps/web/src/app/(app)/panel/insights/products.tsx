"use client"

import * as React from "react"
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"

interface ICharts {
  name: string
  productId: string
  quantitySold: number
}

const colors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
]

interface Props {
  data: ICharts[]
}

export function Products({ data }: Props) {
  const chartData = React.useMemo(
    () =>
      data.map((item, index) => ({
        ...item,
        fill: colors[index % colors.length],
      })),
    [data],
  )

  const chartConfig: ChartConfig = React.useMemo(() => {
    const cfg: ChartConfig = {}
    chartData.forEach((item) => {
      cfg[item.name] = { label: item.name, color: item.fill! }
    })
    return cfg
  }, [chartData])

  const uniqueProducts = React.useMemo(() => {
    const ids = new Set(data.map((item) => item.productId))
    return ids.size
  }, [data])

  const totalSold = data.reduce((acc, item) => acc + item.quantitySold, 0)

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center justify-between border-b pr-0 !pb-0 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Produtos</CardTitle>
          <CardDescription>
            Produtos mais vendidos nos últimos 30 dias
          </CardDescription>
        </div>
        <div className="flex">
          <div className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
            <span className="text-muted-foreground text-xs">Total vendidos</span>
            <span className="text-lg leading-none font-bold sm:text-3xl">
              {uniqueProducts}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="quantitySold"
              nameKey="name"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
