import { Paginated } from '@modules/common/helpers/paginated'
import type { IOrderEntity } from '@modules/orders/domain/entities/order-entity'

namespace ISearchAllOrdersForAdmin {
  export type Request = Paginated.Params

  export type Response = Paginated.Response<IOrderEntity>
}

interface ISearchAllOrdersForAdminUseCase {
  execute: (
    params: ISearchAllOrdersForAdmin.Request,
  ) => Promise<ISearchAllOrdersForAdmin.Response>
}

export { ISearchAllOrdersForAdmin, ISearchAllOrdersForAdminUseCase }
