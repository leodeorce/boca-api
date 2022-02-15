import { inject, injectable } from "tsyringe";

import { SitesRepository } from "../../repositories/implementations/SitesRepository";

interface IRequest {
  contestnumber: number;
  usersitenumber: number;
  usernamber: number;
  siteip: string;
  sitename: string;
  siteactive: boolean;
  sitepermitlogins: boolean;
  sitelastmileanswer?: boolean;
  sitelastmilescore?: number;
  siteduration?: number;
  siteautoend?: boolean;
  sitejudging?: string;
  sitetasking?: string;
  siteglobalscore: string;
  sitescorelevel: number;
  sitenextuser: number;
  sitenextclar: number;
  sitenextsite: number;
  sitemaxtask: number;
  sitechiefname: string;
  updatetime: number;
  siteautojudge: boolean = false;
  sitemaxsitetime: number;
  sitemaxjudgewaittime: number;
}

@injectable()
class CreateSiteUseCase {
  constructor(
    @inject("SitesRepository")
    private sitesRepository: SitesRepository
  ) {}

  async execute({
    contestnumber,
    usersitenumber,
    usernamber,
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
    sitenextsite,
    sitemaxtask,
    sitechiefname,
    updatetime,
    siteautojudge: boolean ,
    sitemaxsitetime,
    sitemaxjudgewaittime,
  }: IRequest): Promise<void> {
    await this.sitesRepository.create({
      contestnumber,
      usersitenumber,
      usernamber,
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
      sitenextsite,
      sitemaxtask,
      sitechiefname,
      updatetime,
      siteautojudge: boolean ,
      sitemaxsitetime,
      sitemaxjudgewaittime,
    });
  }
}

export { CreateSiteUseCase };
