import type { IWishlist } from '@/app/(app)/types'
import type { PaginatedResponse } from '@/types/paginated-response'

export const mock: IWishlist = {
  product: {
    id: '1',
    name: 'Produto',
    price: '100',
    description: 'Descrição',
    quantity: 10,
    productImage: [
      {
        image: {
          id: '1',
          url: 'https://via.placeholder.com/150',
        },
        imageId: '1',
        productId: '1',
      },
    ],
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
  product: {
    ...mock.product,
    id: `${index + 1}`,
  },
}))

export const WishlistMock: PaginatedResponse<IWishlist> = {
  data: content,
  meta: {
    pageIndex: 0,
    perPage: 10,
    total: 10,
    totalPages: 1,
  },
}
