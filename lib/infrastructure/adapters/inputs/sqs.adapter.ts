import { SQSEvent } from "aws-lambda";
import { InputAdapter } from "./input.adapter";
import { SQSPort } from "../../ports/inputs/sqs.port";
import { SQSMapper } from "../../mappers/sqs.mapper";
import { RequestDTO } from "../../dtos/request.dto";
import { ResponseDTO } from "../../dtos/response.dto";
import { Exception } from "../../../shared/exceptions/exception";
import { UnexpectedException } from "../../../shared/exceptions/unexpected.exception";

export abstract class SQSAdapter
  extends InputAdapter<SQSEvent, void>
  implements SQSPort
{
  async handle(event: SQSEvent): Promise<void> {
    /*try {
      const requestDTOs = SQSMapper.toRequestDTO(event);
      const processedEvents: Promise<ResponseDTO>[] = [];
      for (const requestDTO of requestDTOs) {
        const eventProcessing = this.invoke(requestDTO);
        eventProcessing
          .then((response) => this.onSuccessfullProcessedItem(response))
          .catch((exception: Exception | unknown) => {
            if (exception instanceof Exception)
              return this.onFailedProcessedItem(exception);
            return this.onFailedProcessedItem(new UnexpectedException());
          });
        processedEvents.push(eventProcessing);
      }
      const results = await Promise.all(processedEvents);
      this.onProccessedQueue(results);
    } catch (err: Exception | unknown) {
      if (err instanceof Exception) {
        this.onFailedQueue(err);
        throw err;
      }

      const unexpectedException = new UnexpectedException();
      this.onFailedQueue(unexpectedException);
      throw unexpectedException;
    }
      */
  }

  protected onSuccessfullProcessedItem(responseDTO: ResponseDTO): void {
    console.log("Processed SQS Record: ", responseDTO.getContext().requestId);
  }

  protected onFailedProcessedItem(exception: Exception): void {}

  protected onProccessedQueue(responseDTOs: ResponseDTO[]): void {}

  protected onFailedQueue(exception: Exception): void {}

  protected abstract invoke(req: RequestDTO): Promise<ResponseDTO>;
}
