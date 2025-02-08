import { PhoneTypes } from 'modules/orders/domain/enums/phone_types.enum';

interface PhoneConstructor {
  phoneType: PhoneTypes;
  areaCode: string;
  number: string;
}

export class Phone {
  private phoneType: PhoneTypes;
  private areaCode: string;
  private number: string;

  constructor(phone: PhoneConstructor) {
    this.phoneType = phone.phoneType;
    this.areaCode = phone.areaCode;
    this.number = phone.number;
  }

  getNumber(): string {
    return this.number;
  }

  getPhoneType(): PhoneTypes {
    return this.phoneType;
  }

  getAreaCode(): string {
    return this.areaCode;
  }
}
