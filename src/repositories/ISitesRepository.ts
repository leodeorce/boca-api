import { Site } from "../entities/Site";

interface ICreateSiteDTO {
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
  sitenextrun: number;
  sitemaxtask: number;
  sitechiefname: string;
  updatetime: number;
  siteautojudge: boolean = false;
  sitemaxruntime: number;
  sitemaxjudgewaittime: number;
}

interface IUpdateSiteDTO {
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
  sitenextrun?: number;
  sitemaxtask?: number;
  sitechiefname?: string;
  updatetime?: number;
  siteautojudge?: boolean = false;
  sitemaxruntime?: number;
  sitemaxjudgewaittime?: number;
}

interface ICountResult {
  max: string;
}

interface ISitesRepository {
  findByName(name: string): Promise<Site | undefined>;
  list(): Promise<Site[]>;
  create(site: ICreateSiteDTO): Promise<void>;
  count(): Promise<number>;
  getById(id: number): Promise<Site | undefined>;
  update(site: IUpdateSiteDTO): Promise<Site>;
  delete(contestnumber: number): Promise<void>;
}

export { ISitesRepository, ICreateSiteDTO, ICountResult, IUpdateSiteDTO };
