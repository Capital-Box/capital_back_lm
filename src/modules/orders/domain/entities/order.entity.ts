import { UUID } from "@shared/value_objects/uuid.vo";
import { OrderStatus } from "../value_objects/order_status.vo";

interface OrderConstructor {
  id: UUID;
  status: OrderStatus;
  createdDate: Date;
  lastUpdated: Date;
}

export class Order {
  private readonly id: UUID;
  private readonly status: OrderStatus;
  private readonly createdDate: Date;
  private readonly lastUpdated: Date;

  constructor(order: OrderConstructor) {
    this.id = order.id;
    this.status = order.status;
    this.createdDate = order.createdDate;
    this.lastUpdated = order.lastUpdated;
  }

  getId(): string {
    return this.id.getUUID();
  }

  getStatus(): OrderStatus {
    return this.status;
  }

  getCreatedDate(): Date {
    return this.createdDate;
  }

  getLastUpdated(): Date {
    return this.lastUpdated;
  }
}
