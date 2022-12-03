import { container, inject, injectable } from "tsyringe";

import { Site } from "../../entities/Site";
import { ApiError } from "../../errors/ApiError";
import { ISitesRepository } from "../../repositories/ISitesRepository";
import ContestValidator from "../../shared/validation/entities/ContestValidator";
import SiteValidator from "../../shared/validation/entities/SiteValidator";

interface IRequest {
  contestnumber: number;
  sitenumber?: number;
  siteip: string;
  sitename: string;
  siteactive: boolean;
  sitepermitlogins: boolean;
  sitelastmileanswer?: number;
  sitelastmilescore?: number;
  siteduration?: number;
  siteautoend?: boolean;
  sitejudging?: string;
  sitetasking?: string;
  siteglobalscore: string;
  sitescorelevel: number;
  sitenextuser: number;
  sitenextclar: number;
  sitenextrun: number;
  sitenexttask: number;
  sitemaxtask: number;
  sitechiefname: string;
  siteautojudge: boolean;
  sitemaxruntime: number;
  sitemaxjudgewaittime: number;
}

@injectable()
class CreateSiteUseCase {
  private contestValidator: ContestValidator;
  private siteValidator: SiteValidator;

  constructor(
    @inject("SitesRepository")
    private sitesRepository: ISitesRepository
  ) {
    this.contestValidator = container.resolve(ContestValidator);
    this.siteValidator = container.resolve(SiteValidator);
  }

  async execute({
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
  }: IRequest): Promise<Site> {
    const existingContest = await this.contestValidator.exists(contestnumber);

    if (
      contestnumber === undefined ||
      siteip === undefined ||
      sitename === undefined ||
      siteactive === undefined ||
      sitepermitlogins === undefined ||
      siteglobalscore === undefined ||
      sitescorelevel === undefined ||
      sitenextuser === undefined ||
      sitenextclar === undefined ||
      sitenextrun === undefined ||
      sitenexttask === undefined ||
      sitemaxtask === undefined ||
      sitechiefname === undefined ||
      siteautojudge === undefined ||
      sitemaxruntime === undefined ||
      sitemaxjudgewaittime === undefined
    ) {
      throw ApiError.badRequest("Missing properties");
    }

    // sitenumber é opcional. Caso não especificado, será o próximo ID disponível.
    // Caso especificado, devemos verificar se já não existe.
    if (sitenumber === undefined) {
      let lastId = await this.sitesRepository.getLastId(contestnumber);
      lastId = lastId ? lastId : 0;
      sitenumber = lastId + 1;
    } else {
      const existingSite = await this.sitesRepository.getById(
        contestnumber,
        sitenumber
      );
      if (existingSite !== undefined) {
        throw ApiError.alreadyExists(
          "Site number already exists for this contest"
        );
      }
    }

    siteautoend = siteautoend !== undefined ? siteautoend : true;
    siteduration =
      siteduration !== undefined
        ? siteduration
        : existingContest.contestduration;

    sitejudging =
      sitejudging !== undefined ? sitejudging : sitenumber.toString();

    sitetasking =
      sitetasking !== undefined ? sitetasking : sitenumber.toString();

    sitelastmileanswer =
      sitelastmileanswer !== undefined
        ? sitelastmileanswer
        : existingContest.contestlastmileanswer;

    sitelastmilescore =
      sitelastmilescore !== undefined
        ? sitelastmilescore
        : existingContest.contestlastmilescore;

    const site = new Site();
    site.contestnumber = contestnumber;
    site.sitenumber = sitenumber;
    site.siteip = siteip;
    site.sitename = sitename;
    site.siteactive = siteactive;
    site.sitepermitlogins = sitepermitlogins;
    site.sitelastmileanswer = sitelastmileanswer;
    site.sitelastmilescore = sitelastmilescore;
    site.siteduration = siteduration;
    site.siteautoend = siteautoend;
    site.sitejudging = sitejudging;
    site.sitetasking = sitetasking;
    site.siteglobalscore = siteglobalscore;
    site.sitescorelevel = sitescorelevel;
    site.sitenextuser = sitenextuser;
    site.sitenextclar = sitenextclar;
    site.sitenextrun = sitenextrun;
    site.sitenexttask = sitenexttask;
    site.sitemaxtask = sitemaxtask;
    site.sitechiefname = sitechiefname;
    site.siteautojudge = siteautojudge;
    site.sitemaxruntime = sitemaxruntime;
    site.sitemaxjudgewaittime = sitemaxjudgewaittime;

    await this.siteValidator.isValid(site);

    return await this.sitesRepository.create({ ...site });
  }
}

export { CreateSiteUseCase };
