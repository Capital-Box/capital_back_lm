import { Exception } from "./exception";

export class UnexpectedException extends Exception {
  constructor() {
    super({
      code: "unexpected_exception",
      title: "Unexpected Error",
      detail: "Unexpected error was ocurred.",
    });
  }
}
