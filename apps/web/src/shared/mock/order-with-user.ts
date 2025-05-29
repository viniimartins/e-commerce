import {
  type IOrderWithUser,
  OrderBilling,
  OrderStatus,
  Role,
} from '@/app/(app)/types'
import type { PaginatedResponse } from '@/types/paginated-response'

export const mock: IOrderWithUser = {
  id: '1',
  billing: OrderBilling.PIX,
  currentStatus: OrderStatus.PENDING,
  gatewayId: '1',
  total: '10',
  userId: '1',
  url: 'https://www.abacatepay.com/',
  products: [],
  createdAt: new Date(),
  user: {
    sub: '1',
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatarUrl: 'https://via.placeholder.com/150',
    createdAt: new Date(),
    role: Role.USER,
  },
}

const content = Array.from({ length: 10 }, (_, index) => ({
  ...mock,
  id: `${index + 1}`,
  sub: `${index + 1}`,
}))

export const OrderWithUserMock: PaginatedResponse<IOrderWithUser> = {
  data: content,
  meta: {
    pageIndex: 0,
    perPage: 10,
    total: 10,
    totalPages: 1,
  },
}
