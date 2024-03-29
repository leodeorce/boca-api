import { injectable } from "tsyringe";
import { RequestValidator } from "./RequestValidator";

const createRequiredProperties = ["problemname", "fake", "problemnumber"];

const updateFileRequiredProperties = ["probleminputfile"];

const updateRequiredProperties = ["problemname", "fake"];

@injectable()
class ProblemRequestValidator extends RequestValidator {
  hasRequiredCreateProperties(request: object): void {
    this.hasRequiredProperties(request, createRequiredProperties);
  }

  hasRequiredUpdateProperties(request: object): void {
    this.hasRequiredProperties(request, updateRequiredProperties);
  }

  hasRequiredUpdateFileProperties(request: object): void {
    this.hasRequiredProperties(request, updateFileRequiredProperties);
  }
}

export { ProblemRequestValidator };
