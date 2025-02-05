import { IsEnum, IsString } from 'class-validator';
import { PhoneTypes } from 'modules/orders/domain/enums/phone_types.enum';

interface PhoneConstructor {
  phoneType: PhoneTypes;
  areaCode: string;
  number: string;
}

export class PhoneDTO {
  @IsEnum(PhoneTypes)
  public phoneType: PhoneTypes;

  @IsString()
  public areaCode: string;

  @IsString()
  public number: string;

  constructor(phone: PhoneConstructor) {
    this.phoneType = phone.phoneType;
    this.areaCode = phone.areaCode;
    this.number = phone.number;
  }
}
