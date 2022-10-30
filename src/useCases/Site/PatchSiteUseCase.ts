import { validate } from "class-validator";
import { inject, injectable } from "tsyringe";
import { Site } from "../../entities/Site";
import { ApiError } from "../../errors/ApiError";
import { ContestsRepository } from "../../repositories/implementations/ContestsRepository";
import { SitesRepository } from "../../repositories/implementations/SitesRepository";

interface IRequest {
  contestnumber: number;
  sitenumber: number;
  siteip?: string;
  sitename?: string;
  siteactive?: boolean;
  sitepermitlogins?: boolean;
  sitelastmileanswer?: number;
  sitelastmilescore?: number;
  siteduration?: number;
  siteautoend?: boolean;
  sitejudging?: string;
  sitetasking?: string;
  siteglobalscore?: string;
  sitescorelevel?: number;
  sitenextuser?: number;
  sitenextclar?: number;
  sitenextrun?: number;
  sitenexttask?: number;
  sitemaxtask?: number;
  sitechiefname?: string;
  siteautojudge?: boolean;
  sitemaxruntime?: number;
  sitemaxjudgewaittime?: number;
}

// TODO Modificar para retornar erro caso nenhuma das propriedades forem passadas
@injectable()
class PatchSiteUseCase {
  constructor(
    @inject("SitesRepository")
    private sitesRepository: SitesRepository,
    @inject("ContestsRepository")
    private contestRepository: ContestsRepository
  ) {}

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
    const existingContest = await this.contestRepository.getById(contestnumber);
    if (!existingContest) {
      throw ApiError.notFound("Contest does not exist");
    }

    const existingSite = await this.sitesRepository.getById(
      sitenumber,
      contestnumber
    );
    if (!existingSite) {
      throw ApiError.notFound("Site does not exist");
    }

    const site = new Site();
    site.contestnumber = contestnumber;
    site.sitenumber = sitenumber;
    site.siteip = siteip ? siteip : existingSite.siteip;
    site.sitename = sitename ? sitename : existingSite.sitename;
    site.siteactive = siteactive ? siteactive : existingSite.siteactive;
    site.sitepermitlogins = sitepermitlogins
      ? sitepermitlogins
      : existingSite.sitepermitlogins;
    site.sitelastmileanswer = sitelastmileanswer
      ? sitelastmileanswer
      : existingSite.sitelastmileanswer;
    site.sitelastmilescore = sitelastmilescore
      ? sitelastmilescore
      : existingSite.sitelastmilescore;
    site.siteduration = siteduration ? siteduration : existingSite.siteduration;
    site.siteautoend = siteautoend ? siteautoend : existingSite.siteautoend;
    site.sitejudging = sitejudging ? sitejudging : existingSite.sitejudging;
    site.sitetasking = sitetasking ? sitetasking : existingSite.sitetasking;
    site.siteglobalscore = siteglobalscore
      ? siteglobalscore
      : existingSite.siteglobalscore;
    site.sitescorelevel = sitescorelevel
      ? sitescorelevel
      : existingSite.sitescorelevel;
    site.sitenextuser = sitenextuser ? sitenextuser : existingSite.sitenextuser;
    site.sitenextclar = sitenextclar ? sitenextclar : existingSite.sitenextclar;
    site.sitenextrun = sitenextrun ? sitenextrun : existingSite.sitenextrun;
    site.sitenexttask = sitenexttask ? sitenexttask : existingSite.sitenexttask;
    site.sitemaxtask = sitemaxtask ? sitemaxtask : existingSite.sitemaxtask;
    site.sitechiefname = sitechiefname
      ? sitechiefname
      : existingSite.sitechiefname;
    site.siteautojudge = siteautojudge
      ? siteautojudge
      : existingSite.siteautojudge;
    site.sitemaxruntime = sitemaxruntime
      ? sitemaxruntime
      : existingSite.sitemaxruntime;
    site.sitemaxjudgewaittime = sitemaxjudgewaittime
      ? sitemaxjudgewaittime
      : existingSite.sitemaxjudgewaittime;

    const validation = await validate(site);

    if (validation.length > 0) {
      const errors = validation[0].constraints as object;
      const [, message] = Object.entries(errors)[0];
      throw ApiError.badRequest(message);
    }

    return await this.sitesRepository.update({
      contestnumber,
      sitenumber,
      siteip: site.siteip,
      sitename: site.sitename,
      siteactive: site.siteactive,
      sitepermitlogins: site.sitepermitlogins,
      sitelastmileanswer: site.sitelastmileanswer,
      sitelastmilescore: site.sitelastmilescore,
      siteduration: site.siteduration,
      siteautoend: site.siteautoend,
      sitejudging: site.sitejudging,
      sitetasking: site.sitetasking,
      siteglobalscore: site.siteglobalscore,
      sitescorelevel: site.sitescorelevel,
      sitenextuser: site.sitenextuser,
      sitenextclar: site.sitenextclar,
      sitenextrun: site.sitenextrun,
      sitenexttask: site.sitenexttask,
      sitemaxtask: site.sitemaxtask,
      sitechiefname: site.sitechiefname,
      siteautojudge: site.siteautojudge,
      sitemaxruntime: site.sitemaxruntime,
      sitemaxjudgewaittime: site.sitemaxjudgewaittime,
    });
  }
}

export { PatchSiteUseCase };
