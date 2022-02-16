// import { container } from "tsyringe";

import { container } from "tsyringe";

import { IAnswersRepository } from "../../repositories/IAnswersRepository";
import { IContestRepository } from "../../repositories/IContestsRepository";
import { AnswersRepository } from "../../repositories/implementations/AnswersRepository";
import { ContestsRepository } from "../../repositories/implementations/ContestsRepository";
import { LangRepository } from "../../repositories/implementations/LangRepository";
import { ILangRepository } from "../../repositories/ILangRepository";
import { ProblemsRepository } from "../../repositories/implementations/ProblemsRepository";
import { RunsRepository } from "../../repositories/implementations/RunsRepository";
import { IProblemsRepository } from "../../repositories/IProblemsRepository";
import { IRunsRepository } from "../../repositories/IRunsRepository";
import { UsersRepository } from "../../repositories/implementations/UsersRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { SitesRepository } from "../../repositories/implementations/SitesRepository";
import { ISitesRepository } from "../../repositories/ISitesRepository";

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

container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository);

container.registerSingleton<ISitesRepository>("SitesRepository", SitesRepository);
