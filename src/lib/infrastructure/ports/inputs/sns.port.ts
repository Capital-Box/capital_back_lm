import { SNSEvent } from "aws-lambda";
import { InputPort } from "./input.port";

export interface SNSPort extends InputPort<SNSEvent, void> {
  handle(event: SNSEvent): Promise<void>;
}
