import { EventBridgeEvent } from "aws-lambda";
import { RequestDTO } from "../dtos/request.dto";

export class EventBridgeMapper {
  static toRequestDTO<EventString extends string, EventBody>(
    event: EventBridgeEvent<EventString, EventBody>
  ): RequestDTO {
    return new RequestDTO({
      headers: {},
      queryParameters: {},
      pathParameters: {},
      body: JSON.stringify(event.detail),
      context: {
        requestId: event.id,
        identity: {
          source: event.source,
        },
      },
    });
  }
}
