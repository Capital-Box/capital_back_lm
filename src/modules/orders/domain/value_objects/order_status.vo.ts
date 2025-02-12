import { OrderMainStatuses } from '../enums/order_statuses.enum';
import { OrderSubStatuses } from '../enums/order_sub_statuses.enum';
import { OrderAlreadyHasStatusException } from '../exceptions/already_has_status.exception';
import { InvalidSubStateForStateException } from '../exceptions/invalid_substate.exception';

type StatusesSchema = { [key in OrderMainStatuses]: OrderSubStatuses[] };

interface OrderStatusConstructor {
  mainStatus: OrderMainStatuses;
  subStatus: OrderSubStatuses;
}

export class OrderStatus {
  private mainStatus: OrderMainStatuses;
  private subStatus: OrderSubStatuses;

  constructor(orderStatuses: OrderStatusConstructor) {
    this.mainStatus = orderStatuses.mainStatus;
    this.subStatus = orderStatuses.subStatus;
  }

  static getStatusesSchema(): StatusesSchema {
    return {
      [OrderMainStatuses.CREATED]: [
        OrderSubStatuses.PENDING,
        OrderSubStatuses.IN_PREPARATION,
        OrderSubStatuses.READY_TO_SHIP,
      ],
      [OrderMainStatuses.IN_TRANSIT]: [
        OrderSubStatuses.IN_TRANSIT,
        OrderSubStatuses.LAST_MILE_DELIVERY,
        OrderSubStatuses.FAILED_DELIVERY_ATTEMPT,
        OrderSubStatuses.WAITING_FOR_WITHDRAWAL,
      ],
      [OrderMainStatuses.DELIVERED]: [OrderSubStatuses.DELIVERED],
      [OrderMainStatuses.NOT_DELIVERED]: [
        OrderSubStatuses.INVALID_ADDRESS,
        OrderSubStatuses.CARRIER_CANCELED,
        OrderSubStatuses.BUYER_CANCELLED,
        OrderSubStatuses.SYSTEM_CANCELLED,
        OrderSubStatuses.SELLER_CANCELLED,
      ],
      [OrderMainStatuses.CANCELLED]: [
        OrderSubStatuses.INVALID_ADDRESS,
        OrderSubStatuses.CARRIER_CANCELED,
        OrderSubStatuses.BUYER_CANCELLED,
        OrderSubStatuses.SYSTEM_CANCELLED,
        OrderSubStatuses.SELLER_CANCELLED,
      ],
    };
  }

  getMainStatus(): OrderMainStatuses {
    return this.mainStatus;
  }

  getSubStatus(): OrderSubStatuses {
    return this.subStatus;
  }

  isValid(mainStatus: OrderMainStatuses, subStatus: OrderSubStatuses): boolean {
    const schema = OrderStatus.getStatusesSchema();
    return schema[mainStatus].includes(subStatus);
  }

  sameStatus(
    mainStatus: OrderMainStatuses,
    subStatus: OrderSubStatuses,
  ): boolean {
    return this.mainStatus === mainStatus && this.subStatus === subStatus;
  }

  changeStatus(mainStatus: OrderMainStatuses, subStatus: OrderSubStatuses) {
    if (this.sameStatus(mainStatus, subStatus))
      throw new OrderAlreadyHasStatusException(mainStatus, subStatus);
    if (!this.isValid(mainStatus, subStatus))
      throw new InvalidSubStateForStateException(mainStatus, subStatus);
    this.mainStatus = mainStatus;
    this.subStatus = subStatus;
  }

  nextStatus() {
    const schema = OrderStatus.getStatusesSchema();
    const indexSubStatus = schema[this.mainStatus].indexOf(this.subStatus);
    if (indexSubStatus === schema[this.mainStatus].length - 1) {
      const indexMainStatus = Object.values(OrderMainStatuses).indexOf(
        this.mainStatus,
      );
      this.mainStatus = Object.values(OrderMainStatuses)[indexMainStatus + 1];
      this.subStatus = schema[this.mainStatus][0];
    } else {
      this.subStatus = schema[this.mainStatus][indexSubStatus + 1];
    }
  }

  prevStatus() {
    const schema = OrderStatus.getStatusesSchema();
    const indexSubStatus = schema[this.mainStatus].indexOf(this.subStatus);
    if (indexSubStatus === 0) {
      const indexMainStatus = Object.values(OrderMainStatuses).indexOf(
        this.mainStatus,
      );
      this.mainStatus = Object.values(OrderMainStatuses)[indexMainStatus - 1];
      this.subStatus =
        schema[this.mainStatus][schema[this.mainStatus].length - 1];
    } else {
      this.subStatus = schema[this.mainStatus][indexSubStatus - 1];
    }
  }
}
