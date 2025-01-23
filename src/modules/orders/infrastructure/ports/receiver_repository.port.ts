import { Receiver } from 'modules/orders/domain/entities/receiver.entity';

export interface ReceiverRepositoryPort {
  save(receiver: Receiver): Promise<void>;
}
