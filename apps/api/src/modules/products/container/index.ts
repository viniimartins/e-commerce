import {
  BEST_SELLERS_PRODUCTS_REPOSITORY_TOKEN,
  CREATE_PRODUCT_REPOSITORY_TOKEN,
  DELETE_PRODUCT_REPOSITORY_TOKEN,
  FIND_PRODUCT_BY_ID_REPOSITORY_TOKEN,
  SEARCH_PRODUCTS_REPOSITORY_TOKEN,
  UPDATE_PRODUCT_REPOSITORY_TOKEN,
} from '@modules/products/constants'
import { PrismaProductRepository } from '@modules/products/infra/prisma/repositories/prisma-product-repository'
import {
  IBestSellersProductsRepository,
  ICreateProductRepository,
  IDeleteProductRepository,
  IFindProductByIdRepository,
  ISearchProductsRepository,
  IUpdateProductRepository,
} from '@modules/products/repositories'
import { container } from 'tsyringe'

container.registerSingleton<ICreateProductRepository>(
  CREATE_PRODUCT_REPOSITORY_TOKEN,
  PrismaProductRepository,
)
container.registerSingleton<IDeleteProductRepository>(
  DELETE_PRODUCT_REPOSITORY_TOKEN,
  PrismaProductRepository,
)

container.registerSingleton<IUpdateProductRepository>(
  UPDATE_PRODUCT_REPOSITORY_TOKEN,
  PrismaProductRepository,
)

container.registerSingleton<ISearchProductsRepository>(
  SEARCH_PRODUCTS_REPOSITORY_TOKEN,
  PrismaProductRepository,
)
container.registerSingleton<IFindProductByIdRepository>(
  FIND_PRODUCT_BY_ID_REPOSITORY_TOKEN,
  PrismaProductRepository,
)

container.registerSingleton<IBestSellersProductsRepository>(
  BEST_SELLERS_PRODUCTS_REPOSITORY_TOKEN,
  PrismaProductRepository,
)
