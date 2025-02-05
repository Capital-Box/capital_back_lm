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
import { ChangeOrderStatusCase } from '../use_cases/change_order_status.case';
import { ChangeOrderStatusDTO } from '../dtos/change_order_status.dto';
import { NextOrderStatusDTO } from '../dtos/next_order_status.dto';
import { PrevOrderStatusDTO } from '../dtos/prev_order_status.dto';

interface OrderServiceDependencies {
  orderRepository: OrderRepositoryPort;
  receiverRepository: ReceiverRepositoryPort;
  publisher?: IPublisher;
}
export class OrderService implements CreateOrderCase, ChangeOrderStatusCase {
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

  private manageStatus(
    order: Order,
    changeOrderStatusDTO: ChangeOrderStatusDTO,
  ): Order;
  private manageStatus(
    order: Order,
    changeOrderStatusDTO: NextOrderStatusDTO,
  ): Order;
  private manageStatus(
    order: Order,
    changeOrderStatusDTO: PrevOrderStatusDTO,
  ): Order {
    if (changeOrderStatusDTO instanceof ChangeOrderStatusDTO) {
      order.changeStatus(
        changeOrderStatusDTO.main_status,
        changeOrderStatusDTO.sub_status,
      );
    }

    if (changeOrderStatusDTO instanceof NextOrderStatusDTO) {
      order.nextStatus();
    }

    if (changeOrderStatusDTO instanceof PrevOrderStatusDTO) {
      order.prevStatus();
    }

    return order;
  }

  async changeStatus(
    changeOrderStatusDTO:
      | ChangeOrderStatusDTO
      | NextOrderStatusDTO
      | PrevOrderStatusDTO,
  ): Promise<OrderDTO> {
    const order = await this._dependencies.orderRepository.findById(
      changeOrderStatusDTO.id,
    );

    const orderWithNewStatus = this.manageStatus(order, changeOrderStatusDTO);

    await this._dependencies.orderRepository.save(orderWithNewStatus);
    await this.publishEvents(orderWithNewStatus);
    return OrderMapper.toDTO(orderWithNewStatus);
  }

  private async publishEvents(order: Order): Promise<void> {
    await this._dependencies.publisher?.publish(order.getEvents());
    order.clearEvents();
  }
}
