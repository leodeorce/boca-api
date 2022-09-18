import { inject, injectable } from "tsyringe";

import { Working } from "../../entities/Working";
import { WorkingsRepository } from "../../repositories/implementations/WorkingsRepository";

interface IRequest {
  id: number;
}

@injectable()
class GetWorkingUseCase {
  constructor(
    @inject("WorkingsRepository")
    private workingsRepository: WorkingsRepository
  ) {}

  async execute({ id }: IRequest): Promise<Working | undefined> {

    try {
      const working = await this.workingsRepository.getById(id);
      return working;
      
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export { GetWorkingUseCase };