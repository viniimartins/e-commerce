import { env } from '@e-commerce/env'
import fastifyMultipart from '@fastify/multipart'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import fs from 'fs'
import { pipeline } from 'stream'
import util from 'util'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

const pump = util.promisify(pipeline)

export function uploadImage(app: FastifyInstance) {
  app.register(fastifyMultipart)
  app.register(auth)
  app.withTypeProvider<ZodTypeProvider>().post(
    '/image',
    {
      schema: {
        tags: ['Upload'],
        summary: 'Upload an image',
        consumes: ['multipart/form-data'],
        response: {
          200: z.object({
            id: z.string(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      await request.ensureAdmin()

      const file = await request.file()

      if (!file) {
        throw new BadRequestError('No file uploaded')
      }

      const filename = `${Date.now()}-${file.filename}`
      const filePath = `./images/${filename}`

      await pump(file.file, fs.createWriteStream(filePath))

      const url = `${env.NEXT_PUBLIC_API_URL}/images/${filename}`

      const image = await prisma.image.create({
        data: {
          url,
        },
      })

      return reply.status(200).send({
        id: image.id,
      })
    },
  )
}
