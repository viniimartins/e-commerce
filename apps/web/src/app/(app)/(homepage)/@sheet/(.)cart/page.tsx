import {
  Sheet,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

import { Content } from './content'
import { InterceptedSheetContent } from './intercepted-sheet-content'

export default function Cart() {
  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent>
        <SheetHeader>
          <SheetTitle className="text-3xl">Carrinho</SheetTitle>
          <SheetDescription className="hidden" />
        </SheetHeader>

        <Content />
      </InterceptedSheetContent>
    </Sheet>
  )
}
