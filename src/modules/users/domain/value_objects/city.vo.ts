import { Cities } from "../enums/cities.enum";

export class City {
  constructor(private _city: Cities) {}

  static isValid(city: string): city is Cities {
    return Object.values(Cities).includes(city as Cities);
  }

  getCity() {
    return this._city;
  }
}
