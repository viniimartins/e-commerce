import { NotFoundError } from '@common/errors'
import {
  FIND_CATEGORY_BY_ID_REPOSITORY_TOKEN,
  UPDATE_CATEGORY_REPOSITORY_TOKEN,
} from '@modules/categories/constants'
import type {
  IUpdateCategory,
  IUpdateCategoryUseCase,
} from '@modules/categories/domain/use-cases'
import type {
  IFindCategoryByIdRepository,
  IUpdateCategoryRepository,
} from '@modules/categories/repositories'
import { inject, injectable } from 'tsyringe'

@injectable()
class UpdateCategoryUseCase implements IUpdateCategoryUseCase {
  constructor(
    @inject(UPDATE_CATEGORY_REPOSITORY_TOKEN)
    private readonly updateCategoryRepository: IUpdateCategoryRepository,
    @inject(FIND_CATEGORY_BY_ID_REPOSITORY_TOKEN)
    private readonly findCategoryByIdRepository: IFindCategoryByIdRepository,
    // eslint-disable-next-line prettier/prettier
  ) { }

  async execute(
    data: IUpdateCategory.Request,
  ): Promise<IUpdateCategory.Response> {
    const { categoryId, ...rest } = data

    const category = await this.findCategoryByIdRepository.findById({
      categoryId,
    })

    if (!category) {
      throw new NotFoundError('Category not found')
    }

    const updatedCategory = await this.updateCategoryRepository.update({
      categoryId,
      ...rest,
    })

    return updatedCategory
  }
}

export { UpdateCategoryUseCase }
