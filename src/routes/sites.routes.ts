import { Router } from "express";

import { SiteController } from "../useCases/Site/SiteController";

const sitesRoutes = Router();

const siteController = new SiteController();

sitesRoutes.get("/contest/:id_c/site", siteController.listAll);
sitesRoutes.post("/contest/:id_c/site", siteController.create);
sitesRoutes.get("/site/:id_site", siteController.getOne);
sitesRoutes.put("/site/:id_site", siteController.update);
sitesRoutes.delete("/site/:id_site", siteController.delete);

export { sitesRoutes };
