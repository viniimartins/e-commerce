import { BEST_SELLERS_PRODUCTS_REPOSITORY_TOKEN } from '@modules/products/constants'
import type {
  IBestSellersProducts,
  IBestSellersProductsUseCase,
} from '@modules/products/domain/use-cases/best-sellers-products-use-case'
import type { IBestSellersProductsRepository } from '@modules/products/repositories'
import { inject, injectable } from 'tsyringe'

@injectable()
class BestSellersProductsUseCase implements IBestSellersProductsUseCase {
  constructor(
    @inject(BEST_SELLERS_PRODUCTS_REPOSITORY_TOKEN)
    private readonly bestSellersProductsRepository: IBestSellersProductsRepository,
    // eslint-disable-next-line prettier/prettier
  ) { }

  async execute(
    params: IBestSellersProducts.Request,
  ): Promise<IBestSellersProducts.Response> {
    const { pageIndex, perPage } = params

    const result = await this.bestSellersProductsRepository.bestSellers({
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

export { BestSellersProductsUseCase }
