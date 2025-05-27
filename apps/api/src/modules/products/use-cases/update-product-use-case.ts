import { NotFoundError } from '@common/errors'
import {
  FIND_PRODUCT_BY_ID_REPOSITORY_TOKEN,
  UPDATE_PRODUCT_REPOSITORY_TOKEN,
} from '@modules/products/constants'
import type {
  IUpdateProduct,
  IUpdateProductUseCase,
} from '@modules/products/domain/use-cases'
import type {
  IFindProductByIdRepository,
  IUpdateProductRepository,
} from '@modules/products/repositories'
import { inject, injectable } from 'tsyringe'

@injectable()
class UpdateProductUseCase implements IUpdateProductUseCase {
  constructor(
    @inject(UPDATE_PRODUCT_REPOSITORY_TOKEN)
    private readonly updateProductRepository: IUpdateProductRepository,
    @inject(FIND_PRODUCT_BY_ID_REPOSITORY_TOKEN)
    private readonly findProductByIdRepository: IFindProductByIdRepository,
    // eslint-disable-next-line prettier/prettier
  ) { }

  async execute(
    data: IUpdateProduct.Request,
  ): Promise<IUpdateProduct.Response> {
    const { productId, ...rest } = data

    const product = await this.findProductByIdRepository.findById({
      productId,
    })

    if (!product) {
      throw new NotFoundError('Product not found')
    }

    const updatedProduct = await this.updateProductRepository.update({
      productId,
      ...rest,
    })

    return updatedProduct
  }
}

export { UpdateProductUseCase }
