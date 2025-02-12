import { OrderHistory } from 'modules/orders/domain/entities/order_history.entity';

export interface OrderHistoryRepository {
  save(order: OrderHistory): Promise<void>;
}
