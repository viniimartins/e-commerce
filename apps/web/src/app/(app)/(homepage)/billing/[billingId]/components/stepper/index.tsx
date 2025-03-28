import { CheckIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

export function Stepper() {
  const steps = [
    {
      id: 1,
      title: 'Pedido confirmado',
      status: 'completed',
      date: '10 de dezembro de 2024',
    },
    {
      id: 2,
      title: 'Pagamento aprovado',
      status: 'completed',
      date: '10 de dezembro de 2024',
    },
    { id: 3, title: 'Pedido preparado', status: 'pending', date: 'Pendente' },
    { id: 4, title: 'Enviando pedido', status: 'pending', date: 'Pendente' },
    { id: 5, title: 'Entregar pedido', status: 'pending', date: 'Pendente' },
  ]

  return (
    <div className="flex w-full items-center justify-between">
      {steps.map((step, index) => (
        <div
          key={step.id}
          className="relative flex w-full flex-col items-center"
        >
          <div className="flex flex-col items-center">
            <div
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full',
                step.status === 'completed'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-300 text-gray-500',
              )}
            >
              {step.status === 'completed' && <CheckIcon className="h-4 w-4" />}
            </div>

            <div className="mt-2 text-center text-sm font-medium">
              {step.title}
            </div>
            <div className="text-muted-foreground mt-1 text-center text-xs">
              {step.date}
            </div>
          </div>

          {index < steps.length - 1 && (
            <div
              className={cn(
                'absolute top-4 left-[8.3rem] h-[2px] w-[calc(100%-3rem)]',
                step.status === 'completed' ? 'bg-green-500' : 'bg-gray-300',
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}
