import fastifyMultipart from '@fastify/multipart'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import fs from 'fs'
import path from 'path'
import z from 'zod'

import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export function removeImage(app: FastifyInstance) {
  app.register(fastifyMultipart)

  app.withTypeProvider<ZodTypeProvider>().delete(
    '/remove/:idImage',
    {
      schema: {
        tags: ['Upload'],
        summary: 'Remove an image',
        params: z.object({
          idImage: z.string(),
        }),
        response: {
          200: z.null(),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { idImage } = request.params

      const image = await prisma.image.findUnique({
        where: { id: idImage },
      })

      if (!image) {
        throw new BadRequestError('Image not found')
      }

      const imageUrl = new URL(image.url)
      const pathname = imageUrl.pathname
      const filename = pathname.split('/').pop()
      const filePath = path.resolve(`./uploads/${filename}`)

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }

      await prisma.image.delete({
        where: { id: idImage },
      })

      return reply.status(200).send(null)
    },
  )
}
