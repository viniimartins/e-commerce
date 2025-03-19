export interface IProduct {
  id: string
  name: string
  price: number
  description: string
  productImage: {
    id: string
    createdAt: Date
    url: string
    productId: string
  }[]
}

export interface ICategory {
  id: string
  name: string
}
