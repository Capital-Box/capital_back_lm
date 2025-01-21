import { Order } from "modules/orders/domain/entities/order.entity";
import { CreateOrderDTO } from "../dtos/create_order.dto";
import { UUID } from "@shared/value_objects/uuid.vo";
import { OrderStatus } from "modules/orders/domain/value_objects/order_status.vo";
import { OrderMainStatuses } from "modules/orders/domain/enums/order_statuses.enum";
import { OrderSubStatuses } from "modules/orders/domain/enums/order_sub_statuses.enum";
import { ExternalProviderFactory } from "./external_provider.factory";
import { ReceiverFactory } from "./receiver.factory";

export class OrderFactory {
  static create(createOrderDTO: CreateOrderDTO): Order {
    const id = UUID.create();
    const status = new OrderStatus({ mainStatus: OrderMainStatuses.CREATED, subStatus: OrderSubStatuses.PENDING });
    const externalProvider = ExternalProviderFactory.createExternalProvider(createOrderDTO.getExternalProvider(), createOrderDTO.getExternalId());
    const receiver = ReceiverFactory.create(createOrderDTO.getReceiver());
    return new Order({
      id,
      externalProvider,
      receiverId: receiver.getDocument().getDocumentNumber(),
      status,
      createdDate: new Date(),
      lastUpdated: new Date()
    })
  }
}