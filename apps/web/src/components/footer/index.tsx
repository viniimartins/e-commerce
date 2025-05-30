import Link from 'next/link'

import { Separator } from '@/components/ui/separator'
import { options } from '@/shared/pages'

import { Button } from '../ui/button'

export function Footer() {
  return (
    <footer className="flex w-full flex-col border-t py-12">
      <div className="mx-auto flex w-full max-w-[73.125rem] flex-col gap-8 px-6">
        <div className="mobile:gap-6 flex items-center justify-between">
          <span className="text-2xl font-bold">
            UNIVINTE<span className="text-muted-foreground">.</span>
          </span>

          <div className="flex flex-row flex-wrap gap-4">
            {options.map(({ title, url, pathname }) => (
              <Link href={url} key={pathname}>
                <Button variant="link">{title}</Button>
              </Link>
            ))}
          </div>
        </div>

        <Separator className="w-full" />

        <div className="mobile:items-center mobile:gap-6 mobile:text-center flex justify-between gap-4">
          <div className="text-muted-foreground mobile:flex-col mobile:gap-2 flex items-center gap-2 text-sm">
            <span className="flex flex-wrap items-center justify-center gap-2 text-center">
              Copyright © {new Date().getFullYear()}
              <Link
                href="https://univinte.edu.br/portal/"
                className="text-primary"
              >
                UNIVINTE.
              </Link>
            </span>
            <span>Todos os direitos reservados</span>
          </div>

          <div className="mobile:flex-col mobile:gap-2 flex items-center gap-4 text-sm font-semibold">
            <span>Política de privacidade</span>
            <span>Termos e condições</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
