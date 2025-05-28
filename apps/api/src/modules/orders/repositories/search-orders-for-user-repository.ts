import type { Paginated } from '@modules/common/helpers/paginated'
import type { IOrderEntity } from '@modules/orders/domain/entities/order-entity'

namespace ISearchOrdersForUser {
  export type Params = Paginated.Params & {
    userId: string
  }

  export type Response = Paginated.Response<IOrderEntity>
}

interface ISearchOrdersForUserRepository {
  searchForUser: (
    params: ISearchOrdersForUser.Params,
  ) => Promise<ISearchOrdersForUser.Response>
}

export { ISearchOrdersForUser, ISearchOrdersForUserRepository }
