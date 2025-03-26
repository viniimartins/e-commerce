import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    PORT: z.coerce.number().default(3333),
    DATABASE_URL: z.string().url(),

    NEXTAUTH_SECRET: z.string(),
    JWT_SECRET: z.string(),
    GITHUB_OAUTH_CLIENT_ID: z.string(),
    GITHUB_OAUTH_CLIENT_SECRET: z.string(),
    GITHUB_OAUTH_CLIENT_REDIRECT_URI: z.string().url(),

    ABACATE_API_KEY: z.string(),
    ABACATE_WEBHOOK_SECRET: z.string(),
  },
  client: {},
  shared: {
    NEXT_PUBLIC_API_URL: z.string().url(),
  },
  runtimeEnv: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    PORT: process.env.SERVER_PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    GITHUB_OAUTH_CLIENT_ID: process.env.GITHUB_OAUTH_CLIENT_ID,
    GITHUB_OAUTH_CLIENT_SECRET: process.env.GITHUB_OAUTH_CLIENT_SECRET,
    GITHUB_OAUTH_CLIENT_REDIRECT_URI:
      process.env.GITHUB_OAUTH_CLIENT_REDIRECT_URI,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    ABACATE_API_KEY: process.env.ABACATE_API_KEY,
    ABACATE_WEBHOOK_SECRET: process.env.ABACATE_WEBHOOK_SECRET,
  },
  emptyStringAsUndefined: true,
})
