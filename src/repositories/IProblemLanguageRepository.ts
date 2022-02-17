import { Lang } from "../entities/Lang";

interface IAddLanguagesToProblem {
  contestnumber: number;
  langnumbers: number[];
  problemnumber: number;
}

interface IDeleteLanguagesFromProblem {
  contestnumber: number;
  langnumbers: number[];
  problemnumber: number;
}

interface IProblemLanguageRepository {
  addLanguagesToProblem(createObject: IAddLanguagesToProblem): Promise<void>;
  getLanguagesByProblem(problemNumber: number): Promise<Lang[] | undefined>;
  deleteLanguagesFromProblem(
    deleteObject: IDeleteLanguagesFromProblem
  ): Promise<void>;
}

export {
  IProblemLanguageRepository,
  IAddLanguagesToProblem,
  IDeleteLanguagesFromProblem,
};
