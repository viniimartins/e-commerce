export interface ICustomer {
  taxId: string
  cellphone: string
  gatewayId: string
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
  productsCount: number
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

export interface IAddress {
  id: string
  cep: string
  address: string
  number: string
  complement: string | null | undefined
  neighborhood: string
  city: string
  state: string
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
}

export const OrderStatusLabels: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]: 'Aguardando pagamento',
  [OrderStatus.PAID]: 'Pagamento aprovado',
  [OrderStatus.PROCESSING]: 'Pedido processando',
  [OrderStatus.SHIPPED]: 'Pedido enviado',
  [OrderStatus.DELIVERED]: 'Pedido entregue',
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

export interface IOrderStatus {
  id: string
  status: OrderStatus
  createdAt: Date
  updatedAt: Date
}

export interface IOrder {
  id: string
  url: string
  gatewayId: string
  billing: OrderBilling
  status: IOrderStatus[]
  currentStatus: OrderStatus
  products: IProductBilling[]
  address: IAddress
  total: number
  createdAt: Date
  updatedAt: Date
  userId: string
}
