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
