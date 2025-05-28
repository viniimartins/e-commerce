import type { OrderStatus } from '@prisma/client'

namespace INextStatusOrder {
  export type Params = {
    status: OrderStatus
    orderId: string
  }

  export type Response = void
}

interface INextStatusOrderRepository {
  nextStatus: (
    params: INextStatusOrder.Params,
  ) => Promise<INextStatusOrder.Response>
}

export { INextStatusOrder, INextStatusOrderRepository }
