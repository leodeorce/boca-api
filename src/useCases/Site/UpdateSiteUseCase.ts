import { inject, injectable } from "tsyringe";

import { SitesRepository } from "../../repositories/implementations/SitesRepository";

interface IRequest {
  contestnumber?: number;
  usersitenumber: number;
  usernamber?: number;
  siteip?: string;
  sitename?: string;
  siteactive?: boolean;
  sitepermitlogins?: boolean;
  sitelastmileanswer?: boolean;
  sitelastmilescore?: number;
  siteduration?: number;
  siteautoend?: boolean;
  sitejudging?: string;
  sitetasking?: string;
  siteglobalscore?: string;
  sitescorelevel?: number;
  sitenextuser?: number;
  sitenextclar?: number;
  sitenextsite?: number;
  sitemaxtask?: number;
  sitechiefname?: string;
  updatetime?: number;
  siteautojudge?: boolean = false;
  sitemaxsitetime?: number;
  sitemaxjudgewaittime?: number;

}

@injectable()
class UpdateSiteUseCase {
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
    const siteExists = await this.sitesRepository.getById(sitenumber);

    if (!siteExists) {
      throw new Error("Site does not exist");
    }
    try {
      await this.sitesRepository.update({
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
      return Promise.resolve();
    } catch (err) {
      const error = err as Error;
      return Promise.reject(error);
    }
  }
}

export { UpdateSiteUseCase };
