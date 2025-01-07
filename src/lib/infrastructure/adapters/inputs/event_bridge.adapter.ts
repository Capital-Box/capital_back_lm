import { EventBridgeEvent } from "aws-lambda";
import { EventBridgePort } from "../../ports/inputs/event_bridge.port";
import { InputAdapter } from "./input.adapter";
import { ResponseDTO } from "../../dtos/response.dto";
import { RequestDTO } from "../../dtos/request.dto";
import { EventBridgeMapper } from "../../mappers/event_bridge.mapper";

export abstract class EventBridgeAdapter<EventString extends string, EventBody>
  extends InputAdapter<EventBridgeEvent<EventString, EventBody>, void>
  implements EventBridgePort<EventString, EventBody>
{
  async handle(event: EventBridgeEvent<EventString, EventBody>): Promise<void> {
    const request = EventBridgeMapper.toRequestDTO(event);
    await this.invoke(request);
  }

  protected abstract invoke(req: RequestDTO): Promise<ResponseDTO>;
}
