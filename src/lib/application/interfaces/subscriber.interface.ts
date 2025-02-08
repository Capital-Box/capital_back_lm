import { Event } from '@lib/domain/event';

export interface ISubscriber {
  getSubscriptionsEvents(): string[];
  invoke(event: Event): Promise<void>;
}
