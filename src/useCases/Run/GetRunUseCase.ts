import { inject, injectable } from "tsyringe";

import { Run } from "../../entities/Run";
import { RunsRepository } from "../../repositories/implementations/RunsRepository";

interface IRequest {
  id: number;
}

@injectable()
class GetRunUseCase {
  constructor(
    @inject("RunsRepository")
    private runsRepository: RunsRepository
  ) {}

  async execute({ id }: IRequest): Promise<Run | undefined> {
    const run = await this.runsRepository.getById(id);

    return run;
  }
}

export { GetRunUseCase };
