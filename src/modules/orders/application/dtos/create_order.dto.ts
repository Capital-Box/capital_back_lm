import { ExternalProviders } from "modules/orders/domain/enums/external_providers.enum";
import { ReceiverDTO } from "./reiceiver.dto";

interface CreateOrderConstructor {
  receiver: ReceiverDTO;
  externalProvider: ExternalProviders | null;
  externalId: string | null;
}


export class CreateOrderDTO {
  private externalProvider: ExternalProviders | null;
  private externalId: string | null;
  private receiver: ReceiverDTO;

  constructor(createOrder: CreateOrderConstructor) {
    this.externalProvider = createOrder.externalProvider;
    this.externalId = createOrder.externalId;
    this.receiver = createOrder.receiver;
  }

  getExternalProvider(): ExternalProviders | null {
    return this.externalProvider;
  }

  getExternalId(): string | null {
    return this.externalId
  }

  getReceiver(): ReceiverDTO {
    return this.receiver;
  }
}