import type { IProduct } from '@/app/(app)/types'
import type { PaginatedResponse } from '@/types/paginated-response'

export const mock: IProduct = {
  id: '1',
  name: 'Produto',
  description: 'Descrição',
  price: '100',
  costPrice: '80',
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
}

const content = Array.from({ length: 10 }, (_, index) => ({
  ...mock,
  id: `${index + 1}`,
}))

export const ProductsMock: PaginatedResponse<IProduct> = {
  data: content,
  meta: {
    pageIndex: 0,
    perPage: 10,
    total: 10,
    totalPages: 1,
  },
}
