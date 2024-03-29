import { inject, injectable } from "tsyringe";

import { Answer } from "../../../entities/Answer";
import { ApiError } from "../../../errors/ApiError";
import { IAnswersRepository } from "../../../repositories/IAnswersRepository";
import EntityValidator from "./EntityValidator";

@injectable()
class AnswerValidator extends EntityValidator<Answer> {
  constructor(
    @inject("AnswersRepository")
    private answersRepository: IAnswersRepository
  ) {
    super();
  }

  async exists(contestnumber: number, answernumber: number): Promise<Answer> {
    const existingAnswer = await this.answersRepository.getById(
      contestnumber,
      answernumber
    );

    if (!existingAnswer) {
      throw ApiError.notFound("Answer does not exist");
    }

    return existingAnswer;
  }
}

export default AnswerValidator;
