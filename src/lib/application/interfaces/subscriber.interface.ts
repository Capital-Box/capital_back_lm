import { Event } from "@lib/domain/event";

export interface ISubscriber {
  getSubscriptionsEvents(): Event[];
  invoke(event: Event): Promise<void>;
}
