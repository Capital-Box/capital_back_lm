import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

interface PackageConstructor {
  name: string;
  referenceNumber: string;
  sku: string;
  quantity: number;
}

export class CreatePackageDTO {
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsString()
  @IsNotEmpty()
  public readonly referenceNumber: string;

  @IsString()
  @IsNotEmpty()
  public readonly sku: string;

  @IsNumber()
  @IsNotEmpty()
  public readonly quantity: number;

  constructor(pack: PackageConstructor) {
    this.name = pack.name;
    this.referenceNumber = pack.referenceNumber;
    this.sku = pack.sku;
    this.quantity = pack.quantity;
  }
}
