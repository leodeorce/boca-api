// import { container } from "tsyringe";

import { container } from "tsyringe";

import { IContestRepository } from "../../repositories/IContestsRepository";
import { ContestsRepository } from "../../repositories/implementations/ContestsRepository";

// import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository";
// import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository";
// import { SpecificationsRepository } from "../../modules/cars/repositories/implementations/SpecificationsRepository";
// import { ISpecificationsRepository } from "../../modules/cars/repositories/ISpecificationsRepository";

// // ICategoriesRepository
// container.registerSingleton<ICategoriesRepository>(
//   "CategoriesRepository",
//   CategoriesRepository
// );

// container.registerSingleton<ISpecificationsRepository>(
//   "SpecificationsRepository",
//   SpecificationsRepository
// );

container.registerSingleton<IContestRepository>(
  "ContestsRepository",
  ContestsRepository
);
