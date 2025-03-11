import type { Metadata } from 'next'

import { Content } from './content'

export const metadata: Metadata = {
  title: 'Frete Gŕatis para todo Brasil',
}

export default function Home() {
  return <Content />
}
