import { injectable } from "tsyringe";
import { RequestValidator } from "./RequestValidator";

const createRequiredProperties = ["fake", "runanswer", "yes", "answernumber"];

const updateRequiredProperties = ["fake", "runanswer", "yes", "answernumber"];

@injectable()
class AnswerRequestValidator extends RequestValidator {
  hasRequiredCreateProperties(request: object): void {
    this.hasRequiredProperties(request, createRequiredProperties);
  }

  hasRequiredUpdateProperties(request: object): void {
    this.hasRequiredProperties(request, updateRequiredProperties);
  }
}

export { AnswerRequestValidator };
