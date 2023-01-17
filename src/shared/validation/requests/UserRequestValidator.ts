import { injectable } from "tsyringe";
import { RequestValidator } from "./RequestValidator";

const createRequiredProperties = [
  "username",
  "userfullname",
  "usertype",
];

const updateRequiredProperties = [
  "usernumber",
  "username",
  "userfullname",
  "usertype",
  "userenabled",
  "usermultilogin",
];

@injectable()
class UserRequestValidator extends RequestValidator {
  hasRequiredCreateProperties(request: object): void {
    this.hasRequiredProperties(request, createRequiredProperties);
  }

  hasRequiredUpdateProperties(request: object): void {
    this.hasRequiredProperties(request, updateRequiredProperties);
  }
}

export { UserRequestValidator };
