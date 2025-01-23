import { CreateOrderDTO } from '../dtos/create_order.dto';
import { OrderDTO } from '../dtos/order.dto';

export interface CreateOrderCase {
  save(createOrderDTO: CreateOrderDTO): Promise<OrderDTO>;
}
