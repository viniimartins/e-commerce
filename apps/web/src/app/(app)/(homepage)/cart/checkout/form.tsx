'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { cpf } from 'cpf-cnpj-validator'
import { useForm } from 'react-hook-form'
import { MaskedInput, withMask } from 'react-maskara'
import z from 'zod'

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
import { cn } from '@/lib/utils'
import { getAddress } from '@/service/cep'

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

type IFormSchema = z.infer<typeof formSchema>

export function CheckoutForm() {
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
    console.log('Dados do formulário:', values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Dados Pessoais</h2>

          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Completo</FormLabel>
                <FormControl>
                  <Input placeholder="João Silva" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cpf"
            render={() => (
              <FormItem>
                <FormLabel>CPF</FormLabel>
                <FormControl>
                  <Input
                    {...withMask(form.register('cpf'), {
                      mask: '999.999.999-99',
                    })}
                    placeholder="000.000.000-00"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="exemplo@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={() => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input
                      {...withMask(form.register('phoneNumber'), {
                        mask: '(99) 99999-9999',
                      })}
                      placeholder="(11) 98765-4321"
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
                  <MaskedInput
                    className={cn(
                      'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                      'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
                      'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
                    )}
                    mask="99999-999"
                    placeholder="00000-000"
                    {...form.register('cep')}
                    onChange={(e) => {
                      handleCepChange(e.target.value)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="streetAddress"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input placeholder="Rua das Flores" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
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
                <FormItem>
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

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
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
                <FormItem>
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

        <Button type="submit" className="mt-6 w-full">
          Finalizar Compra
        </Button>
      </form>
    </Form>
  )
}
