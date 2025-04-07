export function normalizedPrice(price: string) {
  const cleaned = price
    .trim()
    .replace(/\s/g, '')
    .replace(/[^\d.,]/g, '')
    .replace(/\./g, '')
    .replace(',', '.')

  return cleaned
}
