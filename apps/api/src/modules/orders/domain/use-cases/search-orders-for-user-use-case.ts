import { Paginated } from '@modules/common/helpers/paginated'
import type { IOrderEntity } from '@modules/orders/domain/entities/order-entity'

namespace ISearchOrdersForUser {
  export type Request = Paginated.Params & {
    userId: string
  }

  export type Response = Paginated.Response<IOrderEntity>
}

interface ISearchOrdersForUserUseCase {
  execute: (
    params: ISearchOrdersForUser.Request,
  ) => Promise<ISearchOrdersForUser.Response>
}

export { ISearchOrdersForUser, ISearchOrdersForUserUseCase }
