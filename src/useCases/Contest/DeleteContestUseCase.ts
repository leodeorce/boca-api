import { inject, injectable } from "tsyringe";

import { ContestsRepository } from "../../repositories/implementations/ContestsRepository";

interface IRequest {
  id: number;
}

@injectable()
class DeleteContestsUseCase {
  constructor(
    @inject("ContestsRepository")
    private contestsRepository: ContestsRepository
  ) {}

  async execute({ id }: IRequest): Promise<void> {
    const contestAlreadyExists = await this.contestsRepository.getById(id);

    if (!contestAlreadyExists) {
      throw new Error("Contest does not exists");
    }

    await this.contestsRepository.delete(id);
  }
}

export { DeleteContestsUseCase };
