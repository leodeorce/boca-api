import { injectable } from "tsyringe";
import { RequestValidator } from "./RequestValidator";

const createRequiredProperties = [
  "username",
  "userfullname",
  "usertype",
  "userenabled",
  "usermultilogin",
  "userpassword",
  "usersession",
  "usersessionextra",
  "userinfo",
  "usericpcid",
];

const updateRequiredProperties = [
  "username",
  "userfullname",
  "usertype",
  "userenabled",
  "usermultilogin",
  "userpassword",
  "usersession",
  "usersessionextra",
  "userinfo",
  "usericpcid",
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
