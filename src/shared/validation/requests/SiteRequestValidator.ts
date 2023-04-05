import { injectable } from "tsyringe";
import {
  createRequiredProperties,
  updateRequiredProperties,
} from "../../../entities/Site";
import { RequestValidator } from "./RequestValidator";

@injectable()
class SiteRequestValidator extends RequestValidator {
  hasRequiredCreateProperties(request: object): void {
    this.hasRequiredProperties(request, createRequiredProperties);
  }

  hasRequiredUpdateProperties(request: object): void {
    this.hasRequiredProperties(request, updateRequiredProperties);
  }
}

export { SiteRequestValidator };
