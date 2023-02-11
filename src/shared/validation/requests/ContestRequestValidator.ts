import { injectable } from "tsyringe";
import {
  createRequiredProperties,
  updateRequiredProperties,
} from "../../../entities/Contest";
import { RequestValidator } from "./RequestValidator";

@injectable()
class ContestRequestValidator extends RequestValidator {
  hasRequiredCreateProperties(request: object): void {
    this.hasRequiredProperties(request, createRequiredProperties);
  }

  hasRequiredUpdateProperties(request: object): void {
    this.hasRequiredProperties(request, updateRequiredProperties);
  }
}

export { ContestRequestValidator };
