import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

import { Content } from './content'

export default function CategoryPage() {
  return (
    <>
      <section className="bg-muted-foreground/10 relative h-96">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <h1 className="text-4xl font-medium">Shop Page</h1>
          <p className="text-muted-foreground text-base">
            Let’s design the place you always imagined.
          </p>
        </div>
      </section>

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Shop</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Content />
    </>
  )
}
