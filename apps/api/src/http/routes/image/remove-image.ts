import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import fs from 'fs'
import path from 'path'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export function removeImage(app: FastifyInstance) {
  app.register(auth)
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/image/:idImage?',
    {
      schema: {
        tags: ['Upload'],
        summary: 'Remove an image (by ID or URL)',
        params: z.object({
          idImage: z.string().optional(),
        }),
        body: z.object({
          url: z.string().url().optional(),
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
      await request.ensureAdmin()

      const { idImage } = request.params
      const { url } = request.body

      let image = null

      if (idImage) {
        image = await prisma.image.findUnique({
          where: { id: idImage },
        })
      }

      if (url) {
        image = await prisma.image.findFirst({
          where: {
            url: { contains: url },
          },
        })
      }

      if (!image) {
        throw new BadRequestError('Image not found')
      }

      const imageUrl = new URL(image.url)
      const pathname = imageUrl.pathname
      const filename = pathname.split('/').pop()
      const filePath = path.resolve(`./images/${filename}`)

      await prisma.image.delete({
        where: { id: image.id },
      })

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }

      return reply.status(200).send(null)
    },
  )
}
