import { type IUserWithOrders, Role } from '@/app/(app)/types'
import type { PaginatedResponse } from '@/types/paginated-response'

export const mock: IUserWithOrders = {
  id: '1',
  name: 'Produto',
  email: 'produto@produto.com',
  avatarUrl: 'https://via.placeholder.com/150',
  createdAt: new Date(),
  role: Role.USER,
  _count: {
    orders: 10,
  },
}

const content = Array.from({ length: 10 }, (_, index) => ({
  ...mock,
  id: `${index + 1}`,
}))

export const UsersMock: PaginatedResponse<IUserWithOrders> = {
  data: content,
  meta: {
    pageIndex: 0,
    perPage: 10,
    total: 10,
    totalPages: 1,
  },
  __mock: true,
}
