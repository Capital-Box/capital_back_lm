import { HttpStatus } from "@lib/infrastructure/enums/http_status.enum";
import { randomUUID } from "node:crypto";

export type Meta = { [key: string]: string | object | number };
export type Source = {
  pointer?: string;
  parameter?: string;
  header?: string;
};

interface ExceptionConstructor {
  status: HttpStatus;
  code: string;
  title: string;
  detail: string;
  source?: Source;
  meta?: Meta;
}

export type IException = {
  id: string;
  status: HttpStatus;
  code: string;
  title: string;
  detail: string;
  source?: Source;
  meta?: Meta;
  timestamp: number;
};

export class Exception extends Error {
  private id: string;
  private status: HttpStatus;
  private code: string;
  private title: string;
  private detail: string;
  private meta?: Meta;
  private source?: Source;
  private timestamp: number;

  constructor(
    exception: ExceptionConstructor,
    customIdGenerator: () => string = randomUUID
  ) {
    super(`${exception.code}: ${exception.detail}`);
    this.id = customIdGenerator();
    this.status = exception.status;
    this.code = exception.code;
    this.title = exception.title;
    this.detail = exception.detail;
    this.meta = exception.meta;
    this.source = exception.source;
    this.timestamp = Date.now();
  }

  getStatusCode(): HttpStatus {
    return this.status;
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

  getSource(): Source | undefined {
    return this.source;
  }

  getMeta(): Meta | undefined {
    return this.meta;
  }

  getTimestamp(): number {
    return this.timestamp;
  }

  toPlain(): IException {
    return {
      id: this.getId(),
      status: this.getStatusCode(),
      code: this.getCode(),
      title: this.getTitle(),
      detail: this.getDetail(),
      source: this.getSource(),
      meta: this.getMeta(),
      timestamp: this.getTimestamp(),
    };
  }
}
