import "reflect-metadata";

import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

import { SiteRequestValidator } from "../../shared/validation/requests/SiteRequestValidator";
import IdValidator from "../../shared/validation/utils/IdValidator";

import { CreateSiteUseCase } from "./CreateSiteUseCase";
import { DeleteSiteUseCase } from "./DeleteSiteUseCase";
import { GetSiteUseCase } from "./GetSiteUseCase";
import { ListSitesUseCase } from "./ListSitesUseCase";
import { UpdateSiteUseCase } from "./UpdateSiteUseCase";
import { HttpStatus } from "../../shared/definitions/HttpStatusCodes";

class SiteController {
  async listAll(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const listSitesUseCase = container.resolve(ListSitesUseCase);
    const idValidator = container.resolve(IdValidator);

    const { id_c } = request.params;
    const contestnumber = Number(id_c);

    try {
      idValidator.isContestId(contestnumber);

      const all = await listSitesUseCase.execute({ contestnumber });

      return response.status(HttpStatus.SUCCESS).json(all);
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
    const idValidator = container.resolve(IdValidator);

    const { id_s } = request.params;
    const { id_c } = request.params;
    const sitenumber = Number(id_s);
    const contestnumber = Number(id_c);

    try {
      idValidator.isContestId(contestnumber);
      idValidator.isSiteId(sitenumber);

      const site = await getSiteUseCase.execute({ sitenumber, contestnumber });

      return response.status(HttpStatus.SUCCESS).json(site);
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
    const idValidator = container.resolve(IdValidator);
    const siteRequestValidator = container.resolve(SiteRequestValidator);

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
      idValidator.isContestId(contestnumber);
      siteRequestValidator.hasRequiredCreateProperties(request.body);

      const site = await createSiteUseCase.execute({
        contestnumber,
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

      return response.status(HttpStatus.CREATED).json(site);
    } catch (error) {
      next(error);
    }
  }

  async update(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const updateSiteUseCase = container.resolve(UpdateSiteUseCase);
    const idValidator = container.resolve(IdValidator);
    const siteRequestValidator = container.resolve(SiteRequestValidator);

    const { id_s } = request.params;
    const { id_c } = request.params;
    const sitenumber = Number(id_s);
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
      idValidator.isContestId(contestnumber);
      idValidator.isSiteId(sitenumber);
      siteRequestValidator.hasRequiredUpdateProperties(request.body);

      const updatedSite = await updateSiteUseCase.execute({
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

      return response.status(HttpStatus.UPDATED).json(updatedSite);
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
    const idValidator = container.resolve(IdValidator);

    const { id_s } = request.params;
    const { id_c } = request.params;
    const sitenumber = Number(id_s);
    const contestnumber = Number(id_c);

    try {
      idValidator.isContestId(contestnumber);
      idValidator.isSiteId(sitenumber);

      await deleteSiteUseCase.execute({ sitenumber, contestnumber });

      return response.status(HttpStatus.DELETED).json();
    } catch (error) {
      next(error);
    }
  }
}

export { SiteController };
