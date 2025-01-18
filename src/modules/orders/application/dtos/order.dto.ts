import { OrderMainStatuses } from "modules/orders/domain/enums/order_statuses.enum";
import { OrderSubStatuses } from "modules/orders/domain/enums/order_sub_statuses.enum";

interface OrderConstructor {
  id: string;
  mainStatus: OrderMainStatuses;
  subStatus: OrderSubStatuses;
  createdDate: Date;
  lastUpdated: Date;
}

export class OrderDTO {
  private readonly id: string;
  private readonly mainStatus: OrderMainStatuses;
  private readonly subStatus: OrderSubStatuses;
  private readonly createdDate: Date;
  private readonly lastUpdated: Date;

  constructor(order: OrderConstructor) {
    this.id = order.id;
    this.mainStatus = order.mainStatus;
    this.subStatus = order.subStatus;
    this.createdDate = order.createdDate;
    this.lastUpdated = order.lastUpdated;
  }

  getId(): string {
    return this.id;
  }

  getMainStatus(): OrderMainStatuses {
    return this.mainStatus;
  }

  getSubStatus(): OrderSubStatuses {
    return this.subStatus;
  }

  getCreatedDate(): Date {
    return this.createdDate;
  }

  getLastUpdated(): Date {
    return this.lastUpdated;
  }
}