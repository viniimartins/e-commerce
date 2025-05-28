import { api } from './api'

interface SignInWithGithubRequest {
  code: string
}

interface SignInWithGithubResponse {
  token: string
}

export async function signInWithGithub({
  code,
}: SignInWithGithubRequest): Promise<SignInWithGithubResponse> {
  const { data } = await api.post<SignInWithGithubResponse>('auth/github', {
    code,
  })

  return data
}
