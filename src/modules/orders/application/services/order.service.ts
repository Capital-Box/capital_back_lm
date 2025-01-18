import { CreateOrderDTO } from "../dtos/create_order.dto";
import { OrderDTO } from "../dtos/order.dto";
import { OrderFactory } from "../factories/order.factory";
import { OrderMapper } from "../mappers/order.mapper";
import { CreateOrderCase } from "../use_cases/create_order.case";

export class OrderService implements CreateOrderCase {
  async save(createOrderDTO: CreateOrderDTO): Promise<OrderDTO> {
    const order = OrderFactory.create(createOrderDTO);
    return OrderMapper.toDTO(order);
  }
}