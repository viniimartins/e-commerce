import { requiredAuthentication } from '@middlewares/required-authentication'
import { AddToWishlistController } from '@modules/wishlists/infra/http/controllers/add-to-wishlist-controller'
import { ClearWishlistController } from '@modules/wishlists/infra/http/controllers/clear-wishlist-controller'
import { RemoveFromWishlistController } from '@modules/wishlists/infra/http/controllers/remove-from-wishlist-controller'
import { SearchWishlistsController } from '@modules/wishlists/infra/http/controllers/search-wishlists-controller'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

const routes = (app: FastifyInstance) => {
  app.addHook('onRequest', requiredAuthentication)

  app.withTypeProvider<ZodTypeProvider>().post(
    AddToWishlistController.route,
    {
      schema: {
        tags: ['Wishlists'],
        summary: 'Add item to wishlist',
        security: [{ bearerAuth: [] }],
        body: AddToWishlistController.validator.request.body,
        response: AddToWishlistController.validator.response,
      },
    },
    AddToWishlistController.handle,
  )

  app.withTypeProvider<ZodTypeProvider>().delete(
    RemoveFromWishlistController.route,
    {
      schema: {
        tags: ['Wishlists'],
        summary: 'Remove item from wishlist',
        security: [{ bearerAuth: [] }],
        params: RemoveFromWishlistController.validator.request.params,
        response: RemoveFromWishlistController.validator.response,
      },
    },
    RemoveFromWishlistController.handle,
  )

  app.withTypeProvider<ZodTypeProvider>().delete(
    ClearWishlistController.route,
    {
      schema: {
        tags: ['Wishlists'],
        summary: 'Clear wishlist',
        security: [{ bearerAuth: [] }],
        response: ClearWishlistController.validator.response,
      },
    },
    ClearWishlistController.handle,
  )

  app.withTypeProvider<ZodTypeProvider>().get(
    SearchWishlistsController.route,
    {
      schema: {
        tags: ['Wishlists'],
        summary: 'Search wishlists',
        security: [{ bearerAuth: [] }],
        querystring: SearchWishlistsController.validator.request.querystring,
        response: SearchWishlistsController.validator.response,
      },
    },
    SearchWishlistsController.handle,
  )
}

export { routes as wishlistsRoutes }
