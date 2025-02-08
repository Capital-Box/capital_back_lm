import { Entity } from '@lib/domain/entity';
import { UUID } from '@shared/value_objects/uuid.vo';

interface PackageConstructor {
  id: UUID;
  name: string;
  referenceNumber: string;
  sku: string;
  quantity: number;
}

export class Package extends Entity {
  private readonly id: UUID;
  private readonly name: string;
  private readonly referenceNumber: string;
  private readonly sku: string;
  private readonly quantity: number;

  constructor(pack: PackageConstructor) {
    super();
    this.id = pack.id;
    this.name = pack.name;
    this.referenceNumber = pack.referenceNumber;
    this.sku = pack.sku;
    this.quantity = pack.quantity;
  }

  getId(): string {
    return this.id.getUUID();
  }

  getName(): string {
    return this.name;
  }

  getReferenceNumber(): string {
    return this.referenceNumber;
  }

  getSku(): string {
    return this.sku;
  }

  getQuantity(): number {
    return this.quantity;
  }
}
