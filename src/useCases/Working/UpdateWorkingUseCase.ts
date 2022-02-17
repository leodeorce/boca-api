import { inject, injectable } from "tsyringe";

import { WorkingsRepository } from "../../repositories/implementations/WorkingsRepository";

interface IRequest {
  workingnumber: number;
  name: string;
  start_date?: number;
  end_date?: number;
  last_answer_date?: number;
  max_file_size?: number;
  is_multilogin?: boolean;
}

@injectable()
class UpdateWorkingUseCase {
  constructor(
    @inject("WorkingsRepository")
    private workingsRepository: WorkingsRepository
  ) {}

  async execute({
    workingnumber,
    name,
    start_date,
    end_date,
    last_answer_date,
    max_file_size,
    is_multilogin,
  }: IRequest): Promise<void> {
    const workingExists = await this.workingsRepository.getById(workingnumber);

    if (!workingExists) {
      throw new Error("Working does not exist");
    }

    try {
      await this.workingsRepository.update({
        workingnumber,
        name,
        start_date,
        end_date,
        last_answer_date,
        max_file_size,
        is_multilogin,
      });
      return Promise.resolve();
    } catch (err) {
      const error = err as Error;
      return Promise.reject(error);
    }
  }
}

export { UpdateWorkingUseCase };
