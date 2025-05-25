import { env } from '@e-commerce/env'
import z from 'zod'

interface GithubUser {
  id: string
  name: string | null
  email: string | null
  avatarUrl: string
}

class GithubOAuthService {
  async fetchAccessToken(code: string): Promise<string> {
    const params = new URLSearchParams({
      client_id: env.GITHUB_OAUTH_CLIENT_ID,
      client_secret: env.GITHUB_OAUTH_CLIENT_SECRET,
      redirect_uri: env.GITHUB_OAUTH_CLIENT_REDIRECT_URI,
      code,
    }).toString()

    const githubAccessTokenResponse = await fetch(
      `https://github.com/login/oauth/access_token?${params}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      },
    )
    const githubAccessTokenData = await githubAccessTokenResponse.json()

    const { access_token: githubAccessToken } = z
      .object({
        access_token: z.string(),
        token_type: z.literal('bearer'),
        scope: z.string(),
      })
      .parse(githubAccessTokenData)

    return githubAccessToken
  }

  async fetchUser(accessToken: string): Promise<GithubUser> {
    const githubUserResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const githubUserData = await githubUserResponse.json()

    const {
      id,
      avatar_url: avatarUrl,
      name,
      email,
    } = z
      .object({
        id: z.number().int().transform(String),
        avatar_url: z.string().url(),
        name: z.string().nullable(),
        email: z.string().nullable(),
      })
      .parse(githubUserData)

    return {
      id,
      name,
      email,
      avatarUrl,
    }
  }
}

export { GithubOAuthService }
