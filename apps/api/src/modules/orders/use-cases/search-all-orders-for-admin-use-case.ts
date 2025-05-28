/* eslint-disable prettier/prettier */
import { SEARCH_ALL_ORDERS_FOR_ADMIN_REPOSITORY_TOKEN } from '@modules/orders/constants'
import type {
  ISearchAllOrdersForAdmin,
  ISearchAllOrdersForAdminUseCase,
} from '@modules/orders/domain/use-cases'
import type { ISearchAllOrdersForAdminRepository } from '@modules/orders/repositories'
import { inject, injectable } from 'tsyringe'

@injectable()
class SearchAllOrdersForAdminUseCase
  implements ISearchAllOrdersForAdminUseCase {
  constructor(
    @inject(SEARCH_ALL_ORDERS_FOR_ADMIN_REPOSITORY_TOKEN)
    private readonly searchAllOrdersForAdminRepository: ISearchAllOrdersForAdminRepository,
  ) { }

  async execute(
    params: ISearchAllOrdersForAdmin.Request,
  ): Promise<ISearchAllOrdersForAdmin.Response> {
    const { pageIndex, perPage } = params

    const result =
      await this.searchAllOrdersForAdminRepository.searchAllForAdmin({
        pageIndex,
        perPage,
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

export { SearchAllOrdersForAdminUseCase }
