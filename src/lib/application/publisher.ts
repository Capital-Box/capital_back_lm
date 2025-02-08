import { Event } from '@lib/domain/event';
import { IPublisher } from './interfaces/publisher.interface';
import { ISubscriber } from './interfaces/subscriber.interface';

export class Publisher implements IPublisher {
  private subscribers: {
    [key: string]: ISubscriber[] | undefined;
  } = {};

  subscribe(subscriber: ISubscriber): Publisher {
    for (const event of subscriber.getSubscriptionsEvents()) {
      if (!this.subscribers[event]) this.subscribers[event] = [];
      this.subscribers[event].push(subscriber);
    }
    return this;
  }

  async publish(events: Event[]): Promise<void> {
    const executeSubscribers: Promise<void>[] = [];
    for (const event of events) {
      this.subscribers[event.getEventType()]?.forEach((subscriber) =>
        executeSubscribers.push(subscriber.invoke(event)),
      );
    }

    await Promise.all(executeSubscribers);
  }
}
