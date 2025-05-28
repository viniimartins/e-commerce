import {
  FIND_ORDER_BY_ID_REPOSITORY_TOKEN,
  NEXT_STATUS_ORDER_REPOSITORY_TOKEN,
  SEARCH_ALL_ORDERS_FOR_ADMIN_REPOSITORY_TOKEN,
  SEARCH_ORDERS_BY_USER_FOR_ADMIN_REPOSITORY_TOKEN,
  SEARCH_ORDERS_FOR_USER_REPOSITORY_TOKEN,
} from '@modules/orders/constants'
import { PrismaOrderRepository } from '@modules/orders/infra/prisma/repositories/prisma-order-repository'
import {
  IFindOrderByIdRepository,
  INextStatusOrderRepository,
  ISearchAllOrdersForAdminRepository,
  ISearchOrdersByUserForAdminRepository,
  ISearchOrdersForUserRepository,
} from '@modules/orders/repositories'
import { container } from 'tsyringe'

container.registerSingleton<ISearchAllOrdersForAdminRepository>(
  SEARCH_ALL_ORDERS_FOR_ADMIN_REPOSITORY_TOKEN,
  PrismaOrderRepository,
)

container.registerSingleton<IFindOrderByIdRepository>(
  FIND_ORDER_BY_ID_REPOSITORY_TOKEN,
  PrismaOrderRepository,
)

container.registerSingleton<ISearchOrdersForUserRepository>(
  SEARCH_ORDERS_FOR_USER_REPOSITORY_TOKEN,
  PrismaOrderRepository,
)

container.registerSingleton<ISearchOrdersByUserForAdminRepository>(
  SEARCH_ORDERS_BY_USER_FOR_ADMIN_REPOSITORY_TOKEN,
  PrismaOrderRepository,
)

container.registerSingleton<INextStatusOrderRepository>(
  NEXT_STATUS_ORDER_REPOSITORY_TOKEN,
  PrismaOrderRepository,
)
