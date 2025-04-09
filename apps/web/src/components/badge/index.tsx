import type { ComponentProps } from 'react'

import { OrderStatus } from '@/app/(app)/types'
import { Badge, badgeVariants } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface Props extends ComponentProps<'span'> {
  status: OrderStatus
  className?: string
}

export function BadgeStatus({ status, className, ...props }: Props) {
  const statusColorMap: Record<
    OrderStatus,
    'default' | 'secondary' | 'destructive' | 'outline'
  > = {
    [OrderStatus.PENDING]: 'outline',
    [OrderStatus.PAID]: 'default',
    [OrderStatus.PROCESSING]: 'secondary',
    [OrderStatus.SHIPPED]: 'default',
    [OrderStatus.DELIVERED]: 'destructive',
  }

  const variant = statusColorMap[status]

  return (
    <Badge
      variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    >
      {status}
    </Badge>
  )
}
