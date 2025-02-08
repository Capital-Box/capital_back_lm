interface PackageConstructor {
  id: string;
  name: string;
  referenceNumber: string;
  sku: string;
  quantity: number;
}

export class PackageDTO {
  public readonly id: string;
  public readonly name: string;
  public readonly referenceNumber: string;
  public readonly sku: string;
  public readonly quantity: number;

  constructor(pack: PackageConstructor) {
    this.id = pack.id;
    this.name = pack.name;
    this.referenceNumber = pack.referenceNumber;
    this.sku = pack.sku;
    this.quantity = pack.quantity;
  }
}
