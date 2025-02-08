import { ExternalProviders } from '../enums/external_providers.enum';

interface ExternalProviderConstructor {
  externalId: string;
  externalProvider: ExternalProviders;
}

export class ExternalProvider {
  private externalId: string;
  private externalProvider: ExternalProviders;

  constructor(externalProvider: ExternalProviderConstructor) {
    this.externalId = externalProvider.externalId;
    this.externalProvider = externalProvider.externalProvider;
  }

  getExternalId(): string {
    return this.externalId;
  }

  getExternalProvider(): ExternalProviders {
    return this.externalProvider;
  }
}
