import { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import { container } from "tsyringe";
import { ApiError } from "../../errors/ApiError";
import { CreateSiteUseCase } from "./CreateSiteUseCase";
import { DeleteSiteUseCase } from "./DeleteSiteUseCase";
import { GetSiteUseCase } from "./GetSiteUseCase";
import { ListSitesUseCase } from "./ListSitesUseCase";
import { PatchSiteUseCase } from "./PatchSiteUseCase";
import { ReplaceSiteUseCase } from "./ReplaceSiteUseCase";

class SiteController {
  async listAll(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const listSitesUseCase = container.resolve(ListSitesUseCase);

    const { id_c } = request.params;
    const contestnumber = Number(id_c);

    try {
      if (Number.isNaN(contestnumber) || contestnumber < 1) {
        throw ApiError.badRequest("Invalid site ID");
      }

      const all = await listSitesUseCase.execute({
        contestnumber: contestnumber,
      });

      return response.status(200).json(all);
    } catch (error) {
      next(error);
    }
  }

  async getOne(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const getSiteUseCase = container.resolve(GetSiteUseCase);

    const { id_site } = request.params;
    const { id_c } = request.params;
    const sitenumber = Number(id_site);
    const contestnumber = Number(id_c);

    try {
      if (Number.isNaN(contestnumber) || contestnumber < 1) {
        throw ApiError.badRequest("Invalid contest ID");
      }
      if (Number.isNaN(sitenumber) || sitenumber < 1) {
        throw ApiError.badRequest("Invalid site ID");
      }

      const site = await getSiteUseCase.execute({
        sitenumber: sitenumber,
        contestnumber: contestnumber,
      });

      return response.status(200).json(site);
    } catch (error) {
      next(error);
    }
  }

  async create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const createSiteUseCase = container.resolve(CreateSiteUseCase);

    const { id_c } = request.params;
    const contestnumber = Number(id_c);

    const {
      sitenumber,
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
      sitemaxjudgewaittime,
    } = request.body;

    try {
      if (Number.isNaN(contestnumber) || contestnumber < 1) {
        throw ApiError.badRequest("Invalid contest ID");
      }

      const site = await createSiteUseCase.execute({
        contestnumber: contestnumber,
        sitenumber,
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
        sitemaxjudgewaittime,
      });

      return response.status(200).json(site);
    } catch (error) {
      next(error);
    }
  }

  async updateFull(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const replaceSiteUseCase = container.resolve(ReplaceSiteUseCase);

    const { id_site } = request.params;
    const { id_c } = request.params;
    const sitenumber = Number(id_site);
    const contestnumber = Number(id_c);

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
      sitemaxjudgewaittime,
    } = request.body;

    try {
      if (Number.isNaN(contestnumber) || contestnumber < 1) {
        throw ApiError.badRequest("Invalid contest ID");
      }
      if (Number.isNaN(sitenumber) || sitenumber < 1) {
        throw ApiError.badRequest("Invalid site ID");
      }

      const updatedSite = await replaceSiteUseCase.execute({
        contestnumber: contestnumber,
        sitenumber: sitenumber,
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
        sitemaxjudgewaittime,
      });

      return response.status(200).json(updatedSite);
    } catch (error) {
      next(error);
    }
  }

  async updatePartial(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const patchSiteUseCase = container.resolve(PatchSiteUseCase);

    const { id_site } = request.params;
    const { id_c } = request.params;
    const sitenumber = Number(id_site);
    const contestnumber = Number(id_c);

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
      sitemaxjudgewaittime,
    } = request.body;

    try {
      if (Number.isNaN(contestnumber) || contestnumber < 1) {
        throw ApiError.badRequest("Invalid contest ID");
      }
      if (Number.isNaN(sitenumber) || sitenumber < 1) {
        throw ApiError.badRequest("Invalid site ID");
      }

      const updatedSite = await patchSiteUseCase.execute({
        contestnumber: contestnumber,
        sitenumber: sitenumber,
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
        sitemaxjudgewaittime,
      });

      return response.status(200).json(updatedSite);
    } catch (error) {
      next(error);
    }
  }

  async delete(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const deleteSiteUseCase = container.resolve(DeleteSiteUseCase);

    const { id_site } = request.params;
    const { id_c } = request.params;
    const sitenumber = Number(id_site);
    const contestnumber = Number(id_c);

    try {
      if (Number.isNaN(sitenumber) || sitenumber < 1) {
        throw ApiError.badRequest("Invalid site ID");
      }
      if (Number.isNaN(contestnumber) || contestnumber < 1) {
        throw ApiError.badRequest("Invalid contest ID");
      }

      await deleteSiteUseCase.execute({
        sitenumber: sitenumber,
        contestnumber: contestnumber,
      });

      return response.status(204).json();
    } catch (error) {
      next(error);
    }
  }
}

export { SiteController };
