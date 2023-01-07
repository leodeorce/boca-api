import { injectable } from "tsyringe";
import { RequestValidator } from "./RequestValidator";

const createRequiredProperties = [
  "siteip",
  "sitename",
  "siteactive",
  "sitepermitlogins",
  "siteglobalscore",
  "sitescorelevel",
  "sitenextuser",
  "sitenextclar",
  "sitenextrun",
  "sitenexttask",
  "sitemaxtask",
  "sitechiefname",
  "siteautojudge",
  "sitemaxruntime",
  "sitemaxjudgewaittime",
];

const updateRequiredProperties = [
  "siteip",
  "sitename",
  "siteactive",
  "sitepermitlogins",
  "siteglobalscore",
  "sitescorelevel",
  "sitenextuser",
  "sitenextclar",
  "sitenextrun",
  "sitenexttask",
  "sitemaxtask",
  "sitechiefname",
  "siteautojudge",
  "sitemaxruntime",
  "sitemaxjudgewaittime",
];

@injectable()
class SiteRequestValidator extends RequestValidator {
  hasRequiredCreateProperties(request: object): void {
    this.hasRequiredProperties(request, createRequiredProperties);
  }

  hasRequiredUpdateProperties(request: object): void {
    this.hasRequiredProperties(request, updateRequiredProperties);
  }
}

export { SiteRequestValidator };
