import { NotFoundError } from '@common/errors/not-found-error'
import {
  DELETE_PRODUCT_REPOSITORY_TOKEN,
  FIND_PRODUCT_BY_ID_REPOSITORY_TOKEN,
} from '@modules/products/constants'
import type {
  IDeleteProduct,
  IDeleteProductUseCase,
} from '@modules/products/domain/use-cases/delete-product-use-case'
import type {
  IDeleteProductRepository,
  IFindProductByIdRepository,
} from '@modules/products/repositories'
import { inject, injectable } from 'tsyringe'

@injectable()
class DeleteProductUseCase implements IDeleteProductUseCase {
  constructor(
    @inject(DELETE_PRODUCT_REPOSITORY_TOKEN)
    private readonly deleteProductRepository: IDeleteProductRepository,
    @inject(FIND_PRODUCT_BY_ID_REPOSITORY_TOKEN)
    private readonly findProductByIdRepository: IFindProductByIdRepository,
    // eslint-disable-next-line prettier/prettier
  ) { }

  async execute(
    params: IDeleteProduct.Request,
  ): Promise<IDeleteProduct.Response> {
    const product = await this.findProductByIdRepository.findById({
      productId: params.productId,
    })

    if (!product) {
      throw new NotFoundError('Product not found')
    }

    await this.deleteProductRepository.delete({
      productId: params.productId,
    })
  }
}

export { DeleteProductUseCase }
