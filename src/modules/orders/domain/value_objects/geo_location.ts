interface GeoLocationConstructor {
  coordinates: string;
  latitude: string;
  longitude: string;
}

export class GeoLocation {
  private coordinates: string;
  private latitude: string;
  private longitude: string;

  constructor(geoLocation: GeoLocationConstructor) {
    this.coordinates = geoLocation.coordinates;
    this.latitude = geoLocation.latitude;
    this.longitude = geoLocation.longitude;
  }

  getCoordinates(): string {
    return this.coordinates;
  }

  getLatitude(): string {
    return this.latitude;
  }

  getLongitude(): string {
    return this.longitude;
  }
}
