import { Location } from 'modules/orders/domain/value_objects/location';
import { LocationDTO } from '../dtos/location.dto';
import { LocationTypes } from 'modules/orders/domain/enums/location_types.enum';
import { LocationAddress } from 'modules/orders/domain/value_objects/location_address';
import { LocationAddressDTO } from '../dtos/location_address.dto';
import { GeoLocation } from 'modules/orders/domain/value_objects/geo_location';
import { LocationWarehouse } from 'modules/orders/domain/value_objects/location_warehouse';

export class LocationFactory {
  static create(location: LocationDTO): Location {
    if (this.isLocationAddress(location)) {
      return new LocationAddress({
        ...location,
        geo: new GeoLocation(location.geo),
      });
    }

    return new LocationWarehouse();
  }

  private static isLocationAddress(
    location: LocationDTO,
  ): location is LocationAddressDTO {
    return location.locationType === LocationTypes.ADDRESS;
  }
}
