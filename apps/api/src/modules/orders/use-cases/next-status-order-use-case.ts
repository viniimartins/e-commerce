import { BadRequestError, NotFoundError } from '@common/errors'
import {
  FIND_ORDER_BY_ID_REPOSITORY_TOKEN,
  NEXT_STATUS_ORDER_REPOSITORY_TOKEN,
} from '@modules/orders/constants'
import type {
  INextStatusOrder,
  INextStatusOrderUseCase,
} from '@modules/orders/domain/use-cases'
import type {
  IFindOrderByIdRepository,
  INextStatusOrderRepository,
} from '@modules/orders/repositories'
import { OrderStatus } from '@prisma/client'
import { inject, injectable } from 'tsyringe'
import { advanceOrderStatus } from 'utils/advanceOrderStatus'

@injectable()
class NextStatusOrderUseCase implements INextStatusOrderUseCase {
  constructor(
    @inject(NEXT_STATUS_ORDER_REPOSITORY_TOKEN)
    private readonly nextStatusOrderRepository: INextStatusOrderRepository,

    @inject(FIND_ORDER_BY_ID_REPOSITORY_TOKEN)
    private readonly findOrderByIdRepository: IFindOrderByIdRepository,
  ) {
    // eslint-disable-next-line prettier/prettier
  }

  async execute(
    data: INextStatusOrder.Request,
  ): Promise<INextStatusOrder.Response> {
    const { orderId } = data

    const order = await this.findOrderByIdRepository.findById({
      orderId,
    })

    if (!order) {
      throw new NotFoundError('Order not found')
    }

    if (order.currentStatus === OrderStatus.DELIVERED) {
      throw new BadRequestError('Order already delivered')
    }

    const nextStatus = advanceOrderStatus(order.currentStatus)

    await this.nextStatusOrderRepository.nextStatus({
      orderId,
      status: nextStatus,
    })
  }
}

export { NextStatusOrderUseCase }
