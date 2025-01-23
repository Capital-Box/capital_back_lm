import { UUID } from '@shared/value_objects/uuid.vo';
import { OrderStatus } from '../value_objects/order_status.vo';
import { OrderMainStatuses } from '../enums/order_statuses.enum';
import { OrderSubStatuses } from '../enums/order_sub_statuses.enum';
import { Entity } from '@lib/domain/entity';
import { OrderChangeStatusEvent } from '../events/order_change_status.event';
import { ExternalProvider } from '../value_objects/external_provider.vo';
import { ExternalProviders } from '../enums/external_providers.enum';

interface OrderConstructor {
  id: UUID;
  externalProvider: ExternalProvider | null;
  receiverId: string;
  status: OrderStatus;
  createdDate: Date;
  lastUpdated: Date;
}

export class Order extends Entity {
  private readonly id: UUID;
  private readonly externalProvider: ExternalProvider | null;
  private readonly receiverId: string;
  private readonly status: OrderStatus;
  private readonly createdDate: Date;
  private readonly lastUpdated: Date;

  constructor(order: OrderConstructor) {
    super();
    this.id = order.id;
    this.externalProvider = order.externalProvider;
    this.receiverId = order.receiverId;
    this.status = order.status;
    this.createdDate = order.createdDate;
    this.lastUpdated = order.lastUpdated;
  }

  getId(): string {
    return this.id.getUUID();
  }

  getReceiverId(): string {
    return this.receiverId;
  }

  getExternalProvider(): ExternalProviders | null {
    return this.externalProvider?.getExternalProvider() || null;
  }

  getExternalId(): string | null {
    return this.externalProvider?.getExternalId() || null;
  }

  getMainStatus(): OrderMainStatuses {
    return this.status.getMainStatus();
  }

  getSubStatus(): OrderSubStatuses {
    return this.status.getSubStatus();
  }

  changeStatus(
    mainStatus: OrderMainStatuses,
    subStatus: OrderSubStatuses,
  ): void {
    this.status.changeStatus(mainStatus, subStatus);
    this.addEvent(
      new OrderChangeStatusEvent(this.id.getUUID(), mainStatus, subStatus),
    );
  }

  getCreatedDate(): Date {
    return this.createdDate;
  }

  getLastUpdated(): Date {
    return this.lastUpdated;
  }
}
