import { IsNotEmpty, IsString } from 'class-validator';

interface GeoLocationConstructor {
  coordinates: string;
  latitude: string;
  longitude: string;
}

export class GeoLocationDTO {
  @IsString()
  @IsNotEmpty()
  coordinates!: string;

  @IsString()
  @IsNotEmpty()
  latitude!: string;

  @IsString()
  @IsNotEmpty()
  longitude!: string;

  constructor(geoLocation: GeoLocationConstructor) {
    this.coordinates = geoLocation.coordinates;
    this.latitude = geoLocation.latitude;
    this.longitude = geoLocation.longitude;
  }
}
