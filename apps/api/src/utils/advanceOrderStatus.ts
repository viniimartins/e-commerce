import { OrderStatus } from '@prisma/client'

import { BadRequestError } from '@/http/routes/_errors/bad-request-error'

export function advanceOrderStatus(currentStatus: OrderStatus) {
  const statusOrder = {
    [OrderStatus.PENDING]: OrderStatus.PAID,
    [OrderStatus.PAID]: OrderStatus.PROCESSING,
    [OrderStatus.PROCESSING]: OrderStatus.SHIPPED,
    [OrderStatus.SHIPPED]: OrderStatus.DELIVERED,
    [OrderStatus.DELIVERED]: OrderStatus.DELIVERED,
  }

  const nextStatus = statusOrder[currentStatus]

  if (!nextStatus) {
    throw new BadRequestError('Cannot switch status')
  }

  return nextStatus
}
