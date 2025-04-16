import type { IBestSellerProduct } from '@/app/(app)/types'
import type { PaginatedResponse } from '@/types/paginated-response'

export const mock: IBestSellerProduct = {
  product: {
    id: '1',
    name: 'Produto',
    description: 'Descrição',
    price: '100',
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
  totalSold: 10,
}

const content = Array.from({ length: 10 }, (_, index) => ({
  ...mock,
  id: `${index + 1}`,
}))

export const BestSellerMock: PaginatedResponse<IBestSellerProduct> = {
  data: content,
  meta: {
    pageIndex: 0,
    perPage: 10,
    total: 10,
    totalPages: 1,
  },
}
