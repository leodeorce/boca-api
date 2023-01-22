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
    this.isId(id, "contest", 0);
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
    this.isId(id, "language", 1);
  }

  isProblemId(id: number) {
    this.isId(id, "problem", 0);
  }

  isRunId(id: number) {
    this.isId(id, "run", 1);
  }
}

export default IdValidator;
