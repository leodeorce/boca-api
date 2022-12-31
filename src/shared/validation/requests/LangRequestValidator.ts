import { injectable } from "tsyringe";
import { RequestValidator } from "./RequestValidator";

const createRequiredProperties = ["langname", "langextension"];
const updateRequiredProperties = ["langname", "langextension"];

@injectable()
class LangRequestValidator extends RequestValidator {
  hasRequiredCreateProperties(request: object): void {
    this.hasRequiredProperties(request, createRequiredProperties);
  }

  hasRequiredUpdateProperties(request: object): void {
    this.hasRequiredProperties(request, updateRequiredProperties);
  }
}

export { LangRequestValidator };
