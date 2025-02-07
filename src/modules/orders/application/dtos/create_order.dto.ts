import { ExternalProviders } from 'modules/orders/domain/enums/external_providers.enum';
import { ReceiverDTO } from './reiceiver.dto';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { LocationDTO } from './location.dto';
import { CreatePackageDTO } from './create_package.dto';

interface CreateOrderConstructor {
  receiver: ReceiverDTO;
  externalProvider: ExternalProviders | null;
  externalId: string | null;
  origin: LocationDTO;
  destiny: LocationDTO;
  packages: CreatePackageDTO[];
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

  @ValidateNested()
  public origin: LocationDTO;

  @ValidateNested()
  public destiny: LocationDTO;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  public packages: CreatePackageDTO[];

  constructor(createOrder: CreateOrderConstructor) {
    this.externalProvider = createOrder.externalProvider;
    this.externalId = createOrder.externalId;
    this.receiver = createOrder.receiver;
    this.origin = createOrder.origin;
    this.destiny = createOrder.destiny;
    this.packages = createOrder.packages;
  }
}
