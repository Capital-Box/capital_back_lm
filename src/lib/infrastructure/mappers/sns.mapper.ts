import { SNSEvent } from "aws-lambda";
import { RequestDTO } from "../dtos/request.dto";

export class SNSMapper {
  static toRequestDTO(event: SNSEvent): RequestDTO[] {
    const requestDTOs: RequestDTO[] = [];
    for (const record of event.Records) {
      const requestDTO = new RequestDTO({
        headers: {},
        queryParameters: {},
        pathParameters: {},
        body: record.Sns.Message,
        context: {
          requestId: record.Sns.MessageId,
          identity: {
            source: record.EventSource,
          },
        },
      });
      requestDTOs.push(requestDTO);
    }
    return requestDTOs;
  }
}
