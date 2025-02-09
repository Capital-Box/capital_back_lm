import { Order } from 'modules/orders/domain/entities/order.entity';
import { OrderDTO } from '../dtos/order.dto';
import { LocationAddress } from 'modules/orders/domain/value_objects/location_address';
import { LocationWarehouse } from 'modules/orders/domain/value_objects/location_warehouse';
import { Location } from 'modules/orders/domain/value_objects/location';
import { LocationAddressDTO } from '../dtos/location_address.dto';
import { LocationDTO } from '../dtos/location.dto';
import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { UUID } from '@shared/value_objects/uuid.vo';
import { ExternalProvider } from 'modules/orders/domain/value_objects/external_provider.vo';
import { LocationTypes } from 'modules/orders/domain/enums/location_types.enum';
import { GeoLocation } from 'modules/orders/domain/value_objects/geo_location';
import { OrderStatus } from 'modules/orders/domain/value_objects/order_status.vo';
import { PackageMapper } from './package.mapper';

export class OrderMapper {
  private static serializeLocation(
    location: LocationAddress,
  ): LocationAddressDTO;
  private static serializeLocation(location: LocationWarehouse): LocationDTO;
  private static serializeLocation(
    location: Location,
  ): LocationDTO | LocationAddressDTO {
    if (location instanceof LocationAddress)
      return {
        type: location.getType(),
        streetName: location.getStreetName(),
        streetNumber: location.getStreetNumber(),
        addressFloor: location.getAddressFloor(),
        addressApartment: location.getAddressApartment(),
        addressNeighborhood: location.getAddressNeighborhood(),
        geo: {
          coordinates: location.getGeo().getCoordinates(),
          latitude: location.getGeo().getLatitude(),
          longitude: location.getGeo().getLongitude(),
        },
        zipCode: location.getZipCode(),
        cityName: location.getCityName(),
        stateName: location.getStateName(),
        countryName: location.getCountryName(),
        observation: location.getObservation(),
      };

    return {
      type: location.getType(),
    };
  }

  private static isLocationAddress(
    location: LocationDTO,
  ): location is LocationAddressDTO {
    return location.type === LocationTypes.ADDRESS;
  }

  private static deserializeLocation(location: LocationDTO): LocationAddress;
  private static deserializeLocation(location: LocationDTO): LocationWarehouse;
  private static deserializeLocation(
    location: LocationDTO,
  ): LocationWarehouse | LocationAddress {
    if (this.isLocationAddress(location))
      return new LocationAddress({
        streetName: location.stateName,
        streetNumber: location.streetNumber,
        addressFloor: location.addressFloor,
        addressApartment: location.addressApartment,
        addressNeighborhood: location.addressNeighborhood,
        geo: new GeoLocation({
          coordinates: location.geo.coordinates,
          latitude: location.geo.latitude,
          longitude: location.geo.longitude,
        }),
        zipCode: location.zipCode,
        cityName: location.cityName,
        stateName: location.stateName,
        countryName: location.countryName,
        observation: location.observation,
      });

    return new LocationWarehouse();
  }

  static toDTO(order: Order): OrderDTO {
    return new OrderDTO({
      id: order.getId(),
      externalProvider: order.getExternalProvider(),
      externalId: order.getExternalId(),
      receiverId: order.getReceiverId(),
      mainStatus: order.getMainStatus(),
      subStatus: order.getSubStatus(),
      origin: this.serializeLocation(order.getOrigin()),
      destiny: this.serializeLocation(order.getDestiny()),
      packages: order.getPackages().map((pack) => PackageMapper.toDTO(pack)),
      createdDate: order.getCreatedDate(),
      lastUpdated: order.getLastUpdated(),
    });
  }

  static fromDynamo(orderDTO: Record<string, AttributeValue>): Order {
    const orderItem = unmarshall(orderDTO);
    const order = new Order({
      id: new UUID(orderItem['id']),
      externalProvider: new ExternalProvider({
        externalProvider: orderItem['external_provider'],
        externalId: orderItem['external_id'],
      }),
      origin: this.deserializeLocation(orderItem['origin']),
      destiny: this.deserializeLocation(orderItem['destiny']),
      receiverId: orderItem['receiver_id'],
      status: new OrderStatus({
        mainStatus: orderItem['main_status'],
        subStatus: orderItem['sub_status'],
      }),
      packages: [],
      createdDate: new Date(orderItem['created_date']),
      lastUpdated: new Date(orderItem['last_updated']),
    });

    return order;
  }
}
