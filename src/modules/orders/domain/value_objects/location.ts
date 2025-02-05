import { LocationTypes } from '../enums/location_types.enum';

export abstract class Location {
  private locationType: LocationTypes;

  constructor(locationType: LocationTypes) {
    this.locationType = locationType;
  }

  getType(): LocationTypes {
    return this.locationType;
  }
}
