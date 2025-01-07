import { SQSEvent } from "aws-lambda";
import { InputPort } from "./input.port";

export interface SQSPort extends InputPort<SQSEvent, void> {
  handle(event: SQSEvent): Promise<void>;
}
