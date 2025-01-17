export abstract class Event {
  private event_type: string;
  private ocurred_on: Date;

  constructor(event_type: string) {
    this.event_type = event_type;
    this.ocurred_on = new Date();
  }

  getEventType() {
    return this.event_type;
  }

  getOcurredOn() {
    return this.ocurred_on;
  }
}
