import { OrderMainStatuses } from "../enums/order_statuses.enum";
import { OrderSubStatuses } from "../enums/order_sub_statuses.enum";
import { InvalidSubStateForStateException } from "../exceptions/invalid_substate.exception";

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

  changeStatus(mainStatus: OrderMainStatuses, subStatus: OrderSubStatuses) {
    if (!this.isValid(mainStatus, subStatus))
      throw new InvalidSubStateForStateException(mainStatus, subStatus);
    this.mainStatus = mainStatus;
    this.subStatus = subStatus;
  }
}
