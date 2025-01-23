import { IsEnum } from 'class-validator';
import { LocationTypes } from 'modules/orders/domain/enums/location_types.enum';

export class LocationDTO {
  @IsEnum(LocationTypes)
  locationType!: LocationTypes;

  constructor(locationType: LocationTypes) {
    this.locationType = locationType;
  }
}
