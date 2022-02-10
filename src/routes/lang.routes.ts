import { Router } from "express";

// import { ContestController } from "../useCases/lang/LangController";

const langRoutes = Router();

// const langController = new LangController();

// Rotas relacionadas a language
langRoutes.get("/:id_p/language", () => {
  console.log("Hello world");
});
langRoutes.post("/:id_p/language", () => {
  console.log("Hello world");
});

langRoutes.delete("/:id_p/language", () => {
  console.log("Hello world");
});

export { langRoutes };
