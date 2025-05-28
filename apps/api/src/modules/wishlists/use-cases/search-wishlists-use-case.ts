import { SEARCH_WISHLISTS_REPOSITORY_TOKEN } from '@modules/wishlists/constants'
import type {
  ISearchWishlists,
  ISearchWishlistsUseCase,
} from '@modules/wishlists/domain/use-cases/search-wishlists-use-case'
import type { ISearchWishlistsRepository } from '@modules/wishlists/repositories'
import { inject, injectable } from 'tsyringe'

@injectable()
class SearchWishlistsUseCase implements ISearchWishlistsUseCase {
  constructor(
    @inject(SEARCH_WISHLISTS_REPOSITORY_TOKEN)
    private readonly searchWishlistsRepository: ISearchWishlistsRepository,
    // eslint-disable-next-line prettier/prettier
  ) { }

  async execute(
    params: ISearchWishlists.Request,
  ): Promise<ISearchWishlists.Response> {
    const { pageIndex, perPage, userId } = params

    const result = await this.searchWishlistsRepository.search({
      pageIndex,
      perPage,
      userId,
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

export { SearchWishlistsUseCase }
