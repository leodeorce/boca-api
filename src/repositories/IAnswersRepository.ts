import { Answer } from "../entities/Answer";

interface ICreateAnswerDTO {
  contestnumber: number;
  answernumber: number;
  runanswer: string;
  yes: boolean;
  fake: boolean;
}

interface IUpdateAnswerDTO {
  contestnumber: number;
  answernumber: number;
  runanswer?: string;
  yes?: boolean;
  fake?: boolean;
}

interface ICountResult {
  max: number;
}

interface IAnswersRepository {
  list(contestNumber: number): Promise<Answer[]>;
  create(answer: ICreateAnswerDTO): Promise<void>;
  count(): Promise<number>;
  getById(id: number): Promise<Answer | undefined>;
  update(answer: IUpdateAnswerDTO): Promise<Answer>;
  delete(answernumber: number): Promise<void>;
}

export { IAnswersRepository, ICreateAnswerDTO, IUpdateAnswerDTO, ICountResult };
