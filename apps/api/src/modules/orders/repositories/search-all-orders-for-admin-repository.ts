import type { Paginated } from '@modules/common/helpers/paginated'
import type { IOrderEntity } from '@modules/orders/domain/entities/order-entity'

namespace ISearchAllOrdersForAdmin {
  export type Params = Paginated.Params

  export type Response = Paginated.Response<IOrderEntity>
}

interface ISearchAllOrdersForAdminRepository {
  searchAllForAdmin: (
    params: ISearchAllOrdersForAdmin.Params,
  ) => Promise<ISearchAllOrdersForAdmin.Response>
}

export { ISearchAllOrdersForAdmin, ISearchAllOrdersForAdminRepository }
