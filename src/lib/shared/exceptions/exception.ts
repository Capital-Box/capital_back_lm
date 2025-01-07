import { IException } from "../types/exception.type";
import { randomUUID } from "node:crypto";

export abstract class Exception extends Error {
  private id: string;
  private code: string;
  private title: string;
  private detail: string;
  private source: {
    pointer?: string;
    parameter?: string;
    header?: string;
  } | null;
  private links: {
    about?: string;
    type?: string;
  } | null;

  constructor(exception: Omit<IException, "id">) {
    super(exception.title);
    this.id = randomUUID();
    this.code = exception.code;
    this.title = exception.title;
    this.detail = exception.detail;
    this.source = exception.source || null;
    this.links = exception.links || null;
  }

  getId(): string {
    return this.id;
  }

  getCode(): string {
    return this.code;
  }

  getTitle(): string {
    return this.title;
  }

  getDetail(): string {
    return this.detail;
  }

  getSource(): {
    pointer?: string;
    parameter?: string;
    header?: string;
  } | null {
    return this.source;
  }

  getLinks(): { about?: string; type?: string } | null {
    return this.links;
  }
}
