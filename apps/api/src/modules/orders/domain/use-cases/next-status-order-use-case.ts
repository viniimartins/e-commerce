namespace INextStatusOrder {
  export type Request = {
    orderId: string
  }

  export type Response = void
}

interface INextStatusOrderUseCase {
  execute: (
    params: INextStatusOrder.Request,
  ) => Promise<INextStatusOrder.Response>
}

export { INextStatusOrder, INextStatusOrderUseCase }
