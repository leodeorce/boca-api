import { inject, injectable } from "tsyringe";

import { ProblemsRepository } from "../../repositories/implementations/ProblemsRepository";

interface IRequest {
  id: number;
}

@injectable()
class DeleteProblemUseCase {
  constructor(
    @inject("ProblemsRepository")
    private problemsRepository: ProblemsRepository
  ) {}

  async execute({ id }: IRequest): Promise<void> {
    const problemAlreadyExists = await this.problemsRepository.getById(id);

    if (!problemAlreadyExists) {
      throw new Error("Problem does not exists");
    }

    await this.problemsRepository.delete(id);
  }
}

export { DeleteProblemUseCase };
