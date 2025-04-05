export function normalizedPrice(price: string): number {
  const cleaned = price
    .trim()
    .replace(/\s/g, '')
    .replace(/[^\d.,]/g, '')
    .replace(/\./g, '')
    .replace(',', '.')

  return Number(cleaned)
}
