import { SQSEvent } from "aws-lambda";
import { RequestDTO } from "../dtos/request.dto";

export class SQSMapper {
  static toRequestDTO(event: SQSEvent): RequestDTO[] {
    const requestDTOs: RequestDTO[] = [];
    for (const record of event.Records) {
      const requestDTO = new RequestDTO({
        headers: {},
        queryParameters: {},
        pathParameters: {},
        body: record.body,
        context: {
          requestId: record.messageId,
          identity: {
            source: record.eventSource,
          },
        },
      });
      requestDTOs.push(requestDTO);
    }
    return requestDTOs;
  }
}
