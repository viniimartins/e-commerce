import { NotFoundError } from '@common/errors/not-found-error'
import { FIND_ORDER_BY_ID_REPOSITORY_TOKEN } from '@modules/orders/constants'
import type {
  IFindOrderById,
  IFindOrderByIdUseCase,
} from '@modules/orders/domain/use-cases/find-order-by-id-use-case'
import type { IFindOrderByIdRepository } from '@modules/orders/repositories/find-order-by-id-repository'
import { inject, injectable } from 'tsyringe'

@injectable()
class FindOrderByIdUseCase implements IFindOrderByIdUseCase {
  constructor(
    @inject(FIND_ORDER_BY_ID_REPOSITORY_TOKEN)
    private readonly findOrderByIdRepository: IFindOrderByIdRepository,
    // eslint-disable-next-line prettier/prettier
  ) { }

  async execute(
    params: IFindOrderById.Request,
  ): Promise<IFindOrderById.Response> {
    const { orderId } = params

    const foundOrder = await this.findOrderByIdRepository.findById({
      orderId,
    })

    if (!foundOrder) {
      throw new NotFoundError('Order not found')
    }

    return foundOrder
  }
}

export { FindOrderByIdUseCase }
