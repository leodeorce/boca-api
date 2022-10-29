import { validate } from "class-validator";
import { inject, injectable } from "tsyringe";
import { Contest } from "../../entities/Contest";
import { Site } from "../../entities/Site";
import { ApiError } from "../../errors/ApiError";
import { SitesRepository } from "../../repositories/implementations/SitesRepository";

interface IRequest {
  contestnumber: number;
  sitenumber: number;
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
  constructor(
    @inject("SitesRepository")
    private sitesRepository: SitesRepository
  ) {}

  async execute(
    {
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
    }: IRequest,
    contest: Contest
  ): Promise<Site> {
    sitename = sitename ? sitename.trim() : "";
    if (sitename.length === 0) {
      throw ApiError.badRequest("Site name must be specified");
    }
    
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

    if (sitenumber === undefined) {
      let lastId = await this.sitesRepository.getLastId(contestnumber);
      lastId = lastId ? lastId : 0;
      sitenumber = lastId + 1;
    } else {
      const existingSite = await this.sitesRepository.getById(
        sitenumber,
        contestnumber
      );
      if (existingSite !== undefined) {
        throw ApiError.alreadyExists(
          "Site number already exists for this contest"
        );
      }
    }

    siteautoend = siteautoend !== undefined ? siteautoend : true;
    siteduration = siteduration !== undefined ? siteduration : contest.contestduration;

    sitejudging =
      sitejudging !== undefined ? sitejudging : sitenumber.toString();

    sitetasking =
      sitetasking !== undefined ? sitetasking : sitenumber.toString();

    sitelastmileanswer =
      sitelastmileanswer !== undefined
        ? sitelastmileanswer
        : contest.contestlastmileanswer;

    sitelastmilescore =
      sitelastmilescore !== undefined
        ? sitelastmilescore
        : contest.contestlastmilescore;

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

    const validation = await validate(site);

    if (validation.length > 0) {
      const errors = validation[0].constraints as object;
      const [, message] = Object.entries(errors)[0];
      throw ApiError.badRequest(message);
    }

    return await this.sitesRepository.create({
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
  }
}

export { CreateSiteUseCase };
