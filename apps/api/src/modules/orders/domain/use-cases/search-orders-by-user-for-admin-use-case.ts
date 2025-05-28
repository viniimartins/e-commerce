import { Paginated } from '@modules/common/helpers/paginated'
import type { IOrderEntity } from '@modules/orders/domain/entities/order-entity'

namespace ISearchOrdersByUserForAdmin {
  export type Request = Paginated.Params & {
    userId: string
  }

  export type Response = Paginated.Response<IOrderEntity>
}

interface ISearchOrdersByUserForAdminUseCase {
  execute: (
    params: ISearchOrdersByUserForAdmin.Request,
  ) => Promise<ISearchOrdersByUserForAdmin.Response>
}

export { ISearchOrdersByUserForAdmin, ISearchOrdersByUserForAdminUseCase }
