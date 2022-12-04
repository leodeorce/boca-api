import { container, inject, injectable } from "tsyringe";

import { Site } from "../../entities/Site";
import { ISitesRepository } from "../../repositories/ISitesRepository";
import ContestValidator from "../../shared/validation/entities/ContestValidator";
import SiteValidator from "../../shared/validation/entities/SiteValidator";

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
    await this.contestValidator.exists(contestnumber);
    const existingSite = await this.siteValidator.exists(
      contestnumber,
      sitenumber
    );

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

    await this.siteValidator.isValid(site);

    return await this.sitesRepository.update({ ...site });
  }
}

export { PatchSiteUseCase };
