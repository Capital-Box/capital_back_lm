import { IsNotEmpty, IsString } from 'class-validator';

export class PrevOrderStatusDTO {
  @IsNotEmpty()
  @IsString()
  public id: string;

  constructor(id: string) {
    this.id = id;
  }
}
