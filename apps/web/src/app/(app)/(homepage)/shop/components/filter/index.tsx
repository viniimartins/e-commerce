import { Checkbox } from '@/components/ui/checkbox'

export function Filter() {
  return (
    <aside className="space-y-10">
      <div className="space-y-4">
        <span className="text-xl font-medium">CATEGORIES</span>

        <div className="flex h-56 flex-col items-start gap-2 overflow-auto">
          {Array.from({ length: 10 }).map((_, index) => {
            return (
              <a
                key={index}
                className="text-sm font-medium text-muted-foreground hover:cursor-pointer hover:text-foreground hover:underline"
              >
                All Rooms
              </a>
            )
          })}
        </div>
      </div>

      <div className="space-y-4">
        <span className="text-xl font-medium">PRICE</span>

        <div className="flex flex-col items-start gap-2">
          <div className="flex w-full items-center justify-between">
            <label
              htmlFor="allprice"
              className="text-sm font-medium text-muted-foreground"
            >
              All price
            </label>
            <Checkbox id="allprice" />
          </div>

          <div className="flex w-full items-center justify-between">
            <label
              htmlFor="1"
              className="text-sm font-medium text-muted-foreground"
            >
              $0.00 - 99.99
            </label>
            <Checkbox id="1" />
          </div>

          <div className="flex w-full items-center justify-between">
            <label
              htmlFor="2"
              className="text-sm font-medium text-muted-foreground"
            >
              $100.00 - 199.99
            </label>
            <Checkbox id="2" />
          </div>

          <div className="flex w-full items-center justify-between">
            <label
              htmlFor="1"
              className="text-sm font-medium text-muted-foreground"
            >
              $200.00 - 299.99
            </label>
            <Checkbox id="1" />
          </div>

          <div className="flex w-full items-center justify-between">
            <label
              htmlFor="1"
              className="text-sm font-medium text-muted-foreground"
            >
              $300.00 - 399.99
            </label>
            <Checkbox id="1" />
          </div>

          <div className="flex w-full items-center justify-between">
            <label
              htmlFor="1"
              className="text-sm font-medium text-muted-foreground"
            >
              $400.00+
            </label>
            <Checkbox id="1" />
          </div>
        </div>
      </div>
    </aside>
  )
}
