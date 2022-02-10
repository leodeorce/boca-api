import { Lang } from "../entities/Lang";

interface ICreateLangDTO {
  contestnumber: number;
  langnumber: number;
  langname: string;
  langextension: string;
}

interface ICountResult {
  max: number;
}

interface ILangRepository {
  list(problemNumber: number): Promise<Lang[]>;
  create(lang: ICreateLangDTO): Promise<void>;
  count(): Promise<number>;
  delete(langnumber: number, contestnumber: number): Promise<void>;
  findByName(langname: string): Promise<Lang | undefined>;
}

export { ILangRepository, ICountResult, ICreateLangDTO };
