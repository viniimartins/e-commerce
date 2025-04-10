import Link from 'next/link'

import { Separator } from '@/components/ui/separator'
import { options } from '@/shared/pages'

import { Button } from '../ui/button'

export function Footer() {
  return (
    <footer className="flex w-full flex-col border-t py-12">
      <div className="mx-auto flex w-[73.125rem] flex-col gap-8">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">
            UNIVINTE<span className="text-muted-foreground">.</span>
          </span>

          <div className="flex">
            {options.map((option) => {
              const { title, url, pathname } = option

              return (
                <Link href={url} key={pathname}>
                  <Button variant="link">{title}</Button>
                </Link>
              )
            })}
          </div>
        </div>

        <Separator className="w-full" />

        <div className="flex justify-between gap-4">
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <span className="flex items-center gap-2">
              Copyright © {new Date().getFullYear()}
              <Link
                href="https://univinte.edu.br/portal/"
                className="text-primary"
              >
                <Button variant="link" className="px-0">
                  UNIVINTE.
                </Button>
              </Link>
            </span>
            <span>Todos os direitos reservados</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold">
              Política de privacidade
            </span>
            <span className="text-sm font-semibold">Termos e condições</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
