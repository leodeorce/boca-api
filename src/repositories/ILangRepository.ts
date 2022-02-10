import { Lang } from "../entities/Lang";

interface ICreateLangDTO {
  contestnumber: number;
  langnumber: number;
  langname: string;
  langextension: string;
  updatetime: number;
}

interface ICountResult {
  count: number;
}

interface ILangRepository {
  list(problemNumber: number): Promise<Lang[]>;
  create(problem: ICreateLangDTO): Promise<void>;
  delete(langnumber: number): Promise<void>;
}

export { ILangRepository, ICountResult };
