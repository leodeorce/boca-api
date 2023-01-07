import { UploadedFile } from "express-fileupload";
import { injectable } from "tsyringe";
import { ApiError } from "../../../errors/ApiError";
import { RequestValidator } from "./RequestValidator";

const createRequiredProperties = [
  "runsitenumber",
  "usernumber",
  "rundate",
  "runlangnumber",
];

const updateRequiredProperties = ["runstatus"];

@injectable()
class RunRequestValidator extends RequestValidator {
  hasRequiredCreateProperties(request: object, runfile: UploadedFile): void {
    this.hasRequiredProperties(request, createRequiredProperties);
    if (runfile === undefined || runfile === null) {
      throw ApiError.badRequest("Missing run file");
    }
  }

  hasRequiredUpdateProperties(request: object): void {
    this.hasRequiredProperties(request, updateRequiredProperties);
  }
}

export { RunRequestValidator };
