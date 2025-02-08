import { LocationTypes } from '../enums/location_types.enum';
import { Location } from './location';

export class LocationWarehouse extends Location {
  constructor() {
    super(LocationTypes.WAREHOUSE);
  }
}
