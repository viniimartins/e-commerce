import { SEARCH_USERS_REPOSITORY_TOKEN } from '@modules/users/constants'
import type {
  ISearchUsers,
  ISearchUsersUseCase,
} from '@modules/users/domain/use-cases'
import type { ISearchUsersRepository } from '@modules/users/repositories'
import { inject, injectable } from 'tsyringe'

@injectable()
class SearchUsersUseCase implements ISearchUsersUseCase {
  constructor(
    @inject(SEARCH_USERS_REPOSITORY_TOKEN)
    private readonly searchUsersRepository: ISearchUsersRepository,
    // eslint-disable-next-line prettier/prettier
  ) { }

  async execute(params: ISearchUsers.Request): Promise<ISearchUsers.Response> {
    const { pageIndex, perPage } = params

    const result = await this.searchUsersRepository.search({
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

export { SearchUsersUseCase }
