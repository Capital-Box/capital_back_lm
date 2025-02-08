import { ApiGatewayRequestDTO } from '@lib/infrastructure/dtos/requests/apigateway_request.dto';
import { ICreatePayload } from '@lib/infrastructure/dtos/requests/request.dto';
import { EmailDTO } from 'modules/orders/application/dtos/email.dto';
import { PhoneDTO } from 'modules/orders/application/dtos/phone.dto';
import { PhoneTypes } from 'modules/orders/domain/enums/phone_types.enum';
import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { CreateOrderDTO } from 'modules/orders/application/dtos/create_order.dto';
import { DocumentDTO } from 'modules/orders/application/dtos/document.dto';
import { ReceiverDTO } from 'modules/orders/application/dtos/reiceiver.dto';
import { DocumentTypes } from 'modules/orders/domain/enums/document_types.enum';
import { IValidator } from '@lib/application/interfaces/validator.interface';
import { LocationTypes } from 'modules/orders/domain/enums/location_types.enum';
import { LocationDTO } from 'modules/orders/application/dtos/location.dto';
import { LocationAddressDTO } from 'modules/orders/application/dtos/location_address.dto';
import { GeoLocationDTO } from 'modules/orders/application/dtos/geo_location.dto';
import { PackageMapper } from 'modules/orders/application/mappers/package.mapper';

interface ICreateOrderAttributes {
  origin: {
    type: LocationTypes;
    street_name: string;
    street_number: string;
    address_floor: string;
    address_apartment: string;
    address_neighborhood: string;
    coordinates: string;
    latitude: string;
    longitude: string;
    zip_code: string;
    city_name: string;
    state_name: string;
    country_name: string;
    observation: string;
  };
  destiny: {
    type: LocationTypes;
    street_name: string;
    street_number: string;
    address_floor: string;
    address_apartment: string;
    address_neighborhood: string;
    coordinates: string;
    latitude: string;
    longitude: string;
    zip_code: string;
    city_name: string;
    state_name: string;
    country_name: string;
    observation: string;
  };
  receiver: {
    first_name: string;
    last_name: string;
    document: {
      document_type: DocumentTypes;
      document_number: string;
    };
    email: string;
    phone: {
      phone_type: PhoneTypes;
      area_code: string;
      number: string;
    };
  };
  packages: {
    name: string;
    reference_number: string;
    sku: string;
    quantity: number;
  }[];
}

export class CreateOrderRequestDTO extends ApiGatewayRequestDTO<ICreateOrderAttributes> {
  constructor(event: APIGatewayProxyEventV2) {
    super(event);
  }

  validatePayload(validationService: IValidator): void {
    const createOrderDTO = this.getCreateOrder();
    validationService.validate(createOrderDTO, 'pointer', 'attributes');
  }

  getData(): ICreatePayload<ICreateOrderAttributes> {
    return super.getData() as ICreatePayload<ICreateOrderAttributes>;
  }

  getCreateOrder(): CreateOrderDTO {
    const orderAttributes = this.getData().attributes;
    const receiver = new ReceiverDTO({
      firstName: orderAttributes.receiver.first_name,
      lastName: orderAttributes.receiver.last_name,
      document: new DocumentDTO(
        orderAttributes.receiver.document.document_type,
        orderAttributes.receiver.document.document_number,
      ),
      email: new EmailDTO(orderAttributes.receiver.email),
      phone: new PhoneDTO({
        phoneType: orderAttributes.receiver.phone.phone_type,
        areaCode: orderAttributes.receiver.phone.area_code,
        number: orderAttributes.receiver.phone.number,
      }),
    });
    const origin: LocationDTO =
      orderAttributes.origin?.type === LocationTypes.ADDRESS
        ? new LocationAddressDTO({
            streetName: orderAttributes.origin.street_name,
            streetNumber: orderAttributes.origin.street_number,
            addressFloor: orderAttributes.origin.address_floor,
            addressApartment: orderAttributes.origin.address_apartment,
            addressNeighborhood: orderAttributes.origin.address_neighborhood,
            geo: new GeoLocationDTO(orderAttributes.origin),
            zipCode: orderAttributes.origin.zip_code,
            cityName: orderAttributes.origin.city_name,
            stateName: orderAttributes.origin.state_name,
            countryName: orderAttributes.origin.country_name,
            observation: orderAttributes.origin.observation,
          })
        : new LocationDTO(orderAttributes.origin?.type);
    const destiny: LocationDTO =
      orderAttributes.destiny?.type === LocationTypes.ADDRESS
        ? new LocationAddressDTO({
            streetName: orderAttributes.destiny.street_name,
            streetNumber: orderAttributes.destiny.street_number,
            addressFloor: orderAttributes.destiny.address_floor,
            addressApartment: orderAttributes.destiny.address_apartment,
            addressNeighborhood: orderAttributes.destiny.address_neighborhood,
            geo: new GeoLocationDTO(orderAttributes.destiny),
            zipCode: orderAttributes.destiny.zip_code,
            cityName: orderAttributes.destiny.city_name,
            stateName: orderAttributes.destiny.state_name,
            countryName: orderAttributes.destiny.country_name,
            observation: orderAttributes.destiny.observation,
          })
        : new LocationDTO(orderAttributes.destiny?.type);
    const createOrderDTO = new CreateOrderDTO({
      receiver,
      origin,
      destiny,
      externalProvider: null,
      externalId: null,
      packages: orderAttributes.packages.map((pack) =>
        PackageMapper.fromRequest(pack),
      ),
    });
    return createOrderDTO;
  }
}
