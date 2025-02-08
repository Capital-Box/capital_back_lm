import { Order } from 'modules/orders/domain/entities/order.entity';
import { OrderRepositoryPort } from '../ports/order_repository.port';

import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
} from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { LocationAddress } from 'modules/orders/domain/value_objects/location_address';
import { Location } from 'modules/orders/domain/value_objects/location';
import { OrderMapper } from 'modules/orders/application/mappers/order.mapper';

export class OrderDynamoAdapter implements OrderRepositoryPort {
  constructor(
    private tableName: string,
    private client: DynamoDBClient = new DynamoDBClient(),
  ) {}

  serializeLocation(location: Location) {
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

  async save(order: Order): Promise<void> {
    const orderMarshall = marshall({
      id: order.getId(),
      external_provider: order.getExternalProvider(),
      external_id: order.getExternalId(),
      receiver_id: order.getReceiverId(),
      origin: this.serializeLocation(order.getOrigin()),
      destiny: this.serializeLocation(order.getDestiny()),
      main_status: order.getMainStatus(),
      sub_status: order.getSubStatus(),
      created_date: order.getCreatedDate().toISOString(),
      last_updated: order.getLastUpdated().toISOString(),
    });

    const command = new PutItemCommand({
      TableName: this.tableName,
      Item: orderMarshall,
    });

    await this.client.send(command);
  }

  async findById(id: string): Promise<Order> {
    const command = new GetItemCommand({
      TableName: this.tableName,
      Key: marshall({ id }),
    });

    const resultItem = await this.client.send(command);
    if (!resultItem.Item) throw new Error('Order not found');

    return OrderMapper.fromDynamo(resultItem.Item);
  }
}
