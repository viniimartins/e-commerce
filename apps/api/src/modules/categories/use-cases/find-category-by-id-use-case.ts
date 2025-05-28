import { NotFoundError } from '@common/errors/not-found-error'
import { FIND_CATEGORY_BY_ID_REPOSITORY_TOKEN } from '@modules/categories/constants'
import type {
  IFindCategoryById,
  IFindCategoryByIdUseCase,
} from '@modules/categories/domain/use-cases'
import type { IFindCategoryByIdRepository } from '@modules/categories/repositories'
import { inject, injectable } from 'tsyringe'

@injectable()
class FindCategoryByIdUseCase implements IFindCategoryByIdUseCase {
  constructor(
    @inject(FIND_CATEGORY_BY_ID_REPOSITORY_TOKEN)
    private readonly findCategoryByIdRepository: IFindCategoryByIdRepository,
    // eslint-disable-next-line prettier/prettier
  ) { }

  async execute(
    params: IFindCategoryById.Request,
  ): Promise<IFindCategoryById.Response> {
    const { categoryId } = params

    const foundCategory = await this.findCategoryByIdRepository.findById({
      categoryId,
    })

    if (!foundCategory) {
      throw new NotFoundError('Category not found')
    }

    return foundCategory
  }
}

export { FindCategoryByIdUseCase }
