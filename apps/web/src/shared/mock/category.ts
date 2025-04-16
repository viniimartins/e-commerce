import type { ICategory } from '@/app/(app)/types'
import type { PaginatedResponse } from '@/types/paginated-response'

export const mock: ICategory = {
  id: '1',
  name: 'Eletrônicos',
  count: 10,
}

const content = Array.from({ length: 10 }, (_, index) => ({
  ...mock,
  id: `${index + 1}`,
}))

export const CategoryMock: PaginatedResponse<ICategory> = {
  data: content,
  meta: {
    pageIndex: 0,
    perPage: 10,
    total: 10,
    totalPages: 1,
  },
}
