import type { IBaseEntity } from '@modules/common/domain/entities/base-entity'
import type {
  OrderBilling as OrderBillingPrisma,
  OrderStatus as OrderStatusPrisma,
} from '@prisma/client'
import type { Decimal } from '@prisma/client/runtime/library'

enum OrderBilling {
  PIX = 'PIX',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
}

interface IOrderEntity extends IBaseEntity {
  billing: OrderBilling | OrderBillingPrisma
  currentStatus: OrderStatus | OrderStatusPrisma
  gatewayId: string
  total: string | Decimal
  userId: string
  url: string
}

export { IOrderEntity }
