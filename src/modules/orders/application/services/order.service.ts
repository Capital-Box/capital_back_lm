import { OrderRepositoryPort } from 'modules/orders/infrastructure/ports/order_repository.port';
import { CreateOrderDTO } from '../dtos/create_order.dto';
import { OrderDTO } from '../dtos/order.dto';
import { OrderFactory } from '../factories/order.factory';
import { OrderMapper } from '../mappers/order.mapper';
import { CreateOrderCase } from '../use_cases/create_order.case';
import { IPublisher } from '@lib/application/interfaces/publisher.interface';
import { Order } from 'modules/orders/domain/entities/order.entity';
import { Receiver } from 'modules/orders/domain/entities/receiver.entity';
import { ReceiverRepositoryPort } from 'modules/orders/infrastructure/ports/receiver_repository.port';
import { ReceiverFactory } from '../factories/receiver.factory';
import { ReceiverDTO } from '../dtos/reiceiver.dto';

interface OrderServiceDependencies {
  orderRepository: OrderRepositoryPort;
  receiverRepository: ReceiverRepositoryPort;
  publisher?: IPublisher;
}
export class OrderService implements CreateOrderCase {
  constructor(private _dependencies: OrderServiceDependencies) {}

  private async saveReceiver(receiverDTO: ReceiverDTO): Promise<Receiver> {
    const receiver = ReceiverFactory.create(receiverDTO);
    await this._dependencies.receiverRepository.save(receiver);
    return receiver;
  }

  async save(createOrderDTO: CreateOrderDTO): Promise<OrderDTO> {
    const order = OrderFactory.create(createOrderDTO);
    await this.saveReceiver(createOrderDTO.receiver);
    await this._dependencies.orderRepository.save(order);
    await this.publishEvents(order);
    return OrderMapper.toDTO(order);
  }

  private async publishEvents(order: Order): Promise<void> {
    await this._dependencies.publisher?.publish(order.getEvents());
    order.clearEvents();
  }
}
