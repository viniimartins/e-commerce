export function normalizeSlug(slug: string[]) {
  const isEditing = slug.includes('edit')

  const uuidRegex = /[a-fA-F0-9-]{36}/

  const hasId = uuidRegex.test(slug[0])

  const id = hasId ? slug[0] : null

  return {
    isEditing,
    id,
  }
}
