import { EventBridgeEvent } from "aws-lambda";
import { InputPort } from "./input.port";

export interface EventBridgePort<EventString extends string, EventBody>
  extends InputPort<EventBridgeEvent<EventString, EventBody>, void> {
  handle(request: EventBridgeEvent<EventString, EventBody>): Promise<void>;
}
