import { Lang } from "../entities/Lang";

interface ICreateLangDTO {
  contestnumber: number;
  langnumber: number;
  langname: string;
  langextension: string;
}

interface IUpdadeLangDTO {
  contestnumber?: number;
  langnumber: number;
  langname?: string;
  langextension?: string;
}

interface ICountResult {
  max: number;
}

interface ILangRepository {
  list(problemNumber: number): Promise<Lang[]>;
  findById(id_lang: number): Promise<Lang | undefined>;
  create(lang: ICreateLangDTO): Promise<void>;
  count(): Promise<number>;
  update(lang: IUpdadeLangDTO): Promise<void>;
  delete(langnumber: number): Promise<void>;
  findByName(langname: string): Promise<Lang | undefined>;
}

export { ILangRepository, ICountResult, ICreateLangDTO, IUpdadeLangDTO };
