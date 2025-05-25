import { NotFoundError } from '@common/errors/not-found-error'
import {
  DELETE_CATEGORY_REPOSITORY_TOKEN,
  FIND_CATEGORY_BY_ID_REPOSITORY_TOKEN,
} from '@modules/categories/constants'
import type {
  IDeleteCategory,
  IDeleteCategoryUseCase,
} from '@modules/categories/domain/use-cases/delete-category-use-case'
import type {
  IDeleteCategoryRepository,
  IFindCategoryByIdRepository,
} from '@modules/categories/repositories'
import { inject, injectable } from 'tsyringe'

@injectable()
class DeleteCategoryUseCase implements IDeleteCategoryUseCase {
  constructor(
    @inject(DELETE_CATEGORY_REPOSITORY_TOKEN)
    private readonly deleteCategoryRepository: IDeleteCategoryRepository,
    @inject(FIND_CATEGORY_BY_ID_REPOSITORY_TOKEN)
    private readonly findCategoryByIdRepository: IFindCategoryByIdRepository,
    // eslint-disable-next-line prettier/prettier
  ) { }

  async execute(
    params: IDeleteCategory.Request,
  ): Promise<IDeleteCategory.Response> {
    const category = await this.findCategoryByIdRepository.findById({
      categoryId: params.categoryId,
    })

    if (!category) {
      throw new NotFoundError('Category not found')
    }

    await this.deleteCategoryRepository.delete({
      categoryId: params.categoryId,
    })
  }
}

export { DeleteCategoryUseCase }
