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

interface ILastIdResult {
  id: number;
}

interface IAnswersRepository {
  list(contestNumber: number): Promise<Answer[]>;
  create(answer: ICreateAnswerDTO): Promise<Answer>;
  getLastId(contestnumber: number): Promise<number | undefined>;
  getById(
    contestnumber: number,
    answernumber: number
  ): Promise<Answer | undefined>;
  update(answer: IUpdateAnswerDTO): Promise<Answer>;
  delete(answernumber: number): Promise<void>;
}

export {
  IAnswersRepository,
  ICreateAnswerDTO,
  IUpdateAnswerDTO,
  ILastIdResult,
};
