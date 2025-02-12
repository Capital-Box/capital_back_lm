import { UUID } from '@shared/value_objects/uuid.vo';
import { OrderStatus } from '../value_objects/order_status.vo';

interface OrderHistoryConstructor {
  order_id: UUID;
  id: UUID;
  order_status: OrderStatus;
  created_at: Date;
}

export class OrderHistory {
  private readonly order_id: UUID;
  private readonly id: UUID;
  private readonly order_status: OrderStatus;
  private readonly created_at: Date;

  constructor(orderHistory: OrderHistoryConstructor) {
    this.order_id = orderHistory.order_id;
    this.id = orderHistory.id;
    this.order_status = orderHistory.order_status;
    this.created_at = orderHistory.created_at;
  }

  getOrderId(): string {
    return this.order_id.getUUID();
  }

  getId(): string {
    return this.id.getUUID();
  }

  getOrderStatus(): OrderStatus {
    return this.order_status;
  }

  getCreatedAt(): Date {
    return this.created_at;
  }
}
