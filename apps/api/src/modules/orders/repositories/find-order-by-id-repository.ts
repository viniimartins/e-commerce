import type { IOrderEntity } from '@modules/orders/domain/entities/order-entity'

namespace IFindOrderById {
  export type Params = {
    orderId: string
  }

  export type Response = IOrderEntity | null
}

interface IFindOrderByIdRepository {
  findById: (params: IFindOrderById.Params) => Promise<IFindOrderById.Response>
}

export { IFindOrderById, IFindOrderByIdRepository }
