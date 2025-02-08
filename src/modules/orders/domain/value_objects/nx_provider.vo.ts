import { ExternalProviders } from '../enums/external_providers.enum';
import { ExternalProvider } from './external_provider.vo';

export class NxProvider extends ExternalProvider {
  constructor(externalId: string) {
    super({
      externalId,
      externalProvider: ExternalProviders.NX,
    });
  }
}
