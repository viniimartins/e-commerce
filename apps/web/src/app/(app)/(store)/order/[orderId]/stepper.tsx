import { CheckIcon } from 'lucide-react'

import {
  type IOrderStatus,
  OrderStatus,
  OrderStatusLabels,
} from '@/app/(app)/types'
import { cn } from '@/lib/utils'
import { formatDateLong } from '@/utils/format-date'

interface Props {
  status: IOrderStatus[]
}

export function Stepper({ status }: Props) {
  const statusMap = new Map<OrderStatus, IOrderStatus>()

  status.forEach((statusItem) => {
    statusMap.set(statusItem.status, statusItem)
  })

  const steps = [
    {
      id: 1,
      title: OrderStatusLabels[OrderStatus.PENDING],
      status: statusMap.has(OrderStatus.PENDING) ? 'completed' : 'pending',
      date: statusMap.has(OrderStatus.PENDING)
        ? formatDateLong(statusMap.get(OrderStatus.PENDING)!.createdAt)
        : 'Pendente',
    },
    {
      id: 2,
      title: OrderStatusLabels[OrderStatus.PAID],
      status: statusMap.has(OrderStatus.PAID) ? 'completed' : 'pending',
      date: statusMap.has(OrderStatus.PAID)
        ? formatDateLong(statusMap.get(OrderStatus.PAID)!.createdAt)
        : 'Pendente',
    },
    {
      id: 3,
      title: OrderStatusLabels[OrderStatus.PROCESSING],
      status: statusMap.has(OrderStatus.PROCESSING) ? 'completed' : 'pending',
      date: statusMap.has(OrderStatus.PROCESSING)
        ? formatDateLong(statusMap.get(OrderStatus.PROCESSING)!.createdAt)
        : 'Pendente',
    },
    {
      id: 4,
      title: OrderStatusLabels[OrderStatus.SHIPPED],
      status: statusMap.has(OrderStatus.SHIPPED) ? 'completed' : 'pending',
      date: statusMap.has(OrderStatus.SHIPPED)
        ? formatDateLong(statusMap.get(OrderStatus.SHIPPED)!.createdAt)
        : 'Pendente',
    },
    {
      id: 5,
      title: OrderStatusLabels[OrderStatus.DELIVERED],
      status: statusMap.has(OrderStatus.DELIVERED) ? 'completed' : 'pending',
      date: statusMap.has(OrderStatus.DELIVERED)
        ? formatDateLong(statusMap.get(OrderStatus.DELIVERED)!.createdAt)
        : 'Pendente',
    },
  ]

  return (
    <div className="flex w-full items-center justify-between">
      {steps.map((step, index) => (
        <div
          key={step.id}
          className="relative flex w-full flex-col items-center"
        >
          <div className="flex flex-col items-center">
            <div
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full',
                step.status === 'completed'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-300 text-gray-500',
              )}
            >
              {step.status === 'completed' && <CheckIcon className="h-4 w-4" />}
            </div>

            <div className="mt-2 text-center text-sm font-medium">
              {step.title}
            </div>
            <div className="text-muted-foreground mt-1 text-center text-xs">
              {step.date}
            </div>
          </div>

          {index < steps.length - 1 && (
            <div
              className={cn(
                'absolute top-4 left-[8.3rem] h-[2px] w-[calc(100%-3rem)]',
                step.status === 'completed' ? 'bg-green-500' : 'bg-gray-300',
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}
