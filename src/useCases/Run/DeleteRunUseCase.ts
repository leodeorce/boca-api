import { inject, injectable } from "tsyringe";

import { RunsRepository } from "../../repositories/implementations/RunsRepository";

interface IRequest {
  id: number;
}

@injectable()
class DeleteRunUseCase {
  constructor(
    @inject("RunsRepository")
    private runsRepository: RunsRepository
  ) {}

  async execute({ id }: IRequest): Promise<void> {
    const runAlreadyExists = await this.runsRepository.getById(id);

    if (!runAlreadyExists) {
      throw new Error("Run does not exists");
    }
    try {
      await this.runsRepository.delete(id);
      
    } catch (error) {
      return Promise.reject(error)
    }

  }
}

export { DeleteRunUseCase };