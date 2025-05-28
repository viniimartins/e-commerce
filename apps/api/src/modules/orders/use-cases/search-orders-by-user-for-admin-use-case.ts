/* eslint-disable prettier/prettier */
import { SEARCH_ORDERS_BY_USER_FOR_ADMIN_REPOSITORY_TOKEN } from '@modules/orders/constants'
import type {
  ISearchOrdersByUserForAdmin,
  ISearchOrdersByUserForAdminUseCase,
} from '@modules/orders/domain/use-cases'
import type { ISearchOrdersByUserForAdminRepository } from '@modules/orders/repositories'
import { inject, injectable } from 'tsyringe'

@injectable()
class SearchOrdersByUserForAdminUseCase
  implements ISearchOrdersByUserForAdminUseCase {
  constructor(
    @inject(SEARCH_ORDERS_BY_USER_FOR_ADMIN_REPOSITORY_TOKEN)
    private readonly searchOrdersByUserForAdminRepository: ISearchOrdersByUserForAdminRepository,
  ) { }

  async execute(
    params: ISearchOrdersByUserForAdmin.Request,
  ): Promise<ISearchOrdersByUserForAdmin.Response> {
    const { pageIndex, perPage, userId } = params

    const result =
      await this.searchOrdersByUserForAdminRepository.searchByUserForAdmin({
        pageIndex,
        perPage,
        userId
      })

    return {
      data: result.data,
      meta: {
        pageIndex: result.meta.pageIndex,
        perPage: result.meta.perPage,
        total: result.meta.total,
        totalPages: result.meta.totalPages,
      },
    }
  }
}

export { SearchOrdersByUserForAdminUseCase }
