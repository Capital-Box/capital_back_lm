import { LocationTypes } from 'modules/orders/domain/enums/location_types.enum';
import { GeoLocationDTO } from './geo_location.dto';
import { LocationDTO } from './location.dto';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

interface LocationAddressConstructor {
  streetName: string;
  streetNumber: string;
  addressFloor: string;
  addressApartment: string;
  addressNeighborhood: string;
  geo: GeoLocationDTO;
  zipCode: string;
  cityName: string;
  stateName: string;
  countryName: string;
  observation: string;
}

export class LocationAddressDTO extends LocationDTO {
  @IsString()
  @IsNotEmpty()
  streetName: string;

  @IsString()
  @IsNotEmpty()
  streetNumber: string;

  @IsString()
  @IsNotEmpty()
  addressFloor: string;

  @IsString()
  @IsNotEmpty()
  addressApartment: string;

  @IsString()
  @IsNotEmpty()
  addressNeighborhood: string;

  @ValidateNested()
  geo!: GeoLocationDTO;

  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @IsString()
  @IsNotEmpty()
  cityName: string;

  @IsString()
  @IsNotEmpty()
  stateName: string;

  @IsString()
  @IsNotEmpty()
  countryName: string;

  @IsString()
  @IsNotEmpty()
  observation: string;

  constructor(location: LocationAddressConstructor) {
    super(LocationTypes.ADDRESS);
    this.streetName = location.streetName;
    this.streetNumber = location.streetNumber;
    this.addressFloor = location.addressFloor;
    this.addressApartment = location.addressApartment;
    this.addressNeighborhood = location.addressNeighborhood;
    this.geo = location.geo;
    this.zipCode = location.zipCode;
    this.cityName = location.cityName;
    this.stateName = location.stateName;
    this.countryName = location.countryName;
    this.observation = location.observation;
  }
}
