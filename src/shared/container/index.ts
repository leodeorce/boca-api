// import { container } from "tsyringe";

import { container } from "tsyringe";

import { IAnswersRepository } from "../../repositories/IAnswersRepository";
import { IContestRepository } from "../../repositories/IContestsRepository";
import { ILangRepository } from "../../repositories/ILangRepository";
import { AnswersRepository } from "../../repositories/implementations/AnswersRepository";
import { ContestsRepository } from "../../repositories/implementations/ContestsRepository";
import { LangRepository } from "../../repositories/implementations/LangRepository";
import { ProblemsRepository } from "../../repositories/implementations/ProblemsRepository";
import { RunsRepository } from "../../repositories/implementations/RunsRepository";
import { IProblemsRepository } from "../../repositories/IProblemsRepository";
import { IRunsRepository } from "../../repositories/IRunsRepository";

container.registerSingleton<IContestRepository>(
  "ContestsRepository",
  ContestsRepository
);

container.registerSingleton<IProblemsRepository>(
  "ProblemsRepository",
  ProblemsRepository
);

container.registerSingleton<IRunsRepository>("RunsRepository", RunsRepository);

container.registerSingleton<IAnswersRepository>(
  "AnswersRepository",
  AnswersRepository
);

container.registerSingleton<ILangRepository>("LangRepository", LangRepository);
