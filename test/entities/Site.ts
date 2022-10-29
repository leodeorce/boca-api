import { Site } from "../../src/entities/Site";

// TODO Usar destructuring para diminuir a quantidade de linhas desse arquivo

// Sem especificar sitenumber
const createNewSitePass = new Site();
// createNewSitePass.sitenumber = 2;
createNewSitePass.siteip = "192.168.0.1";
createNewSitePass.sitename = "Site 2";
createNewSitePass.siteactive = true;
createNewSitePass.sitepermitlogins = false;
// createNewSitePass.sitelastmileanswer = 0;
// createNewSitePass.sitelastmilescore = 0;
// createNewSitePass.siteduration = 3600;
// createNewSitePass.siteautoend = true;
// createNewSitePass.sitejudging = "2";
// createNewSitePass.sitetasking = "2";
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
const createSite3Pass = new Site();
createSite3Pass.sitenumber = 3;
createSite3Pass.siteip = "192.168.0.1";
createSite3Pass.sitename = "Site 3";
createSite3Pass.siteactive = true;
createSite3Pass.sitepermitlogins = false;
// createSite3Pass.sitelastmileanswer = 0;
// createSite3Pass.sitelastmilescore = 0;
// createSite3Pass.siteduration = 3600;
createSite3Pass.siteautoend = true;
createSite3Pass.sitejudging = "3";
// createSite3Pass.sitetasking = "3";
createSite3Pass.siteglobalscore = "1";
createSite3Pass.sitescorelevel = 3;
createSite3Pass.sitenextuser = 0;
createSite3Pass.sitenextclar = 0;
createSite3Pass.sitenextrun = 0;
createSite3Pass.sitenexttask = 0;
createSite3Pass.sitemaxtask = 8;
createSite3Pass.sitechiefname = "";
createSite3Pass.siteautojudge = true;
createSite3Pass.sitemaxruntime = 600;
createSite3Pass.sitemaxjudgewaittime = 900;

// Contest não existe
const createSite4Fail = new Site();
createSite4Fail.sitenumber = 4;
createSite4Fail.siteip = "192.168.0.1";
createSite4Fail.sitename = "Site 4";
createSite4Fail.siteactive = true;
createSite4Fail.sitepermitlogins = false;
createSite4Fail.sitelastmileanswer = 0;
createSite4Fail.sitelastmilescore = 0;
createSite4Fail.siteduration = 3600;
createSite4Fail.siteautoend = true;
createSite4Fail.sitejudging = "4";
createSite4Fail.sitetasking = "4";
createSite4Fail.siteglobalscore = "1";
createSite4Fail.sitescorelevel = 3;
createSite4Fail.sitenextuser = 0;
createSite4Fail.sitenextclar = 0;
createSite4Fail.sitenextrun = 0;
createSite4Fail.sitenexttask = 0;
createSite4Fail.sitemaxtask = 8;
createSite4Fail.sitechiefname = "";
createSite4Fail.siteautojudge = true;
createSite4Fail.sitemaxruntime = 600;
createSite4Fail.sitemaxjudgewaittime = 900;

// Nome inválido
const createSite5Fail = new Site();
createSite5Fail.contestnumber = 2;
createSite5Fail.sitenumber = 4;
createSite5Fail.siteip = "192.168.0.1";
createSite5Fail.sitename = "";
createSite5Fail.siteactive = true;
createSite5Fail.sitepermitlogins = false;
createSite5Fail.sitelastmileanswer = 0;
createSite5Fail.sitelastmilescore = 0;
createSite5Fail.siteduration = 3600;
createSite5Fail.siteautoend = true;
createSite5Fail.sitejudging = "4";
createSite5Fail.sitetasking = "4";
createSite5Fail.siteglobalscore = "1";
createSite5Fail.sitescorelevel = 3;
createSite5Fail.sitenextuser = 0;
createSite5Fail.sitenextclar = 0;
createSite5Fail.sitenextrun = 0;
createSite5Fail.sitenexttask = 0;
createSite5Fail.sitemaxtask = 8;
createSite5Fail.sitechiefname = "";
createSite5Fail.siteautojudge = true;
createSite5Fail.sitemaxruntime = 600;
createSite5Fail.sitemaxjudgewaittime = 900;

export { createNewSitePass, createSite3Pass, createSite4Fail, createSite5Fail };
