import { injectable } from "tsyringe";
import { ApiError } from "../../../errors/ApiError";

@injectable()
class IdValidator {
  isId(id: number, entity: string) {
    if (Number.isNaN(id) || id < 1) {
      throw ApiError.badRequest(`Invalid ${entity} ID`);
    }
  }

  isContestId(id: number) {
    this.isId(id, "contest");
  }

  isSiteId(id: number) {
    this.isId(id, "site");
  }

  isUserId(id: number) {
    this.isId(id, "user");
  }

  isAnswerId(id: number) {
    this.isId(id, "answer");
  }
}

export default IdValidator;
