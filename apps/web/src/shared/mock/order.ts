import { type IOrder, OrderBilling, OrderStatus } from '@/app/(app)/types'
import type { PaginatedResponse } from '@/types/paginated-response'

export const mock: IOrder = {
  id: '1',
  billing: OrderBilling.PIX,
  currentStatus: OrderStatus.PENDING,
  gatewayId: '1',
  total: '10',
  userId: '1',
  url: 'https://www.abacatepay.com/',
  products: [],
  createdAt: new Date(),
}

const content = Array.from({ length: 8 }, (_, index) => ({
  ...mock,
  id: `${index + 1}`,
}))

export const OrderMock: PaginatedResponse<IOrder> = {
  data: content,
  meta: {
    pageIndex: 0,
    perPage: 10,
    total: 10,
    totalPages: 1,
  },
}
