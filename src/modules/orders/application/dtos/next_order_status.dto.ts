import { IsNotEmpty, IsString } from 'class-validator';

export class NextOrderStatusDTO {
  @IsNotEmpty()
  @IsString()
  public id: string;

  constructor(id: string) {
    this.id = id;
  }
}
