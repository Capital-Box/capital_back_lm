import { Event } from "@lib/domain/event";

export class OrderChangeStatusEvent extends Event {
  constructor(
    private readonly orderId: string,
    private readonly mainStatus: string,
    private readonly subStatus: string
  ) {
    super('order.change_status');
  }

  getOrderId(): string {
    return this.orderId;
  }

  getMainStatus(): string {
    return this.mainStatus;
  }

  getSubStatus(): string {
    return this.subStatus;
  }
}