import { formatPrice } from '@/utils/format-price'

export interface PriceOption {
  id: string
  label: string
  min: number
  max: number
}

export const priceOptions: PriceOption[] = [
  { id: 'allprice', label: 'Todos os preços', min: 0, max: 0 },
  {
    id: '1',
    label: `${formatPrice(0)} - ${formatPrice(99.99)}`,
    min: 0,
    max: 99.99,
  },
  {
    id: '2',
    label: `${formatPrice(100)} - ${formatPrice(199.99)}`,
    min: 100,
    max: 199.99,
  },
  {
    id: '3',
    label: `${formatPrice(200)} - ${formatPrice(299.99)}`,
    min: 200,
    max: 299.99,
  },
  {
    id: '4',
    label: `${formatPrice(300)} - ${formatPrice(399.99)}`,
    min: 300,
    max: 399.99,
  },
  { id: '5', label: `${formatPrice(400)}+`, min: 400, max: 0 },
]
