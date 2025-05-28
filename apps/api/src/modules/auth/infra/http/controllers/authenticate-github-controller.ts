import { AuthenticateGithubUseCase } from '@modules/auth/use-cases/authenticate-github-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import z from 'zod'

class AuthenticateGithubController {
  static route = '/github'

  static validator = {
    request: {
      body: z.object({
        code: z.string(),
      }),
    },
    response: {
      201: z.object({
        token: z.string(),
      }),
      404: z.object({
        message: z.string(),
      }),
    },
  }

  static async handle(request: FastifyRequest, reply: FastifyReply) {
    const { code } = AuthenticateGithubController.validator.request.body.parse(
      request.body,
    )

    const authenticateGithubUseCase = container.resolve(
      AuthenticateGithubUseCase,
    )

    const { id, email, name, avatarUrl, role } =
      await authenticateGithubUseCase.execute({
        code,
      })

    const token = await reply.jwtSign(
      {
        sub: id,
        name,
        email,
        avatarUrl,
        role,
      },
      {
        sign: {
          expiresIn: '7d',
        },
      },
    )

    return reply.status(201).send({ token })
  }
}

export { AuthenticateGithubController }
