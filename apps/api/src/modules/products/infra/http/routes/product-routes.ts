import { permission } from '@middlewares/permission'
import { requiredAuthentication } from '@middlewares/required-authentication'
import { BestSellersProductsController } from '@modules/products/infra/http/controllers/best-sellers-products-controller'
import { CreateProductController } from '@modules/products/infra/http/controllers/create-product-controller'
import { DeleteProductController } from '@modules/products/infra/http/controllers/delete-product-controller'
import { FindProductByIdController } from '@modules/products/infra/http/controllers/find-product-by-id-controller'
import { SearchProductsController } from '@modules/products/infra/http/controllers/search-products-controller'
import { UpdateProductController } from '@modules/products/infra/http/controllers/update-product-controller'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

const routes = (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    CreateProductController.route,
    {
      onRequest: [requiredAuthentication, permission('ADMIN')],
      schema: {
        tags: ['Products'],
        summary: 'Create a new product',
        security: [{ bearerAuth: [] }],
        body: CreateProductController.validator.request.body,
        response: CreateProductController.validator.response,
      },
    },
    CreateProductController.handle,
  )

  app.withTypeProvider<ZodTypeProvider>().get(
    FindProductByIdController.route,
    {
      schema: {
        tags: ['Products'],
        summary: 'Find a product by id',
        security: [{ bearerAuth: [] }],
        params: FindProductByIdController.validator.request.params,
        response: FindProductByIdController.validator.response,
      },
    },
    FindProductByIdController.handle,
  )

  app.withTypeProvider<ZodTypeProvider>().delete(
    DeleteProductController.route,
    {
      onRequest: [requiredAuthentication, permission('ADMIN')],
      schema: {
        tags: ['Products'],
        summary: 'Delete a product by id',
        security: [{ bearerAuth: [] }],
        params: DeleteProductController.validator.request.params,
        response: DeleteProductController.validator.response,
      },
    },
    DeleteProductController.handle,
  )

  app.withTypeProvider<ZodTypeProvider>().get(
    SearchProductsController.route,
    {
      schema: {
        tags: ['Products'],
        summary: 'Search Products',
        security: [{ bearerAuth: [] }],
        querystring: SearchProductsController.validator.request.querystring,
        response: SearchProductsController.validator.response,
      },
    },
    SearchProductsController.handle,
  )

  app.withTypeProvider<ZodTypeProvider>().put(
    UpdateProductController.route,
    {
      onRequest: [requiredAuthentication, permission('ADMIN')],
      schema: {
        tags: ['Products'],
        summary: 'Update a product',
        security: [{ bearerAuth: [] }],
        params: UpdateProductController.validator.request.params,
        body: UpdateProductController.validator.request.body,
        response: UpdateProductController.validator.response,
      },
    },
    UpdateProductController.handle,
  )

  app.withTypeProvider<ZodTypeProvider>().get(
    BestSellersProductsController.route,
    {
      onRequest: [requiredAuthentication, permission('ADMIN')],
      schema: {
        tags: ['Products'],
        summary: 'Get the best seller product',
        security: [{ bearerAuth: [] }],
        querystring:
          BestSellersProductsController.validator.request.querystring,
        response: BestSellersProductsController.validator.response,
      },
    },
    BestSellersProductsController.handle,
  )
}

export { routes as productsRoutes }
