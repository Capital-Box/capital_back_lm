import { ValidationException } from "@lib/shared/exceptions/validation.exception";
import { IValidator } from "../interfaces/validator.interface";
import { validateSync, ValidationError } from "class-validator";

export class ClassValidatorService implements IValidator {
  constructor(private _validator: typeof validateSync = validateSync) {}

  validate(
    obj: object,
    source: "pointer" | "header" | "parameter",
    level: "attributes" | "relationships"
  ): void {
    const errors = this._validator(obj, {
      whitelist: true,
    });
    if (errors.length > 0)
      throw this.formatValidationErrors(errors, source, level);
  }

  private formatValidationErrors(
    errors: ValidationError[],
    source: "pointer" | "header" | "parameter",
    level: "attributes" | "relationships"
  ): ValidationException[] {
    const exceptions: ValidationException[] = [];

    const processErrors = (errors: ValidationError[], parentPath = "") => {
      for (const error of errors) {
        const field = error.property;
        const path = parentPath
          ? `${parentPath}/${field}`
          : `/data/${level}/${field}`;

        const constraints = Object.values(error.constraints || {});
        constraints.forEach((constraint) =>
          exceptions.push(
            new ValidationException(constraint, { [source]: path })
          )
        );

        if (error.children && error.children.length > 0) {
          processErrors(error.children, path);
        }
      }
    };

    processErrors(errors);
    return exceptions;
  }
}
