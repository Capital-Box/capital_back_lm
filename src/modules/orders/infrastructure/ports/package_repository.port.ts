import { Package } from 'modules/orders/domain/entities/package.entity';

export interface PackageRepositoryPort {
  saveMany(packages: Package[]): Promise<void>;
}
