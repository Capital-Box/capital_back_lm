import { SNSEvent } from "aws-lambda";
import { InputAdapter } from "./input.adapter";
import { SNSPort } from "../../ports/inputs/sns.port";
import { SNSMapper } from "../../mappers/sns.mapper";
import { RequestDTO } from "../../dtos/request.dto";
import { ResponseDTO } from "../../dtos/response.dto";
import { Exception } from "../../../shared/exceptions/exception";
import { UnexpectedException } from "../../../shared/exceptions/unexpected.exception";

export abstract class SNSAdapter
  extends InputAdapter<SNSEvent, void>
  implements SNSPort
{
  protected onSuccessfullProccessedRecord(response: ResponseDTO): void {
    console.log(`Processed record: ${response.getContext().requestId}`);
  }

  protected onFailedProcessedRecord(
    record: RequestDTO,
    exception: Exception
  ): void {
    console.log(`Failed to process record: ${record.getRequestId()}`);
    console.error(exception);
  }

  protected onSuccessfullProcessedEvent(
    successfullResults: ResponseDTO[],
    failedResults: Exception[]
  ): void {
    console.log(
      `Processed results: (${successfullResults.length})`,
      successfullResults
        .map((results) => results.getContext().requestId)
        .join(", ")
    );
    console.log(`Failed results (${failedResults.length}): `, failedResults);
  }

  protected onFailedProcessedEvent(exception: Exception): void {
    console.error(`Failed executing queue: `, exception);
  }

  private async processRecord(
    record: RequestDTO
  ): Promise<ResponseDTO | Exception> {
    try {
      const response = await this.invoke(record);
      this.onSuccessfullProccessedRecord(response);
      return response;
    } catch (err: Exception | unknown) {
      const exception =
        err instanceof Exception ? err : new UnexpectedException();
      this.onFailedProcessedRecord(record, exception);
      return exception;
    }
  }

  private processRecords(
    records: RequestDTO[]
  ): Promise<ResponseDTO | Exception>[] {
    const processingRecords: Promise<ResponseDTO | Exception>[] = [];
    for (const record of records)
      processingRecords.push(this.processRecord(record));
    return processingRecords;
  }

  async handle(event: SNSEvent): Promise<void> {
    try {
      const requests = SNSMapper.toRequestDTO(event);
      const processingRecords = this.processRecords(requests);
      const processedRecords = await Promise.allSettled(processingRecords);
      const failedProccesedRecords: Exception[] = processedRecords
        .filter((record) => record.status === "rejected")
        .map((record) => record.reason as Exception);
      const successProcessedRecords: ResponseDTO[] = processedRecords
        .filter((record) => record.status === "fulfilled")
        .map((record) => record.value as ResponseDTO);
      this.onSuccessfullProcessedEvent(
        successProcessedRecords,
        failedProccesedRecords
      );
    } catch (err) {
      if (err instanceof Exception) {
        this.onFailedProcessedEvent(err);
      }
      throw err;
    }
  }

  protected abstract invoke(req: RequestDTO): Promise<ResponseDTO>;
}
