// import { container } from "tsyringe";

import { container } from "tsyringe";

import { IContestRepository } from "../../repositories/IContestsRepository";
import { ContestsRepository } from "../../repositories/implementations/ContestsRepository";
import { ProblemsRepository } from "../../repositories/implementations/ProblemsRepository";
import { IProblemsRepository } from "../../repositories/IProblemsRepository";

container.registerSingleton<IContestRepository>(
  "ContestsRepository",
  ContestsRepository
);

container.registerSingleton<IProblemsRepository>(
  "ProblemsRepository",
  ProblemsRepository
);
