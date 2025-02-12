import { OrderHistory } from 'modules/orders/domain/entities/order_history.entity';
import { OrderHistoryDTO } from '../dtos/order_history.dto';
import { marshall } from '@aws-sdk/util-dynamodb';
import { AttributeValue } from '@aws-sdk/client-dynamodb';

export class OrderHistoryMapper {
  static toDTO(orderHistory: OrderHistory): OrderHistoryDTO {
    return {
      order_id: orderHistory.getOrderId(),
      id: orderHistory.getId(),
      order_main_status: orderHistory.getOrderStatus().getMainStatus(),
      order_sub_status: orderHistory.getOrderStatus().getSubStatus(),
      created_at: orderHistory.getCreatedAt(),
    };
  }

  static toDynamo(orderHistory: OrderHistory): Record<string, AttributeValue> {
    return marshall(
      {
        ...OrderHistoryMapper.toDTO(orderHistory),
        created_at: orderHistory.getCreatedAt().toISOString(),
      },
      {
        convertClassInstanceToMap: true,
      },
    );
  }
}
