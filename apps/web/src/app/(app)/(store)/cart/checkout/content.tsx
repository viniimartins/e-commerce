'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { cpf } from 'cpf-cnpj-validator'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { withMask } from 'react-maskara'
import z from 'zod'

import { InputMask } from '@/components/input-mask'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useCreateBilling } from '@/hooks/mutation/billing/create'
import { useGetProfile } from '@/hooks/query/profile/get'
import { useCart } from '@/providers/cart-provider'
import { getAddress } from '@/service/cep'
import { formatPrice } from '@/utils/format-price'

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Nome completo deve ter pelo menos 2 caracteres.' }),
  cpf: z
    .string()
    .min(11, { message: 'CPF deve ter 11 dígitos.' })
    .max(14, { message: 'CPF deve ter no máximo 14 caracteres.' })
    .refine((value) => cpf.isValid(value), { message: 'CPF inválido' }),
  email: z.string().email({ message: 'Digite um endereço de email válido.' }),
  phoneNumber: z
    .string()
    .min(10, { message: 'Telefone deve ter pelo menos 10 dígitos.' }),
  cep: z
    .string()
    .min(8, { message: 'CEP inválido' })
    .regex(/^\d{5}-?\d{3}$/, { message: 'Formato de CEP inválido' }),
  streetAddress: z
    .string()
    .min(2, { message: 'Endereço deve ter pelo menos 2 caracteres.' }),
  number: z.string().min(1, { message: 'Número é obrigatório.' }),
  complement: z.string().optional(),
  neighborhood: z
    .string()
    .min(2, { message: 'Bairro deve ter pelo menos 2 caracteres.' }),
  city: z
    .string()
    .min(2, { message: 'Cidade deve ter pelo menos 2 caracteres.' }),
  state: z.string().length(2, { message: 'Selecione um estado válido.' }),
})

export type IFormSchema = z.infer<typeof formSchema>

