'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeft, LoaderCircle, Trash, Upload } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChangeEvent, Fragment, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { toast } from 'sonner'
import { z } from 'zod'

import type { IProduct } from '@/app/(app)/types'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
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
import { useRemoveImage } from '@/hooks/mutation/image/remove'
import { useUploadImage } from '@/hooks/mutation/image/upload'
import { useCreateProduct } from '@/hooks/mutation/product/create'
import { useUpdateProduct } from '@/hooks/mutation/product/update'
import { useGetInfiniteCategories } from '@/hooks/query/category/get-infinite'
import { useInfiniteScrollObserver } from '@/hooks/use-infinite-scroll-observer'
import { useModal } from '@/hooks/use-modal'
import { cn } from '@/lib/utils'
import { normalizedPrice } from '@/utils/normalized-price'

const baseProductSchema = z.object({
  name: z.string().min(1, { message: 'O nome é obrigatório' }),
  description: z.string().min(1, { message: 'A descrição é obrigatória' }),
  price: z.string().min(1, { message: 'O preço é obrigatório' }),
  quantity: z.string().min(1, { message: 'A quantidade é obrigatória' }),
  categoryId: z.string().min(1, { message: 'A categoria é obrigatória' }),
})

const formProductSchema = baseProductSchema.extend({
  productImages: z
    .array(z.instanceof(File))
    .min(1, 'Envie pelo menos uma imagem'),
})

const formEditProductSchema = baseProductSchema.extend({
  productImages: z.array(z.instanceof(File)).optional(),
})

type FormProductSchema = z.infer<typeof baseProductSchema> & {
  productImages?: File[]
}

interface Props {
  product: IProduct | null
  isEditing: boolean
}

