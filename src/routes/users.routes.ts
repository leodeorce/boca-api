import { Router } from "express";

// import { ContestController } from "../useCases/Contest/ContestController";

const userRoutes = Router();

// const contestController = new ContestController();

// Rotas relacionadas ao contest
userRoutes.get("/contest/:id_c/user", () => {
  console.log("Hello world");
});
userRoutes.post("/contest/:id_c/user", () => {
  console.log("Hello world");
});

userRoutes.get("/user/:id_user", () => {
  console.log("Hello world");
});
userRoutes.put("/user/:id_user", () => {
  console.log("Hello world");
});
userRoutes.delete("/user/:id_user", () => {
  console.log("Hello world");
});

export { userRoutes };
