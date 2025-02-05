import { IsEnum, IsString } from 'class-validator';
import { DocumentTypes } from 'modules/orders/domain/enums/document_types.enum';

export class DocumentDTO {
  @IsEnum(DocumentTypes)
  public documentType: DocumentTypes;

  @IsString()
  public documentNumber: string;

  constructor(documentType: DocumentTypes, documentNumber: string) {
    this.documentType = documentType;
    this.documentNumber = documentNumber;
  }
}
