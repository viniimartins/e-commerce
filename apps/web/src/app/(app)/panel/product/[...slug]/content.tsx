'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeft, Loader2, Upload } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { z } from 'zod'

import { useGetCategories } from '@/app/(app)/hooks/use-get-category'
import teste from '@/assets/gamepad.png'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
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
import { useInfiniteScrollObserver } from '@/hooks/use-infinite-scroll-observer'

const formProductSchema = z.object({
  name: z.string().min(1, { message: 'O nome é obrigatório' }),
  description: z.string().min(1, { message: 'A descrição é obrigatória' }),
  price: z.string().min(1, { message: 'O preço é obrigatório' }),
  quantity: z.string().min(1, { message: 'A quantidade é obrigatória' }),
  categoryId: z.string().min(1, { message: 'A categoria é obrigatória' }),
  // productImages: z.array(z.string()).min(1, {
  //   message: 'As imagens são obrigatórias',
  // }),
})

type FormProductSchema = z.infer<typeof formProductSchema>

export function Content() {
  const [selectOpen, setSelectOpen] = useState(false)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  const {
    data: categories,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetCategories()

  useInfiniteScrollObserver({
    targetRef: loadMoreRef,
    isActive: selectOpen,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })

  const form = useForm<FormProductSchema>({
    resolver: zodResolver(formProductSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      quantity: '',
      categoryId: '',
      productImages: [],
    },
  })

  const { handleSubmit } = form

  function onSubmit(values: FormProductSchema) {
    console.log(values)
  }

  return (
    <div className="grid flex-1 items-start gap-4">
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
            <Button size="sm" type="submit" form="product-form">
              Salvar Produto
            </Button>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            id="product-form"
            className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8"
          >
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card className="rounded-none">
                <CardHeader>
                  <CardTitle>Detalhes do Protudo</CardTitle>
                  <CardDescription className="hidden" />
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome</FormLabel>
                          <FormControl>
                            <Input
                              id="name"
                              type="text"
                              placeholder="Nome do produto"
                              className="w-full"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription />
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descrição</FormLabel>
                          <FormControl>
                            <Textarea
                              id="description"
                              className="min-h-32"
                              placeholder="Descrição do produto"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                          <FormField
                            control={form.control}
                            name="quantity"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Estoque</FormLabel>
                                <FormControl>
                                  <Input
                                    id="stock-1"
                                    type="number"
                                    placeholder="100"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </TableCell>
                        <TableCell>
                          <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Preço</FormLabel>
                                <FormControl>
                                  <NumericFormat
                                    {...field}
                                    thousandSeparator="."
                                    decimalSeparator=","
                                    prefix="R$ "
                                    placeholder="R$ 0,00"
                                    decimalScale={2}
                                    fixedDecimalScale
                                    allowNegative={false}
                                    customInput={Input}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card className="rounded-none">
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
                    <FormField
                      control={form.control}
                      name="categoryId"
                      render={({ field }) => (
                        <FormItem>
                          <Select onOpenChange={setSelectOpen} {...field}>
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione a categoria" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <ScrollArea className="h-56">
                                {categories?.map((category, index) => {
                                  const isLastItem =
                                    index === categories.length - 1

                                  return (
                                    <Fragment key={category.id}>
                                      <SelectItem value={category.id}>
                                        {category.name}
                                      </SelectItem>

                                      {isLastItem && (
                                        <div
                                          ref={loadMoreRef}
                                          className="h-1"
                                        />
                                      )}
                                    </Fragment>
                                  )
                                })}
                              </ScrollArea>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </form>
        </Form>
        <div className="flex items-center justify-center gap-2 md:hidden">
          <Button variant="outline" size="sm">
            Descartar
          </Button>
          <Button size="sm">Salvar Produto</Button>
        </div>
      </div>
    </div>
  )
}
