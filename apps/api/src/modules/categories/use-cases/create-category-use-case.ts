import { CREATE_CATEGORY_REPOSITORY_TOKEN } from '@modules/categories/constants'
import type {
  ICreateCategory,
  ICreateCategoryUseCase,
} from '@modules/categories/domain/use-cases'
import type { ICreateCategoryRepository } from '@modules/categories/repositories'
import { inject, injectable } from 'tsyringe'

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
