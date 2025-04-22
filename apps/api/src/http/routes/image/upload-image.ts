import { env } from '@e-commerce/env'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import path from 'path'
import sharp from 'sharp'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { prisma } from '@/lib/prisma'
import { removeBg } from '@/lib/remove-bg'

import { BadRequestError } from '../_errors/bad-request-error'

export function uploadImage(app: FastifyInstance) {
  app.register(auth)
  app.withTypeProvider<ZodTypeProvider>().post(
    '/image',
    {
      onRequest: [verifyUserRole('ADMIN')],
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
      const file = await request.file()

      if (!file) {
        throw new BadRequestError('No file uploaded')
      }

      const buffer = await file.toBuffer()

      const filename = `${Date.now()}-${path.parse(file.filename).name}.png`
      const filePath = `./images/${filename}`

      const processedBuffer = await removeBg(buffer)

      await sharp(processedBuffer).png().toFile(filePath)

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
