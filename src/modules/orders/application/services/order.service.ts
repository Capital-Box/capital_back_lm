import { OrderRepositoryPort } from "modules/orders/infrastructure/ports/order_repository.port";
import { CreateOrderDTO } from "../dtos/create_order.dto";
import { OrderDTO } from "../dtos/order.dto";
import { OrderFactory } from "../factories/order.factory";
import { OrderMapper } from "../mappers/order.mapper";
import { CreateOrderCase } from "../use_cases/create_order.case";
import { IPublisher } from "@lib/application/interfaces/publisher.interface";
import { Order } from "modules/orders/domain/entities/order.entity";

interface OrderServiceDependencies {
  repository: OrderRepositoryPort;
  publisher?: IPublisher;
}
export class OrderService implements CreateOrderCase {
  constructor(private _dependencies: OrderServiceDependencies) { }

  async save(createOrderDTO: CreateOrderDTO): Promise<OrderDTO> {
    const order = OrderFactory.create(createOrderDTO);
    await this._dependencies.repository.save(order);
    await this.publishEvents(order);
    return OrderMapper.toDTO(order);
  }

  private async publishEvents(order: Order): Promise<void> {
    await this._dependencies.publisher?.publish(order.getEvents());
    order.clearEvents();
  }
}