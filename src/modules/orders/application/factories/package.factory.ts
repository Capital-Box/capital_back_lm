import { Package } from 'modules/orders/domain/entities/package.entity';
import { CreatePackageDTO } from '../dtos/create_package.dto';
import { UUID } from '@shared/value_objects/uuid.vo';

export class PackageFactory {
  static create(pack: CreatePackageDTO): Package {
    return new Package({
      ...pack,
      id: UUID.create(),
    });
  }
}
