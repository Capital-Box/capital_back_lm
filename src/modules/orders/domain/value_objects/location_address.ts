import { LocationTypes } from '../enums/location_types.enum';
import { GeoLocation } from './geo_location';
import { Location } from './location';

interface LocationAddressConstructor {
  streetName: string;
  streetNumber: string;
  addressFloor: string;
  addressApartment: string;
  addressNeighborhood: string;
  geo: GeoLocation;
  zipCode: string;
  cityName: string;
  stateName: string;
  countryName: string;
  observation: string;
}

export class LocationAddress extends Location {
  private streetName: string;
  private streetNumber: string;
  private addressFloor: string;
  private addressApartment: string;
  private addressNeighborhood: string;
  private geo: GeoLocation;
  private zipCode: string;
  private cityName: string;
  private stateName: string;
  private countryName: string;
  private observation: string;

  constructor(locationAddress: LocationAddressConstructor) {
    super(LocationTypes.ADDRESS);
    this.streetName = locationAddress.streetName;
    this.streetNumber = locationAddress.streetNumber;
    this.addressFloor = locationAddress.addressFloor;
    this.addressApartment = locationAddress.addressApartment;
    this.addressNeighborhood = locationAddress.addressNeighborhood;
    this.geo = locationAddress.geo;
    this.zipCode = locationAddress.zipCode;
    this.cityName = locationAddress.cityName;
    this.stateName = locationAddress.stateName;
    this.countryName = locationAddress.countryName;
    this.observation = locationAddress.observation;
  }

  public getStreetName(): string {
    return this.streetName;
  }

  public getStreetNumber(): string {
    return this.streetNumber;
  }

  public getAddressFloor(): string {
    return this.addressFloor;
  }

  public getAddressApartment(): string {
    return this.addressApartment;
  }

  public getAddressNeighborhood(): string {
    return this.addressNeighborhood;
  }

  public getGeo(): GeoLocation {
    return this.geo;
  }

  public getZipCode(): string {
    return this.zipCode;
  }

  public getCityName(): string {
    return this.cityName;
  }

  public getStateName(): string {
    return this.stateName;
  }

  public getCountryName(): string {
    return this.countryName;
  }

  public getObservation(): string {
    return this.observation;
  }
}
