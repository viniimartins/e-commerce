import 'reflect-metadata'
import '@container/index'

import { env } from '@e-commerce/env'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifyMultipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import { errorHandler } from '@middlewares/error-handler'
import { fastify } from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import path from 'path'

import { routes } from './routes'

export const app = fastify()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

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
  origin: env.NEXT_PUBLIC_APP_URL,
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
})

app.register(fastifyStatic, {
  root: path.join(__dirname, '..', '..', 'images'),
  prefix: '/images/',
})

app.register(fastifyMultipart, {
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
})

app.setErrorHandler(errorHandler)

routes(app)
