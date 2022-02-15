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
import { UserRepository } from "../../repositories/implementations/UserRepository";
import { IUserRepository } from "../../repositories/IUserRepository";
import { SiteRepository } from "../../repositories/implementations/SiteRepository";
import { ISiteRepository } from "../../repositories/ISiteRepository";

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

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

container.registerSingleton<ISiteRepository>("SiteRepository", SiteRepository);
