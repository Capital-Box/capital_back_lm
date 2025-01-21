import { Event } from "@lib/domain/event";
import { IPublisher } from "./interfaces/publisher.interface";
import { ISubscriber } from "./interfaces/subscriber.interface";

export class Publisher implements IPublisher {
  private subscribers: {
    [key: Event["event_type"]]: ISubscriber[] | undefined;
  } = {};

  subscribe(subscriber: ISubscriber): void {
    for (const event of subscriber.getSubscriptionsEvents()) {
      const eventType = event.getEventType();
      if (!this.subscribers[eventType]) this.subscribers[eventType] = [];
      this.subscribers[eventType].push(subscriber);
    }
  }

  async publish(events: Event[]): Promise<void> {
    const executeSubscribers: Promise<void>[] = [];
    for (const event of events) {
      this.subscribers[event.getEventType()]?.forEach((subscriber) =>
        executeSubscribers.push(subscriber.invoke(event))
      );
    }

    await Promise.all(executeSubscribers);
  }
}
