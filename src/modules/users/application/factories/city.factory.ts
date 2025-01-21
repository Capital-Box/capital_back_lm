import { Cities } from "modules/users/domain/enums/cities.enum";
import { City } from "modules/users/domain/value_objects/city.vo";

export class CityFactory {
  static create(city: Cities | string): City {
    if (!City.isValid(city)) throw new Error("Is not a valid city");
    return new City(city);
  }
}
