import { Event } from './event';

export class Entity {
  private events: Event[] = [];

  constructor() {}

  protected addEvent(event: Event): void {
    this.events.push(event);
  }

  getEvents(): Event[] {
    return this.events;
  }

  clearEvents(): void {
    this.events = [];
  }
}
