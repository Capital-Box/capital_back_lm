import { OrderMainStatuses } from 'modules/orders/domain/enums/order_statuses.enum';
import { OrderSubStatuses } from 'modules/orders/domain/enums/order_sub_statuses.enum';
import { LocationDTO } from './location.dto';
import { PackageDTO } from './package.dto';

interface OrderConstructor {
  id: string;
  externalProvider: string | null;
  externalId: string | null;
  receiverId: string;
  origin: LocationDTO;
  destiny: LocationDTO;
  mainStatus: OrderMainStatuses;
  subStatus: OrderSubStatuses;
  packages: PackageDTO[];
  createdDate: Date;
  lastUpdated: Date;
}

export class OrderDTO {
  private readonly id: string;
  private readonly externalProvider: string | null;
  private readonly externalId: string | null;
  private readonly receiverId: string;
  private readonly origin: LocationDTO;
  private readonly destiny: LocationDTO;
  private readonly mainStatus: OrderMainStatuses;
  private readonly subStatus: OrderSubStatuses;
  private readonly packages: PackageDTO[];
  private readonly createdDate: Date;
  private readonly lastUpdated: Date;

  constructor(order: OrderConstructor) {
    this.id = order.id;
    this.externalProvider = order.externalProvider;
    this.externalId = order.externalId;
    this.receiverId = order.receiverId;
    this.origin = order.origin;
    this.destiny = order.destiny;
    this.mainStatus = order.mainStatus;
    this.subStatus = order.subStatus;
    this.packages = order.packages;
    this.createdDate = order.createdDate;
    this.lastUpdated = order.lastUpdated;
  }

  getId(): string {
    return this.id;
  }

  getExternalProvider(): string | null {
    return this.externalProvider;
  }

  getExternalId(): string | null {
    return this.externalId;
  }

  getReceiverId(): string {
    return this.receiverId;
  }

  getOrigin(): LocationDTO {
    return this.origin;
  }

  getDestiny(): LocationDTO {
    return this.destiny;
  }

  getMainStatus(): OrderMainStatuses {
    return this.mainStatus;
  }

  getSubStatus(): OrderSubStatuses {
    return this.subStatus;
  }

  getPackages(): PackageDTO[] {
    return this.packages;
  }

  getCreatedDate(): Date {
    return this.createdDate;
  }

  getLastUpdated(): Date {
    return this.lastUpdated;
  }
}
