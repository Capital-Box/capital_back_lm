import { ExternalProviders } from 'modules/orders/domain/enums/external_providers.enum';
import { ExternalProvider } from 'modules/orders/domain/value_objects/external_provider.vo';
import { NxProvider } from 'modules/orders/domain/value_objects/nx_provider.vo';

export class ExternalProviderFactory {
  static createExternalProvider(
    externalProvider: ExternalProviders | null,
    externalId: string | null,
  ): ExternalProvider | null {
    if (!externalProvider) return null;
    if (!externalId)
      throw new Error(
        'When a provider is provided, an external id must be provided as well',
      );

    const providers: { [key in ExternalProviders]: ExternalProvider } = {
      [ExternalProviders.NX]: new NxProvider(externalId),
    };

    return providers[externalProvider];
  }
}
