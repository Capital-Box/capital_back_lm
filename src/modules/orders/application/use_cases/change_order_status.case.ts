import { ChangeOrderStatusDTO } from '../dtos/change_order_status.dto';
import { NextOrderStatusDTO } from '../dtos/next_order_status.dto';
import { OrderDTO } from '../dtos/order.dto';
import { PrevOrderStatusDTO } from '../dtos/prev_order_status.dto';

export interface ChangeOrderStatusCase {
  changeStatus(
    changeOrderStatusDTO:
      | ChangeOrderStatusDTO
      | NextOrderStatusDTO
      | PrevOrderStatusDTO,
  ): Promise<OrderDTO>;
}
