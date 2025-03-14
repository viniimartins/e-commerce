'use client'

import Image from 'next/image'

import githubIcon from '@/assets/github-icon.svg'
import { Button } from '@/components/ui/button'

import { signInWithGithub } from './actions'

export function Form() {
  return (
    <form action={signInWithGithub}>
      <Button type="submit" className="w-full" variant="outline">
        <Image src={githubIcon} className="mr-2 size-4 dark:invert" alt="" />
        Entrar com GitHub
      </Button>
    </form>
  )
}
