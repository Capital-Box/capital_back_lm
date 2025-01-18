import { ExternalProviders } from "modules/orders/domain/enums/external_providers.enum";

interface CreateOrderConstructor {
  externalProvider: ExternalProviders | null;
  externalId: string | null;
}


export class CreateOrderDTO {
  private externalProvider: ExternalProviders | null;
  private externalId: string | null;

  constructor(createOrder: CreateOrderConstructor) {
    this.externalProvider = createOrder.externalProvider;
    this.externalId = createOrder.externalId;
  }

  getExternalProvider(): ExternalProviders | null {
    return this.externalProvider;
  }

  getExternalId(): string | null {
    return this.externalId
  }
}