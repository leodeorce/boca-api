import { validate } from "class-validator";
import { injectable } from "tsyringe";

import { ApiError } from "../../../errors/ApiError";

@injectable()
class EntityValidator<T> {
  async isValid(entity: T): Promise<void> {
    const validation = await validate(entity as object);

    if (validation.length > 0) {
      const errors = validation[0].constraints as Record<string, string>;
      const [, message] = Object.entries(errors)[0];
      throw ApiError.badRequest(message);
    }
  }
}

export default EntityValidator;
