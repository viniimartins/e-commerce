namespace ITotalOrders {
  export type Response = number
}

interface ITotalOrdersRepository {
  totalOrders: () => Promise<ITotalOrders.Response>
}

export { ITotalOrders, ITotalOrdersRepository }
