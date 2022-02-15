import { Request, Response } from "express";
import "reflect-metadata";
import { container } from "tsyringe";

import { GetProblemUseCase } from "../Problem/GetProblemUseCase";
import { CreateSiteUseCase } from "./CreateSiteUseCase";
import { DeleteSiteUseCase } from "./DeleteSiteUseCase";
import { GetSiteUseCase } from "./GetSiteUseCase";
import { ListSitesUseCase } from "./ListSitesUseCase";
import { UpdateSiteUseCase } from "./UpdateSiteUseCase";

class SiteController {
  async listAll(request: Request, response: Response): Promise<Response> {
    const listSitesUseCase = container.resolve(ListSitesUseCase);

    const { id_p } = request.params;

    try {
      const all = await listSitesUseCase.execute(parseInt(id_p, 10));
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
    const getProblemUseCase = container.resolve(GetProblemUseCase);

    const { id_p } = request.params;

    const {
      sitesitenumber,
      usernumber,
      sitedate,
      sitedatediff,
      sitedatediffans,
      sitefilename,
      sitedata,
      siteanswer,
      sitestatus,
      sitejudge,
      sitejudgesite,
      siteanswer1,
      sitejudge1,
      sitejudgesite1,
      siteanswer2,
      sitejudge2,
      sitejudgesite2,
      sitelangnumber,
      autoip,
      autobegindate,
      autoenddate,
      autoanswer,
      autostdout,
      autostderr,
    } = request.body;

    const problem = await getProblemUseCase.execute({ id: parseInt(id_p, 10) });

    if (!problem) {
      throw new Error("Problem not found");
    }

    try {
      await createSiteUseCase.execute({
        contestnumber: problem.contestnumber,
        sitesitenumber,
        usernumber,
        sitedate,
        sitedatediff,
        sitedatediffans,
        siteproblem: parseInt(id_p, 10),
        sitefilename,
        sitedata,
        siteanswer,
        sitestatus,
        sitejudge,
        sitejudgesite,
        siteanswer1,
        sitejudge1,
        sitejudgesite1,
        siteanswer2,
        sitejudge2,
        sitejudgesite2,
        sitelangnumber,
        autoip,
        autobegindate,
        autoenddate,
        autoanswer,
        autostdout,
        autostderr,
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
      sitesitenumber,
      usernumber,
      sitedate,
      siteproblem,
      sitedatediff,
      sitedatediffans,
      sitefilename,
      sitedata,
      siteanswer,
      sitestatus,
      sitejudge,
      sitejudgesite,
      siteanswer1,
      sitejudge1,
      sitejudgesite1,
      siteanswer2,
      sitejudge2,
      sitejudgesite2,
      sitelangnumber,
      autoip,
      autobegindate,
      autoenddate,
      autoanswer,
      autostdout,
      autostderr,
    } = request.body;

    try {
      await updateSiteUseCase.execute({
        sitenumber: parseInt(id_site, 10),
        contestnumber,
        sitesitenumber,
        usernumber,
        sitedate,
        sitedatediff,
        sitedatediffans,
        siteproblem,
        sitefilename,
        sitedata,
        siteanswer,
        sitestatus,
        sitejudge,
        sitejudgesite,
        siteanswer1,
        sitejudge1,
        sitejudgesite1,
        siteanswer2,
        sitejudge2,
        sitejudgesite2,
        sitelangnumber,
        autoip,
        autobegindate,
        autoenddate,
        autoanswer,
        autostdout,
        autostderr,
      });

      return response.status(201).send();
    } catch (error) {
      return response.status(400).json({ error: "Error creating Site" });
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
