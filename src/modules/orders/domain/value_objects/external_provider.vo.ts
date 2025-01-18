import { ExternalProviders } from "../enums/external_providers.enum";

interface ExternalProviderConstructor {
  external_id: string;
  external_provider: ExternalProviders;
}

export class ExternalProvider {
  private external_id: string;
  private external_provider: ExternalProviders;

  constructor(externalProvider: ExternalProviderConstructor){
    this.external_id = externalProvider.external_id;
    this.external_provider = externalProvider.external_provider;
  }

  getExternalId(): string {
    return this.external_id;
  }

  getExternalProvider(): ExternalProviders {
    return this.external_provider;
  }
}