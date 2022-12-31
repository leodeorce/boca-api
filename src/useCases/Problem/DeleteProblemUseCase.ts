import { inject, injectable } from "tsyringe";

import { ProblemsRepository } from "../../repositories/implementations/ProblemsRepository";

interface IRequest {
  contestnumber: number;
  problemnumber: number;
}

@injectable()
class DeleteProblemUseCase {
  constructor(
    @inject("ProblemsRepository")
    private problemsRepository: ProblemsRepository
  ) {}

  async execute({ contestnumber, problemnumber }: IRequest): Promise<void> {
    const problemAlreadyExists = await this.problemsRepository.getById(
      contestnumber,
      problemnumber
    );

    if (!problemAlreadyExists) {
      throw new Error("Problem does not exists");
    }

    try {
      await this.problemsRepository.delete(0);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export { DeleteProblemUseCase };
