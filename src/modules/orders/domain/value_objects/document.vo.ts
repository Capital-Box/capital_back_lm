import { DocumentTypes } from "../enums/document_types.enum";

export class Document {
  private document_type: DocumentTypes;
  private document_number: string;

  constructor(document_type: DocumentTypes, document_number: string) {
    this.document_type = document_type;
    this.document_number = document_number;
  }

  getDocumentType(): DocumentTypes {
    return this.document_type;
  }

  getDocumentNumber(): string {
    return this.document_number;
  }
}