import { validate } from "class-validator";
import { injectable } from "tsyringe";
import { ApiError } from "../../errors/ApiError";

@injectable()
class Validator<T> {
  async isValid(contest: T): Promise<void> {
    const validation = await validate(contest as object);

    if (validation.length > 0) {
      const errors = validation[0].constraints as object;
      const [, message] = Object.entries(errors)[0];
      throw ApiError.badRequest(message);
    }
  }
}

export default Validator;
