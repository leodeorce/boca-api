import { inject, injectable } from "tsyringe";

import { WorkingsRepository } from "../../repositories/implementations/WorkingsRepository";

interface IRequest {
  contestnumber: number;
  name: string;
  start_date?: number;
  end_date?: number;
  last_answer_date?: number;
  max_file_size?: number;
  is_multilogin?: boolean;
}

@injectable()
class CreateWorkingUseCase {
  constructor(
    @inject("WorkingsRepository")
    private workingsRepository: WorkingsRepository
  ) {}

  async execute({
    contestnumber,
    name,
    start_date,
    end_date,
    last_answer_date,
    max_file_size,
    is_multilogin,
  }: IRequest): Promise<void> {
    await this.workingsRepository.create({
      contestnumber,
      name,
      start_date,
      end_date,
      last_answer_date,
      max_file_size,
      is_multilogin,
    });
  }
}

export { CreateWorkingUseCase };
