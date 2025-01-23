import { ExternalProviders } from 'modules/orders/domain/enums/external_providers.enum';
import { ReceiverDTO } from './reiceiver.dto';
import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';

interface CreateOrderConstructor {
  receiver: ReceiverDTO;
  externalProvider: ExternalProviders | null;
  externalId: string | null;
}

export class CreateOrderDTO {
  @IsOptional()
  @IsEnum(ExternalProviders)
  public externalProvider: ExternalProviders | null;

  @IsOptional()
  @IsString()
  public externalId: string | null;

  @ValidateNested()
  public receiver: ReceiverDTO;

  constructor(createOrder: CreateOrderConstructor) {
    this.externalProvider = createOrder.externalProvider;
    this.externalId = createOrder.externalId;
    this.receiver = createOrder.receiver;
  }
}
