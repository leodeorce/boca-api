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

interface ILastIdResult {
  id: number;
}

interface ILangRepository {
  list(contestnumber: number): Promise<Lang[]>;
  getById(contestnumber: number, langnumber: number): Promise<Lang | undefined>;
  create(lang: ICreateLangDTO): Promise<Lang>;
  getLastId(contestnumber: number): Promise<number | undefined>;
  update(lang: IUpdadeLangDTO): Promise<Lang>;
  delete(contestnumber: number, langnumber: number): Promise<void>;
  findByName(
    langname: string,
    contestNumber: number
  ): Promise<Lang | undefined>;
}

export { ILangRepository, ILastIdResult, ICreateLangDTO, IUpdadeLangDTO };
