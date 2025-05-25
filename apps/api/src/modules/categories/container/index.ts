import {
  CREATE_CATEGORY_REPOSITORY_TOKEN,
  DELETE_CATEGORY_REPOSITORY_TOKEN,
  FIND_CATEGORY_BY_ID_REPOSITORY_TOKEN,
  SEARCH_CATEGORIES_REPOSITORY_TOKEN,
  UPDATE_CATEGORY_REPOSITORY_TOKEN,
} from '@modules/categories/constants'
import { PrismaCategoryRepository } from '@modules/categories/infra/prisma/repositories/prisma-category-repository'
import {
  ICreateCategoryRepository,
  IDeleteCategoryRepository,
  IFindCategoryByIdRepository,
  ISearchCategoriesRepository,
  type IUpdateCategoryRepository,
} from '@modules/categories/repositories'
import { container } from 'tsyringe'

container.registerSingleton<ICreateCategoryRepository>(
  CREATE_CATEGORY_REPOSITORY_TOKEN,
  PrismaCategoryRepository,
)
container.registerSingleton<IDeleteCategoryRepository>(
  DELETE_CATEGORY_REPOSITORY_TOKEN,
  PrismaCategoryRepository,
)

container.registerSingleton<IUpdateCategoryRepository>(
  UPDATE_CATEGORY_REPOSITORY_TOKEN,
  PrismaCategoryRepository,
)

container.registerSingleton<ISearchCategoriesRepository>(
  SEARCH_CATEGORIES_REPOSITORY_TOKEN,
  PrismaCategoryRepository,
)
container.registerSingleton<IFindCategoryByIdRepository>(
  FIND_CATEGORY_BY_ID_REPOSITORY_TOKEN,
  PrismaCategoryRepository,
)
