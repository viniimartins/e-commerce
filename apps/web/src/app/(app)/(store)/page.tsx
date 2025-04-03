import type { Metadata } from 'next'

import { Content } from './content'

export const metadata: Metadata = {
  title: 'Frete Gŕatis para todo Brasil',
}

export default async function Home() {
  return <Content />
}
