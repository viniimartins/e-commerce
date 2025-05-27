import {
  ADD_TO_WISHLIST_REPOSITORY_TOKEN,
  CLEAR_WISHLIST_REPOSITORY_TOKEN,
  REMOVE_FROM_WISHLIST_REPOSITORY_TOKEN,
  SEARCH_WISHLISTS_REPOSITORY_TOKEN,
} from '@modules/wishlists/constants'
import { PrismaWishlistRepository } from '@modules/wishlists/infra/prisma/repositories/prisma-wishlist-repository'
import {
  IAddToWishlistRepository,
  IClearWishlistRepository,
  IRemoveFromWishlistRepository,
  ISearchWishlistsRepository,
} from '@modules/wishlists/repositories'
import { container } from 'tsyringe'

container.registerSingleton<IAddToWishlistRepository>(
  ADD_TO_WISHLIST_REPOSITORY_TOKEN,
  PrismaWishlistRepository,
)
container.registerSingleton<IRemoveFromWishlistRepository>(
  REMOVE_FROM_WISHLIST_REPOSITORY_TOKEN,
  PrismaWishlistRepository,
)
container.registerSingleton<IClearWishlistRepository>(
  CLEAR_WISHLIST_REPOSITORY_TOKEN,
  PrismaWishlistRepository,
)
container.registerSingleton<ISearchWishlistsRepository>(
  SEARCH_WISHLISTS_REPOSITORY_TOKEN,
  PrismaWishlistRepository,
)
