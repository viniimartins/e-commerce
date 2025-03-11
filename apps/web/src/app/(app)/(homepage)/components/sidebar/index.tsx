'use client'

import Link from 'next/link'

const categories = [
  'Woman’s Fashion',
  'Men’s Fashion',
  'Electronics',
  'Home & Lifestyle',
  'Medicine',
  'Sports & Outdoor',
  'Baby’s & Toys',
  'Groceries & Pets',
  'Health & Beauty',
]

export default function Sidebar() {
  return (
    <aside className="border-r border-border pt-6">
      <ul className="space-y-4 p-4">
        {categories.map((category) => (
          <Link
            key={category}
            href="/"
            className="decoration-underline my-0 flex justify-between decoration-[1px] underline-offset-4 hover:underline"
          >
            {category}
          </Link>
        ))}
      </ul>
    </aside>
  )
}
