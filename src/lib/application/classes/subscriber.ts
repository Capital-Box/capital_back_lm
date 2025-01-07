import { Event } from "../../domain/classes/event";
import { ISubscriber } from "../interfaces/subscriber.interface";

export abstract class Subscriber implements ISubscriber {
  constructor(private subscriptionEvents: Event[]) {}

  getSubscriptionsEvents(): Event[] {
    return this.subscriptionEvents;
  }

  abstract invoke(event: Event): Promise<void>;
}
