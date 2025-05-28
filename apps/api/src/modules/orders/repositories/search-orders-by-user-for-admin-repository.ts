import type { Paginated } from '@modules/common/helpers/paginated'
import type { IOrderEntity } from '@modules/orders/domain/entities/order-entity'

namespace ISearchOrdersByUserForAdmin {
  export type Params = Paginated.Params & {
    userId: string
  }

  export type Response = Paginated.Response<IOrderEntity>
}

interface ISearchOrdersByUserForAdminRepository {
  searchByUserForAdmin: (
    params: ISearchOrdersByUserForAdmin.Params,
  ) => Promise<ISearchOrdersByUserForAdmin.Response>
}

export { ISearchOrdersByUserForAdmin, ISearchOrdersByUserForAdminRepository }
