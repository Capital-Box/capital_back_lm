import { DocumentTypes } from "modules/orders/domain/enums/document_types.enum";

export class DocumentDTO {
  private documentType: DocumentTypes;
  private documentNumber: string;

  constructor(documentType: DocumentTypes, documentNumber: string) {
    this.documentType = documentType;
    this.documentNumber = documentNumber;
  }

  getDocumentType(): DocumentTypes {
    return this.documentType;
  }

  getDocumentNumber(): string {
    return this.documentNumber;
  }
}