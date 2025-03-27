import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const formatDateLong = (date: string | Date) => {
  if (!date) return ''
  return format(new Date(date), "d 'de' MMMM 'de' yyyy", { locale: ptBR })
}
