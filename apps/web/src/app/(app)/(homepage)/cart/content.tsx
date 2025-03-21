'use client'

import Image from 'next/image'
import Link from 'next/link'

import gamepadSmall from '@/assets/g92-2-500x500 1.png'
import x from '@/assets/Vector.svg'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useCart } from '@/providers/cart-provider'
import { formatPrice } from '@/utils/formatPrice'

export function Content() {
  const { cart, subTotal, total, removeToCart, handleQuantityChange } =
    useCart()

  return (
    <>
      <Table className="border-spacing-y-4">
        <TableHeader>
          <TableRow className="shadow-xs">
            <TableHead className="text-foreground p-6">Produto</TableHead>
            <TableHead className="text-foreground">Preço</TableHead>
            <TableHead className="text-foreground">Quantidade</TableHead>
            <TableHead className="text-foreground text-center">
              Subtotal
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart.map((product, index) => (
            <TableRow key={index} className="shadow-xs">
              <TableCell className="group relative flex items-center gap-4 p-6">
                <div className="absolute top-5 left-4 hidden group-hover:block">
                  <Button
                    size="icon"
                    variant="destructive"
                    className="h-4 w-4 rounded-full"
                    onClick={() => removeToCart(product.id)}
                  >
                    <Image
                      src={x}
                      width={8}
                      height={8}
                      alt=" X remove product"
                    />
                  </Button>
                </div>
                <Image
                  src={gamepadSmall}
                  width={50}
                  height={50}
                  alt="Image cart small"
                />
                {product.name}
              </TableCell>
              <TableCell className="text-muted-foreground py-6 text-sm">
                {product.price}
              </TableCell>
              <TableCell className="py-6">
                <Input
                  type="number"
                  className="w-20"
                  min={1}
                  value={product.cartQuantity ?? 0}
                  onChange={(e) =>
                    handleQuantityChange(product.id, Number(e.target.value))
                  }
                />
              </TableCell>
              <TableCell className="text-muted-foreground p-6 text-center text-sm">
                {formatPrice(product.price)}
              </TableCell>
            </TableRow>
          ))}

          {cart.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-muted-foreground p-8 text-center text-sm"
              >
                Seu carrinho está vazio
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex justify-between">
        <Link href="/">
          <Button size="lg" variant="outline">
            Voltar para a loja
          </Button>
        </Link>

        <Card className="w-96 rounded-none">
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Total do Carrinho
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between text-base font-medium">
              <span className="text-base">Subtotal:</span>

              <span className="text-muted-foreground text-sm">
                {formatPrice(subTotal)}
              </span>
            </div>

            <Separator />
            <div className="flex items-center justify-between text-base font-medium">
              <span className="text-base">Frete:</span>

              <span className="text-muted-foreground text-sm">Grátis</span>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-base font-medium">
              <span className="text-base">Total:</span>

              <span className="text-muted-foreground text-sm">
                {formatPrice(total)}
              </span>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/cart/checkout" className="ml-auto">
              <Button>Processar o pagamento</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
