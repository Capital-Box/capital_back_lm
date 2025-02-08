import { Exception } from '@lib/shared/exceptions/exception';
import { OrderMainStatuses } from '../enums/order_statuses.enum';
import { OrderSubStatuses } from '../enums/order_sub_statuses.enum';
import { HttpStatus } from '@lib/infrastructure/enums/http_status.enum';

export class InvalidSubStateForStateException extends Exception {
  constructor(state: OrderMainStatuses, subState: OrderSubStatuses) {
    super({
      status: HttpStatus.BAD_REQUEST,
      code: 'invalid_substate_for_state',
      title: 'Invalid substate for state',
      detail: `The substate "${subState}" is not valid for the current state "${state}".`,
    });
    this.name = 'InvalidSubStateForStateException';
  }
}