export function Content() {
  const router = useRouter()

  const { cart, subTotal, total, removeAllProducts } = useCart()

  const { mutate: createBilling } = useCreateBilling()

  const { data: profile } = useGetProfile()

  const form = useForm<IFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      cpf: '',
      email: '',
      phoneNumber: '',
      cep: '',
      streetAddress: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
    },
  })

  const { reset } = form

  async function handleCepChange(cep: string) {
    const cepValue = cep.replace(/\D/g, '')

    if (cepValue.length === 8) {
      const address = await getAddress(cepValue)

      if (address) {
        form.setValue('streetAddress', address.logradouro || '')
        form.setValue('neighborhood', address.bairro || '')
        form.setValue('city', address.localidade || '')
        form.setValue('state', address.uf || '')
      }
    }
  }

  function onSubmit(values: IFormSchema) {
    const {
      fullName,
      email,
      cpf,
      phoneNumber,
      cep,
      streetAddress,
      number,
      complement,
      neighborhood,
      city,
      state,
    } = values

    if (!profile?.customer) {
      createBilling(
        {
          billing: {
            customer: {
              name: fullName,
              email,
              taxId: cpf,
              cellphone: phoneNumber,
            },
            products: cart.map(
              ({ id, name, description, price, cartQuantity }) => ({
                externalId: id,
                name,
                description,
                quantity: cartQuantity,
                price: String(Number(price) * 100),
              }),
            ),
            address: {
              cep,
              address: streetAddress,
              number,
              complement,
              neighborhood,
              city,
              state,
            },
          },
        },
        {
          onSuccess: ({ url }) => {
            router.push(url)

            removeAllProducts()
          },
        },
      )
    }

    if (profile?.customer) {
      createBilling(
        {
          billing: {
            customerId: profile.customer.gatewayId,
            products: cart.map(
              ({ id, name, description, price, cartQuantity }) => ({
                externalId: id,
                name,
                description,
                quantity: cartQuantity,
                price: String(Number(price) * 100),
              }),
            ),
            address: {
              cep,
              address: streetAddress,
              number,
              complement,
              neighborhood,
              city,
              state,
            },
          },
        },
        {
          onSuccess: ({ url }) => {
            router.push(url)

            removeAllProducts()
          },
        },
      )
    }
  }

  useEffect(() => {
    if (profile?.name || profile?.email || profile?.customer) {
      reset({
        fullName: profile?.name ?? '',
        cpf: profile?.customer?.taxId ?? '',
        email: profile?.email ?? '',
        phoneNumber: profile?.customer?.cellphone ?? '',
        cep: '',
        streetAddress: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
      })
    }
  }, [profile])

  return (
    <section className="flex flex-col gap-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full grid-cols-2 gap-15 space-y-4"
        >
          <div className="w-full space-y-8">
            <div className="space-y-8">
              <h1 className="text-2xl font-medium">Detalhes de cobrança</h1>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Dados Pessoais</h2>

              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={!!profile?.name}
                        placeholder="John Doe"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="cpf"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <InputMask
                        {...field}
                        mask="999.999.999-99"
                        placeholder="000.000.000-00"
                        disabled={!!profile?.customer?.taxId}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-4 md:flex-row">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="exemplo@email.com"
                          disabled={!!profile?.email}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={() => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input
                          {...withMask(form.register('phoneNumber'), {
                            mask: '(99) 99999-9999',
                          })}
                          placeholder="(11) 98765-4321"
                          disabled={!!profile?.customer?.cellphone}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <h2 className="text-xl font-semibold">Endereço de Entrega</h2>

              <FormField
                control={form.control}
                name="cep"
                render={() => (
                  <FormItem>
                    <FormLabel>CEP</FormLabel>
                    <FormControl>
                      <InputMask
                        {...form.register('cep')}
                        mask="99999-999"
                        placeholder="00000-000"
                        onChange={(e: { target: { value: string } }) => {
                          handleCepChange(e.target.value)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-4 md:flex-row">
                <FormField
                  control={form.control}
                  name="streetAddress"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Endereço</FormLabel>
                      <FormControl>
                        <Input placeholder="Rua das Flores" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col gap-4 md:flex-row">
                <FormField
                  control={form.control}
                  name="number"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>Número</FormLabel>
                      <FormControl>
                        <Input placeholder="123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="complement"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>Complemento</FormLabel>
                      <FormControl>
                        <Input placeholder="Apto 101, Bloco B" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="neighborhood"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bairro</FormLabel>
                    <FormControl>
                      <Input placeholder="Centro" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-4 md:flex-row">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>Cidade</FormLabel>
                      <FormControl>
                        <Input placeholder="São Paulo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>Estado</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o estado" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="AC">AC</SelectItem>
                          <SelectItem value="AL">AL</SelectItem>
                          <SelectItem value="AP">AP</SelectItem>
                          <SelectItem value="AM">AM</SelectItem>
                          <SelectItem value="BA">BA</SelectItem>
                          <SelectItem value="CE">CE</SelectItem>
                          <SelectItem value="DF">DF</SelectItem>
                          <SelectItem value="ES">ES</SelectItem>
                          <SelectItem value="GO">GO</SelectItem>
                          <SelectItem value="MA">MA</SelectItem>
                          <SelectItem value="MT">MT</SelectItem>
                          <SelectItem value="MS">MS</SelectItem>
                          <SelectItem value="MG">MG</SelectItem>
                          <SelectItem value="PA">PA</SelectItem>
                          <SelectItem value="PB">PB</SelectItem>
                          <SelectItem value="PR">PR</SelectItem>
                          <SelectItem value="PE">PE</SelectItem>
                          <SelectItem value="PI">PI</SelectItem>
                          <SelectItem value="RJ">RJ</SelectItem>
                          <SelectItem value="RN">RN</SelectItem>
                          <SelectItem value="RS">RS</SelectItem>
                          <SelectItem value="RO">RO</SelectItem>
                          <SelectItem value="RR">RR</SelectItem>
                          <SelectItem value="SC">SC</SelectItem>
                          <SelectItem value="SP">SP</SelectItem>
                          <SelectItem value="SE">SE</SelectItem>
                          <SelectItem value="TO">TO</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="mt-32 w-full space-y-8">
            {cart.map((product) => {
              const { id, name, price, productImage } = product

              return (
                <div key={id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="group dark:bg-muted-foreground/10 relative mb-1 flex h-[4rem] w-[4rem] items-center justify-center border bg-neutral-100 p-0">
                      <Image
                        src={productImage[0].image.url}
                        alt="product"
                        fill
                        quality={100}
                        priority
                        className="object-cover p-1"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        unoptimized
                      />
                    </div>

                    <span className="max-w-[21rem] text-base font-medium">
                      {name}
                    </span>
                  </div>

                  <span className="text-sm font-medium">
                    {formatPrice(price)}
                  </span>
                </div>
              )
            })}

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-base">Subtotal:</span>
                <span className="text-muted-foreground text-sm">
                  {formatPrice(subTotal)}
                </span>
              </div>

              <Separator />

              <div className="flex justify-between">
                <span className="text-base">Frete:</span>
                <span className="text-sm">Grátis</span>
              </div>

              <Separator />

              <div className="flex justify-between">
                <span className="text-base">Total:</span>
                <span className="text-muted-foreground text-sm">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            <Button size="lg" type="submit" className="w-full">
              Finalizar compra
            </Button>
          </div>
        </form>
      </Form>
    </section>
  )
}
