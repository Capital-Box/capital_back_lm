import { OrderMainStatuses } from '../enums/order_statuses.enum';
import { OrderSubStatuses } from '../enums/order_sub_statuses.enum';

export class InvalidSubStateForStateException extends Error {
  constructor(state: OrderMainStatuses, subState: OrderSubStatuses) {
    super(
      `The substate "${subState}" is not valid for the current state "${state}".`,
    );
    this.name = 'InvalidSubStateForStateException';
  }
}
