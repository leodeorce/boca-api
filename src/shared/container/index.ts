import { ILogger } from "../../logging/ILogger";
import { ApiLogger } from "../../logging/implementations/ApiLogger";
import { container } from "tsyringe";

container.registerSingleton<ILogger>("ApiLogger", ApiLogger);

import { IAnswersRepository } from "../../repositories/IAnswersRepository";
import { IContestsRepository } from "../../repositories/IContestsRepository";
import { ILangRepository } from "../../repositories/ILangRepository";
import { AnswersRepository } from "../../repositories/implementations/AnswersRepository";
import { ContestsRepository } from "../../repositories/implementations/ContestsRepository";
import { LangRepository } from "../../repositories/implementations/LangRepository";
import { ProblemsRepository } from "../../repositories/implementations/ProblemsRepository";
import { RunsRepository } from "../../repositories/implementations/RunsRepository";
import { SitesRepository } from "../../repositories/implementations/SitesRepository";
import { UsersRepository } from "../../repositories/implementations/UsersRepository";
import { IProblemsRepository } from "../../repositories/IProblemsRepository";
import { IRunsRepository } from "../../repositories/IRunsRepository";
import { ISitesRepository } from "../../repositories/ISitesRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";

container.registerSingleton<IContestsRepository>(
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

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ISitesRepository>(
  "SitesRepository",
  SitesRepository
);
