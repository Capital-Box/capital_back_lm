import { OrderChangeStatusEvent } from 'modules/orders/domain/events/order_change_status.event';
import { OrderHistoryService } from '../services/order_history.service';
import { ISubscriber } from '@lib/application/interfaces/subscriber.interface';

export class OrderStatusEventSubscriber implements ISubscriber {
  constructor(private readonly orderHistoryService: OrderHistoryService) {}

  getSubscriptionsEvents(): string[] {
    return [OrderChangeStatusEvent.event_type];
  }

  async invoke(event: OrderChangeStatusEvent): Promise<void> {
    await this.orderHistoryService.save(event);
  }
}
