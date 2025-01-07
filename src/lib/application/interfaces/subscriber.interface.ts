import { Event } from "../../domain/classes/event";

export interface ISubscriber {
  getSubscriptionsEvents(): Event[];
  invoke(event: Event): Promise<void>;
}
