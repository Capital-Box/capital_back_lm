import { Order } from "modules/orders/domain/entities/order.entity";
import { OrderDTO } from "../dtos/order.dto";
import { ReceiverMapper } from "./receiver.mapper";

export class OrderMapper {
  static toDTO(order: Order): OrderDTO {
    return new OrderDTO({
      id: order.getId(),
      externalProvider: order.getExternalProvider(),
      externalId: order.getExternalId(),
      receiverId: order.getReceiverId(),
      mainStatus: order.getMainStatus(),
      subStatus: order.getSubStatus(),
      createdDate: order.getCreatedDate(),
      lastUpdated: order.getLastUpdated()
    });
  }
}