import { Exception } from '@lib/shared/exceptions/exception';
import { OrderMainStatuses } from '../enums/order_statuses.enum';
import { OrderSubStatuses } from '../enums/order_sub_statuses.enum';
import { HttpStatus } from '@lib/infrastructure/enums/http_status.enum';

export class OrderAlreadyHasStatusException extends Exception {
  constructor(status: OrderMainStatuses, subStatus: OrderSubStatuses) {
    super({
      status: HttpStatus.BAD_REQUEST,
      code: 'order_already_has_status',
      title: 'Order already has that status',
      detail: `The order already has the status "${status} - ${subStatus}".`,
    });
  }
}
