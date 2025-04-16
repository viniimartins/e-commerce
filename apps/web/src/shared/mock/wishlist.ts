import type { IWishlist } from '@/app/(app)/types'
import type { PaginatedResponse } from '@/types/paginated-response'

export const mock: IWishlist = {
  product: {
    id: '1',
    name: 'Produto',
    price: '100',
    description: 'Descrição',
    quantity: 10,
    productImage: [],
    category: {
      id: '1',
      name: 'Eletrônicos',
      count: 10,
    },
    createdAt: new Date(),
  },
  productId: '1',
  userId: '1',
}

const content = Array.from({ length: 8 }, (_, index) => ({
  ...mock,
  id: `${index + 1}`,
}))

export const WishlistMock: PaginatedResponse<IWishlist> = {
  data: content,
  meta: {
    pageIndex: 0,
    perPage: 10,
    total: 10,
    totalPages: 1,
  },
  __mock: true,
}
