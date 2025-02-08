import { Event } from '@lib/domain/event';
import { UUID } from '@shared/value_objects/uuid.vo';
import { OrderStatus } from '../value_objects/order_status.vo';

export class OrderChangeStatusEvent extends Event {
  static event_type = 'order.change_status';

  getEventType(): string {
    return OrderChangeStatusEvent.event_type;
  }

  constructor(
    private readonly orderId: UUID,
    private readonly status: OrderStatus,
  ) {
    super();
  }

  getOrderId(): string {
    return this.orderId.getUUID();
  }

  getStatus(): OrderStatus {
    return this.status;
  }

  getMainStatus(): string {
    return this.status.getMainStatus();
  }

  getSubStatus(): string {
    return this.status.getSubStatus();
  }
}
