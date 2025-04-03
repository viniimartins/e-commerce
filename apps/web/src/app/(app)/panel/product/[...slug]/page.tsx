import { ChevronLeft, Upload } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import teste from '@/assets/gamepad.png'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { normalizeSlug } from '@/utils/normalized-slug'

interface Params {
  slug: string[]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params

  const { isEditing } = normalizeSlug(slug)

  return {
    title: isEditing ? 'Editar Produto' : 'Criar Produto',
  }
}

export default async function ProductCreateAndEditPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params

  const { isEditing } = normalizeSlug(slug)

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/panel">Painel</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {isEditing ? 'Editar Produto' : 'Adicionar Produto'}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <main className="grid flex-1 items-start gap-4">
        <div className="mx-auto grid flex-1 auto-rows-max gap-4">
          <div className="flex items-center gap-4">
            <Link href="/panel/product">
              <Button variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Voltar</span>
              </Button>
            </Link>

            <h1 className="flex-1 shrink-0 text-xl font-semibold tracking-tight whitespace-nowrap sm:grow-0">
              Adicionar Produto
            </h1>
            <div className="ml-auto flex items-center justify-center gap-2">
              <Button variant="outline" size="sm">
                Descartar
              </Button>
              <Button size="sm">Salvar Produto</Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card className="rounded-none">
                <CardHeader>
                  <CardTitle>Detalhes do Protudo</CardTitle>
                  <CardDescription className="hidden" />
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="name">Nome</Label>
                      <Input
                        id="name"
                        type="text"
                        className="w-full"
                        defaultValue="Gamer Gear Pro Controller"
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="description">Descrição</Label>
                      <Textarea
                        id="description"
                        defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                        className="min-h-32"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="gap-3 rounded-none">
                <CardHeader>
                  <CardTitle>Estoque e Preço</CardTitle>
                  <CardDescription className="hidden" />
                </CardHeader>

                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Estoque</TableHead>
                        <TableHead>Preço</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Label htmlFor="stock-1" className="sr-only">
                            Stock
                          </Label>
                          <Input
                            id="stock-1"
                            type="number"
                            defaultValue="100"
                          />
                        </TableCell>
                        <TableCell>
                          <Label htmlFor="price-1" className="sr-only">
                            Price
                          </Label>
                          <Input
                            id="price-1"
                            type="number"
                            defaultValue="99.99"
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card className="overflow-hidden rounded-none">
                <CardHeader>
                  <CardTitle>Imagens</CardTitle>
                  <CardDescription className="hidden" />
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <div className="dark:bg-muted-foreground/10 relative mb-1 flex h-[20rem] items-center justify-center bg-neutral-100 p-0 dark:border">
                      <Image
                        alt="Product image"
                        className="object-cover p-2"
                        quality={100}
                        fill
                        src={teste}
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="dark:bg-muted-foreground/10 relative mb-1 flex h-[7rem] items-center justify-center bg-neutral-100 p-0 dark:border">
                        <Image
                          alt="Product image"
                          className="object-cover p-2"
                          quality={100}
                          fill
                          priority
                          src={teste}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <div className="dark:bg-muted-foreground/10 relative mb-1 flex h-[7rem] items-center justify-center bg-neutral-100 p-0 dark:border">
                        <Image
                          alt="Product image"
                          className="object-cover p-2"
                          quality={100}
                          fill
                          priority
                          src={teste}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>

                      <div className="dark:bg-muted-foreground/10 relative mb-1 flex aspect-square h-[7rem] w-full items-center justify-center rounded-md border border-dashed bg-neutral-100 p-0 dark:border">
                        <Upload className="text-muted-foreground h-4 w-4" />
                        <span className="sr-only">Upload</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-none">
                <CardContent>
                  <div className="grid gap-3">
                    <Label htmlFor="category">Categoria</Label>
                    <Select>
                      <SelectTrigger
                        id="category"
                        aria-label="Selecione"
                        className="w-full"
                      >
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="accessories">Accessories</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button variant="outline" size="sm">
              Descartar
            </Button>
            <Button size="sm">Salvar Produto</Button>
          </div>
        </div>
      </main>
    </>
  )
}
