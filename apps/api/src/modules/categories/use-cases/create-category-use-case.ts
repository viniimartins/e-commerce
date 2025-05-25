import { CREATE_CATEGORY_REPOSITORY_TOKEN } from '@modules/categories/constants'
import type { ICreateCategoryRepository } from '@modules/categories/repositories/create-category-repository'
import { inject, injectable } from 'tsyringe'

import type {
  ICreateCategory,
  ICreateCategoryUseCase,
} from '../domain/use-cases'

@injectable()
class CreateCategoryUseCase implements ICreateCategoryUseCase {
  constructor(
    @inject(CREATE_CATEGORY_REPOSITORY_TOKEN)
    private readonly createCategoryRepository: ICreateCategoryRepository,
    // eslint-disable-next-line prettier/prettier
  ) { }

  async execute(
    data: ICreateCategory.Request,
  ): Promise<ICreateCategory.Response> {
    const { name } = data

    const createdCategory = await this.createCategoryRepository.create({
      name,
    })

    return createdCategory
  }
}

export { CreateCategoryUseCase }
