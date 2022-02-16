import { Request, Response } from "express";
import "reflect-metadata";
import { container } from "tsyringe";
import { GetContestsUseCase } from "../Contest/GetContestUseCase";

import { CreateSiteUseCase } from "./CreateSiteUseCase";
import { DeleteSiteUseCase } from "./DeleteSiteUseCase";
import { GetSiteUseCase } from "./GetSiteUseCase";
import { ListSitesUseCase } from "./ListSitesUseCase";
import { UpdateSiteUseCase } from "./UpdateSiteUseCase";

class SiteController {
  async listAll(request: Request, response: Response): Promise<Response> {
    const listSitesUseCase = container.resolve(ListSitesUseCase);

    const { id_c } = request.params;
    try {
      const all = await listSitesUseCase.execute(parseInt(id_c, 10));
      return response.json(all);
    } catch (error) {
      const err = error as Error;
      return response.status(400).json({ error: err.message });
    }
  }

  async getOne(request: Request, response: Response): Promise<Response> {
    const getSiteUseCase = container.resolve(GetSiteUseCase);
    const { id_site } = request.params;

    try {
      const site = await getSiteUseCase.execute({
        id: parseInt(id_site, 10),
      });
      return response.json(site);
    } catch (error) {
      const err = error as Error;
      return response.status(400).json({ error: err.message });
    }
  }

  async create(request: Request, response: Response): Promise<Response> {
    const createSiteUseCase = container.resolve(CreateSiteUseCase);
    const getContestUseCase = container.resolve(GetContestsUseCase);

    const { id_c } = request.params;

    const {
      siteip,
      sitename,
      siteactive,
      sitepermitlogins,
      sitelastmileanswer,
      sitelastmilescore,
      siteduration,
      siteautoend,
      sitejudging,
      sitetasking,
      siteglobalscore,
      sitescorelevel,
      sitenextuser,
      sitenextclar,
      sitenextrun,
      sitenexttask,
      sitemaxtask,
      sitechiefname,
      siteautojudge,
      sitemaxruntime,
      sitemaxjudgewaittime
    } = request.body;

    const contest = await getContestUseCase.execute({ id: parseInt(id_c, 10) });

    if (!contest) {
      throw new Error("Contest not found");
    }

    try {
      await createSiteUseCase.execute({
        contestnumber: contest.contestnumber,
        siteip,
        sitename,
        siteactive,
        sitepermitlogins,
        sitelastmileanswer,
        sitelastmilescore,
        siteduration,
        siteautoend,
        sitejudging,
        sitetasking,
        siteglobalscore,
        sitescorelevel,
        sitenextuser,
        sitenextclar,
        sitenextrun,
        sitenexttask,
        sitemaxtask,
        sitechiefname,
        siteautojudge,
        sitemaxruntime,
        sitemaxjudgewaittime
      });

      return response.status(201).send();
    } catch (error) {
      return response.status(400).json({ error: "Error creating Site" });
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    const updateSiteUseCase = container.resolve(UpdateSiteUseCase);

    const { id_site } = request.params;

    const {
      contestnumber,
      siteip,
      sitename,
      siteactive,
      sitepermitlogins,
      sitelastmileanswer,
      sitelastmilescore,
      siteduration,
      siteautoend,
      sitejudging,
      sitetasking,
      siteglobalscore,
      sitescorelevel,
      sitenextuser,
      sitenextclar,
      sitenextrun,
      sitenexttask,
      sitemaxtask,
      sitechiefname,
      siteautojudge,
      sitemaxruntime,
      sitemaxjudgewaittime
    } = request.body;

    try {
      await updateSiteUseCase.execute({
        sitenumber: parseInt(id_site, 10),
        contestnumber,
        siteip,
        sitename,
        siteactive,
        sitepermitlogins,
        sitelastmileanswer,
        sitelastmilescore,
        siteduration,
        siteautoend,
        sitejudging,
        sitetasking,
        siteglobalscore,
        sitescorelevel,
        sitenextuser,
        sitenextclar,
        sitenextrun,
        sitenexttask,
        sitemaxtask,
        sitechiefname,
        siteautojudge,
        sitemaxruntime,
        sitemaxjudgewaittime
      });

      return response.status(201).send();
    } catch (error) {
      return response.status(400).json({ error: "Error Updating Site" });
    }
  }

  async delete(request: Request, response: Response) {
    const { id_site } = request.params;
    const idNumber = parseInt(id_site, 10);
    const deleteSiteUseCase = container.resolve(DeleteSiteUseCase);

    try {
      await deleteSiteUseCase.execute({ id: idNumber });
      return response.status(200).json({ message: "Site deleted successfully" });
    } catch (error) {
      const err = error as Error;
      return response.status(400).json({ error: err.message });
    }
  }
}

export { SiteController };
