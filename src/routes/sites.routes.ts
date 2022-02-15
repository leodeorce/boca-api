import { Router } from "express";

import { SiteController } from "../useCases/Site/SiteController";

const sitesRoutes = Router();

const siteController = new SiteController();

sitesRoutes.get("/problem/:id_p/site", siteController.listAll);
sitesRoutes.post("/problem/:id_p/site", siteController.create);
sitesRoutes.get("/site/:id_site", siteController.getOne);
sitesRoutes.put("/site/:id_site", siteController.update);
sitesRoutes.delete("/site/:id_site", siteController.delete);

export { sitesRoutes };
