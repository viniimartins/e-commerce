import { env } from '@e-commerce/env'

export async function removeBg(buffer: Buffer): Promise<Buffer> {
  const blob = new Blob([buffer], { type: 'image/png' })

  const formData = new FormData()
  formData.append('size', 'auto')
  formData.append('image_file', blob, 'image.png')

  const response = await fetch('https://api.remove.bg/v1.0/removebg', {
    method: 'POST',
    headers: {
      'X-Api-Key': env.REMOVE_BG_API_KEY!,
    },
    body: formData,
  })

  if (response.ok) {
    const arrayBuffer = await response.arrayBuffer()
    return Buffer.from(arrayBuffer)
  }

  const error = await response.text()
  throw new Error(`remove.bg ${response.status}: ${error}`)
}
