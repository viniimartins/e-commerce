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
