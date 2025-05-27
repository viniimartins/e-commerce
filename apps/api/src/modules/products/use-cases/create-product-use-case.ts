import { CREATE_PRODUCT_REPOSITORY_TOKEN } from '@modules/products/constants'
import type {
  ICreateProduct,
  ICreateProductUseCase,
} from '@modules/products/domain/use-cases'
import type { ICreateProductRepository } from '@modules/products/repositories/create-product-repository'
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
    const createdProduct = await this.createProductRepository.create(data)

    return createdProduct
  }
}

export { CreateProductUseCase }
