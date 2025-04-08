export interface ICustomer {
  taxId: string
  cellphone: string
  gatewayId: string
}

export interface IUser {
  id: string
  name: string
  email: string
  avatarUrl?: string
  createdAt: Date
}

export interface IProfile extends IUser {
  customer: ICustomer
}

export interface IUserWithOrders extends IUser {
  _count: {
    orders: number
  }
}

export interface ICategory {
  id: string
  name: string
  count: number
}

export interface IImage {
  id: string
  url: string
}

export interface IProductImage {
  productId: string
  imageId: string
  image: IImage
}

export interface IProduct {
  id: string
  name: string
  price: string
  description: string
  quantity: number
  category: ICategory
  productImage: IProductImage[]
}

export interface IWishlist {
  productId: string
  userId: string
  product: IProduct
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
  billing: OrderBilling
  currentStatus: OrderStatus
  gatewayId: string
  products: IProductBilling[]
  total: string
  userId: string
  url: string
  createdAt: Date
}

export interface IOrderById extends IOrder {
  address: IAddress
  status: IOrderStatus[]
}
