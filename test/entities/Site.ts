import { Site } from "../../src/entities/Site";

/** PASS */

// Sem especificar sitenumber
const createNewSitePass = new Site();
// createNewSitePass.sitenumber = 2;
createNewSitePass.siteip = "192.168.0.1";
createNewSitePass.sitename = "Site 2";
createNewSitePass.siteactive = true;
createNewSitePass.sitepermitlogins = false;
createNewSitePass.sitelastmileanswer = 0;
createNewSitePass.sitelastmilescore = 0;
createNewSitePass.siteduration = 3600;
createNewSitePass.siteautoend = true;
createNewSitePass.sitejudging = "1";
createNewSitePass.sitetasking = "1";
createNewSitePass.siteglobalscore = "2";
createNewSitePass.sitescorelevel = 3;
createNewSitePass.sitenextuser = 0;
createNewSitePass.sitenextclar = 0;
createNewSitePass.sitenextrun = 0;
createNewSitePass.sitenexttask = 0;
createNewSitePass.sitemaxtask = 10;
createNewSitePass.sitechiefname = "";
createNewSitePass.siteautojudge = false;
createNewSitePass.sitemaxruntime = 600;
createNewSitePass.sitemaxjudgewaittime = 900;

// Especificando sitenumber
const createSite3Pass = { ...createNewSitePass };
createSite3Pass.sitenumber = 3;
createSite3Pass.sitename = "Site 3";
createSite3Pass.siteautoend = true;
createSite3Pass.sitejudging = "3";
createSite3Pass.siteglobalscore = "1";
createSite3Pass.sitemaxtask = 8;
createSite3Pass.siteautojudge = true;

// Modifica duração do site
const updateSite1Pass = { ...createNewSitePass };
updateSite1Pass.siteduration = 7200;

// Permite logins
const updateSite3Pass = { ...createSite3Pass };
updateSite3Pass.sitepermitlogins = true;

/** FAIL */

// Contest não existe
const createSite4Fail = { ...createNewSitePass };
createSite4Fail.sitenumber = 4;
createSite4Fail.sitename = "Site 4";
createSite4Fail.sitelastmileanswer = 0;
createSite4Fail.sitelastmilescore = 0;
createSite4Fail.siteduration = 3600;
createSite4Fail.sitejudging = "4";
createSite4Fail.sitetasking = "4";

// Nome inválido
const createSite5Fail = { ...createNewSitePass };
createSite5Fail.sitenumber = 5;
createSite5Fail.sitename = "";
createSite5Fail.sitelastmileanswer = 0;
createSite5Fail.sitelastmilescore = 0;
createSite5Fail.siteduration = 3600;
createSite5Fail.sitejudging = "5";
createSite5Fail.sitetasking = "5";

// Tenta modificar duração do site para valor inválido
const updateSite3Fail = { ...createSite3Pass };
updateSite3Fail.siteduration = -7200;

// Tenta modificar um site que não existe
const updateSite4Fail = { ...createSite3Pass };
updateSite4Fail.siteautojudge = true;

export {
  createNewSitePass,
  createSite3Pass,
  createSite4Fail,
  createSite5Fail,
  updateSite1Pass,
  updateSite3Pass,
  updateSite3Fail,
  updateSite4Fail,
};
