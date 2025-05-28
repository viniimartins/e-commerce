/* eslint-disable prettier/prettier */
import { SEARCH_ORDERS_FOR_USER_REPOSITORY_TOKEN } from '@modules/orders/constants'
import type {
  ISearchOrdersForUser,
  ISearchOrdersForUserUseCase,
} from '@modules/orders/domain/use-cases'
import type { ISearchOrdersForUserRepository } from '@modules/orders/repositories'
import { inject, injectable } from 'tsyringe'

@injectable()
class SearchOrdersForUserUseCase implements ISearchOrdersForUserUseCase {
  constructor(
    @inject(SEARCH_ORDERS_FOR_USER_REPOSITORY_TOKEN)
    private readonly searchOrdersForUserRepository: ISearchOrdersForUserRepository,
  ) { }

  async execute(
    params: ISearchOrdersForUser.Request,
  ): Promise<ISearchOrdersForUser.Response> {
    const { pageIndex, perPage, userId } = params

    const result = await this.searchOrdersForUserRepository.searchForUser({
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

export { SearchOrdersForUserUseCase }
