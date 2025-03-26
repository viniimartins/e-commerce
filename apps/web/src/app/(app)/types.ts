export interface ICustomer {
  taxId: string
  cellphone: string
}

export interface IUser {
  id: string
  name: string
  email: string
  avatarUrl: string
  customer: ICustomer
}

export interface ICategory {
  id: string
  name: string
}

export interface IProduct {
  id: string
  name: string
  price: number
  description: string
  quantity: number
  category: ICategory
  productImage: {
    id: string
    createdAt: Date
    url: string
    productId: string
  }[]
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
}

export enum OrderBilling {
  PIX = 'PIX',
}

export interface IProductBilling {
  orderId: string
  quantity: number
  productId: string
  product: IProduct
}

export interface IBilling {
  id: string
  billing: OrderBilling
  status: OrderStatus
  products: IProductBilling[]
  total: number
  createdAt: Date
  updatedAt: Date
  userId: string
}
