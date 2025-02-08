import { DocumentTypes } from '../enums/document_types.enum';

interface DocumentConstructor {
  documentType: DocumentTypes;
  documentNumber: string;
}

export class Document {
  private documentType: DocumentTypes;
  private documentNumber: string;

  constructor(document: DocumentConstructor) {
    this.documentType = document.documentType;
    this.documentNumber = document.documentNumber;
  }

  getDocumentType(): DocumentTypes {
    return this.documentType;
  }

  getDocumentNumber(): string {
    return this.documentNumber;
  }
}
