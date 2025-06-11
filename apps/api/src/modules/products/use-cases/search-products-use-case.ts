import { SEARCH_PRODUCTS_REPOSITORY_TOKEN } from '@modules/products/constants'
import type {
  ISearchProducts,
  ISearchProductsUseCase,
} from '@modules/products/domain/use-cases'
import type { ISearchProductsRepository } from '@modules/products/repositories'
import { inject, injectable } from 'tsyringe'

@injectable()
class SearchProductsUseCase implements ISearchProductsUseCase {
  constructor(
    @inject(SEARCH_PRODUCTS_REPOSITORY_TOKEN)
    private readonly searchProductsRepository: ISearchProductsRepository,
    // eslint-disable-next-line prettier/prettier
  ) { }

  async execute(
    params: ISearchProducts.Request,
  ): Promise<ISearchProducts.Response> {
    const { pageIndex, perPage, search, categoryId, maxPrice, minPrice } =
      params

    const result = await this.searchProductsRepository.search({
      pageIndex,
      perPage,
      search,
      categoryId,
      maxPrice,
      minPrice,
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

export { SearchProductsUseCase }
