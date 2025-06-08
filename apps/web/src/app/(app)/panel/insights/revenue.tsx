'use client'

import * as React from 'react'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

interface ICharts {
  date: string
  revenue: number
  profit: number
}

interface Props {
  data: ICharts[]
}

const chartConfig = {
  revenue: {
    label: 'Faturamento',
    color: 'var(--chart-1)',
  },
  profit: {
    label: 'Lucro',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig

function formatMoney(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(value / 100))
}

export function Revenue(props: Props) {
  const { data } = props

  const totalRevenue = data.reduce((acc, item) => acc + item.revenue, 0)
  const totalProfit = data.reduce((acc, item) => acc + item.profit, 0)

  const tooltipFormatter = (value: number, name: string) => {
    if (name === 'revenue') return [`${formatMoney(value)}`, ' Faturamento']
    if (name === 'profit') return [`${formatMoney(value)}`, ' Lucro']

    return [value, name]
  }

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center justify-between border-b pr-0 !pb-0 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Receita</CardTitle>
          <CardDescription>Receita por dia nos últimos 30 dias</CardDescription>
        </div>
        <div className="flex">
          <div className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
            <span className="text-muted-foreground text-xs">
              {chartConfig.revenue.label}
            </span>
            <span className="text-lg leading-none font-bold sm:text-3xl">
              {formatMoney(totalRevenue)}
            </span>
          </div>
          <div className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
            <span className="text-muted-foreground text-xs">
              {chartConfig.profit.label}
            </span>
            <span className="text-lg leading-none font-bold sm:text-3xl">
              {formatMoney(totalProfit)}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={data}>
            <defs>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--chart-1)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--chart-1)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillProfit" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--chart-2)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--chart-2)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })
              }}
            />
            <YAxis
              tickFormatter={formatMoney}
              axisLine={false}
              tickLine={false}
              width={80}
              tickMargin={12}
            />
            <ChartTooltip
              cursor={false}
              formatter={tooltipFormatter}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })
                  }
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="revenue"
              type="natural"
              fill="url(#fillRevenue)"
              stroke="var(--chart-1)"
              stackId="a"
            />
            <Area
              dataKey="profit"
              type="natural"
              fill="url(#fillProfit)"
              stroke="var(--chart-2)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
