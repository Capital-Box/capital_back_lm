import { Event } from "../../domain/classes/event";
import { ISubscriber } from "./subscriber.interface";

export interface IPublisher {
  subscribe(subscriber: ISubscriber): void;
  publish(events: Event[]): Promise<void>;
}
