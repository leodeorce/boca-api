import { injectable } from "tsyringe";

import { ApiError } from "../../../errors/ApiError";

@injectable()
class IdValidator {
  isId(id: number, entity: string, minId: number) {
    if (Number.isNaN(id) || id < minId) {
      throw ApiError.badRequest(`Invalid ${entity} ID`);
    }
  }

  isContestId(id: number) {
    this.isId(id, "contest", 1);
  }

  isSiteId(id: number) {
    this.isId(id, "site", 1);
  }

  isUserId(id: number) {
    this.isId(id, "user", 1);
  }

  isAnswerId(id: number) {
    this.isId(id, "answer", 0);
  }

  isLangId(id: number) {
    this.isId(id, "language", 0);
  }
}

export default IdValidator;
