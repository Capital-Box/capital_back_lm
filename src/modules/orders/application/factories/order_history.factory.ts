import { UUID } from '@shared/value_objects/uuid.vo';
import { OrderHistory } from 'modules/orders/domain/entities/order_history.entity';
import { OrderChangeStatusEvent } from 'modules/orders/domain/events/order_change_status.event';

export class OrderHistoryFactory {
  static createFromEvent(order: OrderChangeStatusEvent): OrderHistory {
    return new OrderHistory({
      order_id: new UUID(order.getOrderId()),
      id: UUID.create(),
      order_status: order.getStatus(),
      created_at: new Date(),
    });
  }
}
