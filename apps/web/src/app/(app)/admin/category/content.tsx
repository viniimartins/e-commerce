import { PlusIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function Content() {
  return (
    <>
      <div className="flex justify-end">
        <Button>
          <PlusIcon className="size-4" />
          Adicionar Categoria
        </Button>
      </div>

      {/* <DataTable columns={columns} data={data} /> */}
    </>
  )
}
