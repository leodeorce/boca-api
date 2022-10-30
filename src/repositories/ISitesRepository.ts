import { Site } from "../entities/Site";

interface ICreateSiteDTO {
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

interface IUpdateSiteDTO {
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

interface ILastIdResult {
  id: number;
}

interface ISitesRepository {
  list(contestnumber: number): Promise<Site[]>;
  create(site: ICreateSiteDTO): Promise<Site>;
  getById(sitenumber: number, contestnumber: number): Promise<Site | undefined>;
  update(site: IUpdateSiteDTO): Promise<Site>;
  delete(sitenumber: number, contestnumber: number): Promise<void>;
  getLastId(contestnumber: number): Promise<number | undefined>;
}

export { ISitesRepository, ICreateSiteDTO, ILastIdResult, IUpdateSiteDTO };
