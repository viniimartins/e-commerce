namespace ITotalRevenue {
  export type Response = number
}

interface ITotalRevenueRepository {
  totalRevenue: () => Promise<ITotalRevenue.Response>
}

export { ITotalRevenue, ITotalRevenueRepository }
