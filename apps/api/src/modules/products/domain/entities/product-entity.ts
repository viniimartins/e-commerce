import type { IBaseEntity } from '@modules/common/domain/entities/base-entity'
import type { Decimal } from '@prisma/client/runtime/library'

interface IProductEntity extends IBaseEntity {
  name: string
  description: string
  price: Decimal | string
  costPrice: Decimal | string
  quantity: number
}

export { IProductEntity }
