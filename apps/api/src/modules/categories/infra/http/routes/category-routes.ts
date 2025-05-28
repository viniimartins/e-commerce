import { permission } from '@middlewares/permission'
import { requiredAuthentication } from '@middlewares/required-authentication'
import { UpdateCategoryController } from '@modules/categories/infra/http//controllers/update-category-controller'
import { CreateCategoryController } from '@modules/categories/infra/http/controllers/create-category-controller'
import { DeleteCategoryController } from '@modules/categories/infra/http/controllers/delete-category-controller'
import { FindCategoryByIdController } from '@modules/categories/infra/http/controllers/find-category-by-id-controller'
import { SearchCategoriesController } from '@modules/categories/infra/http/controllers/search-categories-controller'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

const routes = (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    CreateCategoryController.route,
    {
      schema: {
        onRequest: [requiredAuthentication, permission('ADMIN')],
        tags: ['Categories'],
        summary: 'Create a new category',
        security: [{ bearerAuth: [] }],
        body: CreateCategoryController.validator.request.body,
        response: CreateCategoryController.validator.response,
      },
    },
    CreateCategoryController.handle,
  )

  app.withTypeProvider<ZodTypeProvider>().get(
    FindCategoryByIdController.route,
    {
      schema: {
        tags: ['Categories'],
        summary: 'Find a category by id',
        security: [{ bearerAuth: [] }],
        params: FindCategoryByIdController.validator.request.params,
        response: FindCategoryByIdController.validator.response,
      },
    },
    FindCategoryByIdController.handle,
  )

  app.withTypeProvider<ZodTypeProvider>().delete(
    DeleteCategoryController.route,
    {
      schema: {
        onRequest: [requiredAuthentication, permission('ADMIN')],
        tags: ['Categories'],
        summary: 'Delete a category by id',
        security: [{ bearerAuth: [] }],
        params: DeleteCategoryController.validator.request.params,
        response: DeleteCategoryController.validator.response,
      },
    },
    DeleteCategoryController.handle,
  )

  app.withTypeProvider<ZodTypeProvider>().get(
    SearchCategoriesController.route,
    {
      schema: {
        tags: ['Categories'],
        summary: 'Search Categories',
        security: [{ bearerAuth: [] }],
        querystring: SearchCategoriesController.validator.request.querystring,
        response: SearchCategoriesController.validator.response,
      },
    },
    SearchCategoriesController.handle,
  )

  app.withTypeProvider<ZodTypeProvider>().put(
    UpdateCategoryController.route,
    {
      schema: {
        onRequest: [requiredAuthentication, permission('ADMIN')],
        tags: ['Categories'],
        summary: 'Update a category',
        security: [{ bearerAuth: [] }],
        params: UpdateCategoryController.validator.request.params,
        body: UpdateCategoryController.validator.request.body,
        response: UpdateCategoryController.validator.response,
      },
    },
    UpdateCategoryController.handle,
  )
}

export { routes as categoriesRoutes }
