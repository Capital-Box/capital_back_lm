import { IsEnum } from 'class-validator';
import { LocationTypes } from 'modules/orders/domain/enums/location_types.enum';

export class LocationDTO {
  @IsEnum(LocationTypes)
  type!: LocationTypes;

  constructor(type: LocationTypes) {
    this.type = type;
  }
}
