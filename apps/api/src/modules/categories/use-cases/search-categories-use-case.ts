import { SEARCH_CATEGORIES_REPOSITORY_TOKEN } from '@modules/categories/constants'
import type {
  ISearchCategories,
  ISearchCategoriesUseCase,
} from '@modules/categories/domain/use-cases/search-categories-use-case'
import type { ISearchCategoriesRepository } from '@modules/categories/repositories'
import { inject, injectable } from 'tsyringe'

@injectable()
class SearchCategoriesUseCase implements ISearchCategoriesUseCase {
  constructor(
    @inject(SEARCH_CATEGORIES_REPOSITORY_TOKEN)
    private readonly searchCategoriesRepository: ISearchCategoriesRepository,
    // eslint-disable-next-line prettier/prettier
  ) { }

  async execute(
    params: ISearchCategories.Request,
  ): Promise<ISearchCategories.Response> {
    const { pageIndex, search, perPage } = params

    const result = await this.searchCategoriesRepository.search({
      pageIndex,
      perPage,
      search,
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

export { SearchCategoriesUseCase }
