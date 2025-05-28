import type { IOrderEntity } from '@modules/orders/domain/entities/order-entity'

namespace IFindOrderById {
  export type Request = {
    orderId: string
  }

  export type Response = IOrderEntity
}

interface IFindOrderByIdUseCase {
  execute: (params: IFindOrderById.Request) => Promise<IFindOrderById.Response>
}

export { IFindOrderById, IFindOrderByIdUseCase }