export function Content(props: Props) {
  const { product, isEditing } = props

  const router = useRouter()

  const [selectOpen, setSelectOpen] = useState(false)
  const [productImages, setProductImages] = useState<string[]>([])
  const [deletedImageIds, setDeletedImageIds] = useState<string[]>([])

  const { isOpen, actions } = useModal()

  const loadMoreRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    data: categories,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfiniteCategories()

  const { mutateAsync: uploadImage } = useUploadImage()

  const { mutateAsync: removeImage } = useRemoveImage()

  const { mutate: createProduct } = useCreateProduct()

  const { mutate: updateProduct } = useUpdateProduct()

  useInfiniteScrollObserver({
    targetRef: loadMoreRef,
    isActive: selectOpen,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })

  const form = useForm<FormProductSchema>({
    resolver: zodResolver(
      isEditing ? formEditProductSchema : formProductSchema,
    ),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      quantity: '',
      categoryId: '',
      productImages: [],
    },
  })

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = form

  const { errorProductImage } = {
    errorProductImage: errors.productImages,
  }

  async function onSubmit(values: FormProductSchema) {
    const { productImages, ...restProduct } = values

    if (!isEditing) {
      const productImagesIds: string[] = []

      for (const image of productImages ?? []) {
        const { id } = await uploadImage({ image })

        productImagesIds.push(id)
      }

      createProduct(
        {
          product: {
            ...restProduct,
            price: normalizedPrice(restProduct.price),
            quantity: Number(restProduct.quantity),
            productImages: productImagesIds,
          },
        },
        {
          onSuccess: () => {
            reset()
            setProductImages([])
          },
          onError: () => {
            for (const imageId of productImagesIds) {
              removeImage({ image: { id: imageId } })
            }
          },
        },
      )
    }

    if (isEditing && product?.id) {
      const productImagesIds: string[] = []

      for (const image of productImages ?? []) {
        const { id } = await uploadImage({ image })

        productImagesIds.push(id)
      }

      for (const image of deletedImageIds) {
        removeImage({ url: image })
      }

      updateProduct(
        {
          product: {
            ...restProduct,
            id: product.id,
            price: normalizedPrice(restProduct.price),
            quantity: Number(restProduct.quantity),
            productImages: productImagesIds,
          },
        },
        {
          onSuccess: () => {
            router.push('/panel/product')
            setProductImages([])
            setDeletedImageIds([])
            reset()
          },
          onError: () => {
            for (const imageId of productImagesIds) {
              removeImage({ image: { id: imageId } })
            }
          },
        },
      )
    }
  }

  function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const imageUrl = URL.createObjectURL(file)

      setProductImages((prev) => [...prev, imageUrl])

      const currentFiles = (form.getValues().productImages as File[]) || []
      form.setValue('productImages', [...currentFiles, file])
    }
  }

  function handleImageDelete(imageUrl: string) {
    setDeletedImageIds((prev) => [...prev, imageUrl])

    if (productImages.length === 1) {
      return toast.error('O produto deve ter pelo menos uma imagem')
    }

    setProductImages(productImages.filter((image) => image !== imageUrl))

    const currentImages = form.getValues().productImages

    form.setValue(
      'productImages',
      currentImages?.filter((_, index) => {
        const imageUrlToCompare = productImages[index]
        return imageUrlToCompare !== imageUrl
      }) || [],
    )
  }

  function handleUploadClick() {
    fileInputRef.current?.click()
  }

  useEffect(() => {
    if (isEditing && product) {
      reset({
        name: product.name,
        description: product.description,
        price: String(product.price),
        quantity: String(product.quantity),
        categoryId: product.category.id,
        productImages: [],
      })

      setProductImages(product.productImage.map(({ image }) => image.url))
    }
  }, [isEditing, product])

  return (
    <>
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
              {isEditing ? 'Editar Produto' : 'Adicionar Produto'}
            </h1>
            <div className="ml-auto flex items-center justify-center gap-2">
              <Button variant="outline" size="sm">
                Descartar
              </Button>
              <Button size="sm" type="submit" form="product-form">
                Salvar Produto
                {isSubmitting && (
                  <LoaderCircle className="ml-2 h-4 w-4 animate-spin" />
                )}
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
                  <CardContent className="flex flex-col gap-2">
                    <div className="dark:bg-muted-foreground/10 relative mb-1 flex h-[20rem] items-center justify-center bg-neutral-100 p-0 dark:border">
                      {productImages.slice(0, 1).map((image) => {
                        return (
                          <div
                            key={image}
                            className="relative h-full w-full hover:cursor-pointer"
                          >
                            <Image
                              src={image}
                              alt={'Product Image'}
                              fill
                              quality={100}
                              priority
                              className="p-2"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              onClick={() => actions.open()}
                            />

                            <div className="absolute top-5 right-5">
                              <Button
                                variant="secondary"
                                className="rounded-full"
                                size="icon"
                                onClick={(event) => {
                                  event.preventDefault()
                                  handleImageDelete(image)
                                }}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {productImages.slice(1, 3).map((image, index) => {
                        const isLastItem = index === 1

                        return (
                          <div
                            key={index}
                            className="dark:bg-muted-foreground/10 relative mb-1 flex h-[7rem] items-center justify-center bg-neutral-100 p-0 dark:border"
                          >
                            <div
                              className="relative h-full w-full"
                              onClick={() => actions.open()}
                            >
                              <Image
                                alt={`Product image ${index + 1}`}
                                className="object-cover p-2"
                                quality={100}
                                fill
                                priority
                                src={image}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                            </div>

                            <div className="absolute top-3 right-3 flex flex-col gap-1">
                              <Button
                                variant="secondary"
                                className="h-6 w-6 rounded-full"
                                size="icon"
                                onClick={(event) => {
                                  event.preventDefault()
                                  handleImageDelete(image)
                                }}
                              >
                                <Trash className="size-3" />
                              </Button>

                              {isLastItem && (
                                <div className="bg-secondary flex h-6 w-6 items-center justify-center rounded-full">
                                  <span className="text-sm">
                                    {productImages.length}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}

                      <FormField
                        control={form.control}
                        name="productImages"
                        render={() => (
                          <FormItem>
                            <FormControl>
                              <div
                                onClick={handleUploadClick}
                                className="dark:bg-muted-foreground/10 relative mb-1 flex aspect-square h-[7rem] w-full cursor-pointer items-center justify-center rounded-md border border-dashed bg-neutral-100 p-0 transition-colors hover:bg-neutral-200 dark:border"
                              >
                                <Upload className="text-muted-foreground h-4 w-4" />
                                <span className="sr-only">Upload</span>
                                <input
                                  type="file"
                                  ref={fileInputRef}
                                  className="hidden"
                                  accept="image/*"
                                  onChange={handleImageUpload}
                                />
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    {errorProductImage && (
                      <FormMessage>{errorProductImage.message}</FormMessage>
                    )}
                  </CardContent>
                </Card>

                <Card className="rounded-none">
                  <CardContent>
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                          <FormItem>
                            <Label htmlFor="category">Categoria</Label>
                            <Select
                              onOpenChange={setSelectOpen}
                              onValueChange={(value) =>
                                value && field.onChange(value)
                              }
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Selecione a categoria" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <ScrollArea
                                  className={cn('h-56', {
                                    'h-auto':
                                      categories && categories?.length < 10,
                                  })}
                                >
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
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={actions.toggle}>
        <DialogContent className="max-h-[70vh]! w-[50vw]! max-w-[55vw]! p-0">
          <DialogHeader className="hidden">
            <DialogTitle className="hidden" />
            <DialogDescription className="hidden" />
          </DialogHeader>
          <div className="dark:bg-muted-foreground/10 relative col-span-3 h-full bg-neutral-100 dark:border">
            <Carousel>
              <CarouselContent>
                {productImages?.map((image) => {
                  return (
                    <CarouselItem
                      key={image}
                      className="relative h-[40rem] w-full"
                    >
                      <Image
                        src={image}
                        alt={'Product Image'}
                        fill
                        quality={100}
                        className="absolute object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute right-4 bottom-10 flex flex-col gap-1">
                        <Button
                          variant="destructive"
                          onClick={(event) => {
                            event.preventDefault()
                            handleImageDelete(image)
                          }}
                        >
                          Excluir Imagem
                          <Trash className="size-4" />
                        </Button>
                      </div>
                    </CarouselItem>
                  )
                })}
              </CarouselContent>
              <CarouselPrevious className="left-2" variant="default" />
              <CarouselNext className="right-2" variant="default" />
            </Carousel>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
