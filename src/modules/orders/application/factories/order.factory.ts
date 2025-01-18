import { Order } from "modules/orders/domain/entities/order.entity";
import { CreateOrderDTO } from "../dtos/create_order.dto";
import { UUID } from "@shared/value_objects/uuid.vo";
import { OrderStatus } from "modules/orders/domain/value_objects/order_status.vo";
import { OrderMainStatuses } from "modules/orders/domain/enums/order_statuses.enum";
import { OrderSubStatuses } from "modules/orders/domain/enums/order_sub_statuses.enum";

export class OrderFactory {
  static create(createOrderDTO: CreateOrderDTO): Order {
    const id = UUID.create();
    const status = new OrderStatus({ mainStatus: OrderMainStatuses.CREATED, subStatus: OrderSubStatuses.PENDING });
    return new Order({
      id,
      status,
      createdDate: new Date(),
      lastUpdated: new Date()
    })
  }
}