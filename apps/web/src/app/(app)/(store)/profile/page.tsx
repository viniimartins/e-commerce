import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { getProfile } from '@/service/profile'

import { Content } from './content'

export default async function Profile() {
  const { name } = (await getProfile())!

  return (
    <>
      <div className="mt-14 flex justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Meu perfil</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center gap-2">
          Olá,
          <span className="text-muted-foreground font-medium">{name}</span>
        </div>
      </div>

      <Content />
    </>
  )
}
