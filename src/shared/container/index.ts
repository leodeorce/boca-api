// import { container } from "tsyringe";

import { container } from "tsyringe";

import { IContestRepository } from "../../repositories/IContestsRepository";
import { ContestsRepository } from "../../repositories/implementations/ContestsRepository";

container.registerSingleton<IContestRepository>(
  "ContestsRepository",
  ContestsRepository
);
