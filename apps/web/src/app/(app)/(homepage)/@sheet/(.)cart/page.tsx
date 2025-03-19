import { Sheet, SheetHeader, SheetTitle } from '@/components/ui/sheet'

import { Content } from './content'
import { InterceptedSheetContent } from './intercepted-sheet-content'

export default function Cart() {
  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent>
        <SheetHeader>
          <SheetTitle className="text-3xl">Cart</SheetTitle>
        </SheetHeader>

        <Content />
      </InterceptedSheetContent>
    </Sheet>
  )
}
