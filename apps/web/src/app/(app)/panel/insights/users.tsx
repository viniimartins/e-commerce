'use client'

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

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
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

interface ICharts {
  month: string
  users: number
}

const chartConfig = {
  desktop: {
    label: 'Usuários',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig

interface Props {
  data: ICharts[]
}

export function Users(props: Props) {
  const { data } = props

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center justify-between border-b pr-0 !pb-0 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Usuários</CardTitle>
          <CardDescription>
            Usuários registrados nos últimos 12 meses
          </CardDescription>
        </div>
        <div className="flex">
          <div className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
            <span className="text-muted-foreground text-xs">Total</span>
            <span className="text-lg leading-none font-bold sm:text-3xl">
              {data.reduce((acc, cur) => acc + cur.users, 0)}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart data={data} height={250}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={16}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="users"
              name="Usuários"
              fill="var(--chart-1)"
              radius={8}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
