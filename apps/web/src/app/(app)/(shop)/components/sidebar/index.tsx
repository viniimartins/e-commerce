'use client'

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
    <aside className="w-56 border-r border-black/30 pt-6">
      <ul className="space-y-2">
        {categories.map((category) => (
          <li
            key={category}
            className="decoration-underline flex cursor-pointer items-center justify-between rounded-lg p-2 decoration-[1px] underline-offset-4 hover:underline"
          >
            {category}
          </li>
        ))}
      </ul>
    </aside>
  )
}
