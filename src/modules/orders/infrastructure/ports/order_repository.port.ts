import { Order } from "modules/orders/domain/entities/order.entity";

export interface OrderRepositoryPort {
  save(order: Order): Promise<void>;
}