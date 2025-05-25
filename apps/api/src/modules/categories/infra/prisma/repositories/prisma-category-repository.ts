/* eslint-disable prettier/prettier */
import { prisma } from '@lib/prisma'
import type {
  ICreateCategory,
  ICreateCategoryRepository,
  IDeleteCategory,
  IDeleteCategoryRepository,
  IFindCategoryById,
  IFindCategoryByIdRepository,
  ISearchCategories,
  ISearchCategoriesRepository,
  IUpdateCategory,
  IUpdateCategoryRepository,
} from '@modules/categories/repositories'

class PrismaCategoryRepository
  implements
  ICreateCategoryRepository,
  IDeleteCategoryRepository,
  IFindCategoryByIdRepository,
  IUpdateCategoryRepository,
  ISearchCategoriesRepository {
  async create({
    ...data
  }: ICreateCategory.Params): Promise<ICreateCategory.Response> {
    const category = await prisma.category.create({
      data: {
        ...data,
      },
    })
    return category
  }

  async findById({
    categoryId,
  }: IFindCategoryById.Params): Promise<IFindCategoryById.Response> {
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    })

    return category
  }

  async delete({
    categoryId,
  }: IDeleteCategory.Params): Promise<IDeleteCategory.Response> {
    await prisma.category.delete({
      where: { id: categoryId },
    })
  }

  async update({
    categoryId,
    ...data
  }: IUpdateCategory.Params): Promise<IUpdateCategory.Response> {
    const category = await prisma.category.update({
      where: { id: categoryId },
      data: {
        ...data,
      },
    })

    return category
  }

  async search({
    pageIndex,
    perPage,
    search,
  }: ISearchCategories.Params): Promise<ISearchCategories.Response> {
    const [categories, total] = await Promise.all([
      prisma.category.findMany({
        skip: (pageIndex - 1) * perPage,
        take: perPage,
        where: {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
      }),
      prisma.category.count({
        where: {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
      }),
    ])

    return {
      data: categories,
      meta: {
        pageIndex,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    }
  }
}

export { PrismaCategoryRepository }
