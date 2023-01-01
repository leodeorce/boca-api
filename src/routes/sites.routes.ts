import { Router } from "express";

import { SiteController } from "../useCases/Site/SiteController";

const sitesRoutes = Router();

const siteController = new SiteController();

sitesRoutes.get("/contest/:id_c/site", siteController.listAll);
sitesRoutes.post("/contest/:id_c/site", siteController.create);
sitesRoutes.get("/contest/:id_c/site/:id_s", siteController.getOne);
sitesRoutes.put("/contest/:id_c/site/:id_s", siteController.update);
sitesRoutes.delete("/contest/:id_c/site/:id_s", siteController.delete);

export { sitesRoutes };
