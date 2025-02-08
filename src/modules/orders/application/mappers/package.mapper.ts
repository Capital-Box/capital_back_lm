import { Package } from 'modules/orders/domain/entities/package.entity';
import { PackageDTO } from '../dtos/package.dto';
import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { CreatePackageDTO } from '../dtos/create_package.dto';

export class PackageMapper {
  static toDTO(pack: Package): PackageDTO {
    return new PackageDTO({
      id: pack.getId(),
      name: pack.getName(),
      referenceNumber: pack.getReferenceNumber(),
      sku: pack.getSku(),
      quantity: pack.getQuantity(),
    });
  }

  static toDynamo(pack: Package): Record<string, AttributeValue> {
    return marshall(PackageMapper.toDTO(pack), {
      convertClassInstanceToMap: true,
    });
  }

  static fromRequest(
    pack: Omit<CreatePackageDTO, 'referenceNumber'> & {
      reference_number: string;
    },
  ): CreatePackageDTO {
    return new CreatePackageDTO({
      name: pack.name,
      referenceNumber: pack.reference_number,
      sku: pack.sku,
      quantity: pack.quantity,
    });
  }
}
