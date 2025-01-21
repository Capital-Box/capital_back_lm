import { ExternalProviders } from "../enums/external_providers.enum";
import { ExternalProvider } from "./external_provider.vo";

export class NxProvider extends ExternalProvider {
  constructor(external_id: string) {
    super({
      external_id,
      external_provider: ExternalProviders.NX
    });
  }
}