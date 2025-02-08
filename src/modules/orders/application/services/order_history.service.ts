import { OrderHistoryDTO } from '../dtos/order_history.dto';
import { OrderHistoryRepository } from 'modules/orders/infrastructure/ports/order_history_repository.port';
import { OrderHistoryFactory } from '../factories/order_history.factory';
import { OrderHistoryMapper } from '../mappers/order_history.mapper';
import { OrderChangeStatusEvent } from 'modules/orders/domain/events/order_change_status.event';

export class OrderHistoryService {
  constructor(
    private readonly orderHistoryRepository: OrderHistoryRepository,
  ) {}

  async save(updatedOrder: OrderChangeStatusEvent): Promise<OrderHistoryDTO> {
    const orderHistory = OrderHistoryFactory.createFromEvent(updatedOrder);
    await this.orderHistoryRepository.save(orderHistory);
    return OrderHistoryMapper.toDTO(orderHistory);
  }
}
