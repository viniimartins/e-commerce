import { BadRequestError } from '@common/errors'
import { CREATE_PRODUCT_REPOSITORY_TOKEN } from '@modules/products/constants'
import type {
  ICreateProduct,
  ICreateProductUseCase,
} from '@modules/products/domain/use-cases'
import type { ICreateProductRepository } from '@modules/products/repositories'
import { inject, injectable } from 'tsyringe'

@injectable()
class CreateProductUseCase implements ICreateProductUseCase {
  constructor(
    @inject(CREATE_PRODUCT_REPOSITORY_TOKEN)
    private readonly createProductRepository: ICreateProductRepository,
    // eslint-disable-next-line prettier/prettier
  ) { }

  async execute(
    data: ICreateProduct.Request,
  ): Promise<ICreateProduct.Response> {
    if (data.costPrice > data.price) {
      throw new BadRequestError(
        'Cost price cannot be greater than selling price',
      )
    }

    const createdProduct = await this.createProductRepository.create(data)

    return createdProduct
  }
}

export { CreateProductUseCase }
