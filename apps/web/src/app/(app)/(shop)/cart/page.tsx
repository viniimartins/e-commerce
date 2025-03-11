import Image from 'next/image'
import Link from 'next/link'

import gamepadSmall from '@/assets/g92-2-500x500 1.png'
import x from '@/assets/Vector.svg'
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

export default function Cart() {
  const products = [
    {
      name: 'H1 Gamepad',
      price: '$550.00',
      quantity: '2',
      subtotal: '1200',
    },
    {
      name: 'H1 Gamepad',
      price: '$550.00',
      quantity: '2',
      subtotal: '1200',
    },
    {
      name: 'H1 Gamepad',
      price: '$550.00',
      quantity: '2',
      subtotal: '1200',
    },
  ]

  return (
    <>
      <Breadcrumb className="mt-14">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Cart</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Table className="border-spacing-y-4">
        <TableHeader>
          <TableRow className="shadow-sm">
            <TableHead className="p-6 text-foreground">Product</TableHead>
            <TableHead className="text-foreground">Price</TableHead>
            <TableHead className="text-foreground">Quantity</TableHead>
            <TableHead className="text-center text-foreground">
              Subtotal
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={index} className="shadow-sm">
              <TableCell className="group relative flex items-center gap-4 p-6">
                <div className="absolute left-4 top-5 hidden group-hover:block">
                  <Button size="icon" className="h-4 w-4 rounded-full">
                    <Image
                      src={x}
                      width={8}
                      height={8}
                      className="h-2 w-2"
                      alt="Vector X remove item"
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
              <TableCell className="py-6 text-sm text-muted-foreground">
                {product.price}
              </TableCell>
              <TableCell className="py-6">
                <Input type="number" className="w-20" min={1} placeholder="2" />
              </TableCell>
              <TableCell className="p-6 text-center">
                {product.subtotal}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between">
        <Link href="/">
          <Button size="lg" variant="outline">
            Return To Shop
          </Button>
        </Link>

        <Card className="w-96 rounded-none">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Cart Total</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between text-base font-medium">
              <span className="text-base">Subtotal:</span>

              <span className="text-sm text-muted-foreground">$1750</span>
            </div>

            <Separator />
            <div className="flex items-center justify-between text-base font-medium">
              <span className="text-base">Shipping:</span>

              <span className="text-sm text-muted-foreground">Free</span>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-base font-medium">
              <span className="text-base">Total:</span>

              <span className="text-sm text-muted-foreground">$1750</span>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/cart/checkout" className="ml-auto">
              <Button>Process to checkout</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
