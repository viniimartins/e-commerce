import { NotFoundError } from '@common/errors/not-found-error'
import { FIND_PRODUCT_BY_ID_REPOSITORY_TOKEN } from '@modules/products/constants'
import type {
  IFindProductById,
  IFindProductByIdUseCase,
} from '@modules/products/domain/use-cases'
import type { IFindProductByIdRepository } from '@modules/products/repositories'
import { inject, injectable } from 'tsyringe'

@injectable()
class FindProductByIdUseCase implements IFindProductByIdUseCase {
  constructor(
    @inject(FIND_PRODUCT_BY_ID_REPOSITORY_TOKEN)
    private readonly findProductByIdRepository: IFindProductByIdRepository,
    // eslint-disable-next-line prettier/prettier
  ) { }

  async execute(
    params: IFindProductById.Request,
  ): Promise<IFindProductById.Response> {
    const { productId } = params

    const foundProduct = await this.findProductByIdRepository.findById({
      productId,
    })

    if (!foundProduct) {
      throw new NotFoundError('Product not found')
    }

    return foundProduct
  }
}

export { FindProductByIdUseCase }
