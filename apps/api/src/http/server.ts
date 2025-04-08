import { env } from '@e-commerce/env'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifyStatic from '@fastify/static'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import path from 'path'

import { errorHandler } from './error-handler'
import { authenticateWithGithub } from './routes/auth/authenticate-with-github'
import { getProfile } from './routes/auth/get-profile'
import { createBilling } from './routes/billing/create-billing'
import { createCategory } from './routes/category/create-caterory'
import { deleteCategory } from './routes/category/delete-category'
import { getCategories } from './routes/category/get-categories'
import { getCategory } from './routes/category/get-category'
import { updateCategory } from './routes/category/update-category'
import { removeImage } from './routes/image/remove-image'
import { uploadImage } from './routes/image/upload-image'
import { getAllOrders } from './routes/order/get-all-orders'
import { getOrder } from './routes/order/get-order'
import { getOrders } from './routes/order/get-orders'
import { getOrdersById } from './routes/order/get-orders-by-id'
import { nextStatusOrder } from './routes/order/next-status-order'
import { createProduct } from './routes/product/create-product'
import { deleteProduct } from './routes/product/delete-product'
import { getProduct } from './routes/product/get-product'
import { getProducts } from './routes/product/get-products'
import { updateProduct } from './routes/product/update-product'
import { getStatistics } from './routes/statistics/statistics'
import { getUsers } from './routes/user/get-users'
import { abacatepay } from './routes/webhook/abacatepay'
import { addToWishlist } from './routes/wishlist/add-to-wishlist'
import { getWishlist } from './routes/wishlist/get-wishlist'
import { removeAllFromWishlist } from './routes/wishlist/remove-all-wishlist'
import { removeFromWishlist } from './routes/wishlist/remove-from-wishlist'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.setErrorHandler(errorHandler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'E-commerce',
      description: 'Full-stack e-commerce platform by Univinte.',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
})

app.register(fastifyStatic, {
  root: path.join(__dirname, '..', '..', 'images'),
  prefix: '/images/',
})

app.register(authenticateWithGithub)
app.register(getProfile)

app.register(getCategories)
app.register(getCategory)
app.register(createCategory)
app.register(deleteCategory)
app.register(updateCategory)

app.register(getProducts)
app.register(getProduct)
app.register(createProduct)
app.register(deleteProduct)
app.register(updateProduct)

app.register(getWishlist)
app.register(addToWishlist)
app.register(removeFromWishlist)
app.register(removeAllFromWishlist)

app.register(createBilling)

app.register(getOrder)
app.register(getOrders)
app.register(getOrdersById)
app.register(getAllOrders)
app.register(nextStatusOrder)

app.register(getUsers)

app.register(abacatepay)

app.register(getStatistics)

app.register(uploadImage)
app.register(removeImage)

app.listen({ port: env.PORT }).then(() => {
  console.log('HTTP server running!')
})
