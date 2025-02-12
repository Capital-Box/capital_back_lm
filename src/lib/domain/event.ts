export abstract class Event {
  static event_type: string = 'unknown';
  private ocurred_on: Date;

  constructor() {
    this.ocurred_on = new Date();
  }

  abstract getEventType(): string;

  getOcurredOn() {
    return this.ocurred_on;
  }
}
