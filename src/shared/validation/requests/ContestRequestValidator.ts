import { injectable } from "tsyringe";
import { RequestValidator } from "./RequestValidator";

const createRequiredProperties = [
  "contestname",
  "conteststartdate",
  "contestduration",
  "contestlocalsite",
  "contestpenalty",
  "contestmaxfilesize",
  "contestmainsite",
];

const updateRequiredProperties = [
  "contestname",
  "conteststartdate",
  "contestduration",
  "contestlocalsite",
  "contestpenalty",
  "contestmaxfilesize",
  "contestactive",
  "contestmainsite",
  "contestkeys",
  "contestunlockkey",
  "contestmainsiteurl",
];

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
