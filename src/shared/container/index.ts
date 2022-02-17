// import { container } from "tsyringe";

import { container } from "tsyringe";

import { IAnswersRepository } from "../../repositories/IAnswersRepository";
import { IContestRepository } from "../../repositories/IContestsRepository";
import { ILangRepository } from "../../repositories/ILangRepository";
import { AnswersRepository } from "../../repositories/implementations/AnswersRepository";
import { ContestsRepository } from "../../repositories/implementations/ContestsRepository";
import { LangRepository } from "../../repositories/implementations/LangRepository";
import { ProblemLanguageRepository } from "../../repositories/implementations/ProblemLanguageRepository";
import { ProblemsRepository } from "../../repositories/implementations/ProblemsRepository";
import { RunsRepository } from "../../repositories/implementations/RunsRepository";
import { SitesRepository } from "../../repositories/implementations/SitesRepository";
import { UsersRepository } from "../../repositories/implementations/UsersRepository";
import { WorkingsRepository } from "../../repositories/implementations/WorkingsRepository";
import { WorkingsUserRepository } from "../../repositories/implementations/WorkingsUserRepository";
import { IProblemLanguageRepository } from "../../repositories/IProblemLanguageRepository";
import { IProblemsRepository } from "../../repositories/IProblemsRepository";
import { IRunsRepository } from "../../repositories/IRunsRepository";
import { ISitesRepository } from "../../repositories/ISitesRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IWorkingsRepository } from "../../repositories/IWorkingsRepository";
import { IWorkingsUserRepository } from "../../repositories/IWorkingsUserRepository";

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

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ISitesRepository>(
  "SitesRepository",
  SitesRepository
);

container.registerSingleton<IWorkingsRepository>(
  "WorkingsRepository",
  WorkingsRepository
);

container.registerSingleton<IWorkingsUserRepository>(
  "WorkingsUserRepository",
  WorkingsUserRepository
);

container.registerSingleton<IProblemLanguageRepository>(
  "ProblemLanguageRepository",
  ProblemLanguageRepository
);
