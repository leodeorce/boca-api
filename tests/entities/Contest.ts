import { Contest } from "../../src/entities/Contest";

const contest1 = new Contest();

contest1.contestname = "Contest1";
contest1.conteststartdate = Math.floor(Date.now() / 1000);
contest1.contestduration = 11_264_340;
contest1.contestlastmileanswer = 11_263_440;
contest1.contestlastmilescore = 11_260_740;
contest1.contestlocalsite = 1;
contest1.contestpenalty = 1200;
contest1.contestmaxfilesize = 100_000;
contest1.contestactive = true;
contest1.contestmainsite = 1;
contest1.contestkeys = "";
contest1.contestunlockkey = "";
contest1.contestmainsiteurl = "";

const contest2 = new Contest();

contest2.contestname = "Contest2";
contest2.conteststartdate = Math.floor(Date.now() / 1000);
contest2.contestduration = 0;
contest2.contestlastmileanswer = 11_263_440;
contest2.contestlastmilescore = 11_260_740;
contest2.contestlocalsite = 0;
contest2.contestpenalty = 12_000;
contest2.contestmaxfilesize = 1_000;
contest2.contestactive = false;
contest2.contestmainsite = 2;
contest2.contestkeys = "[d3g22q]";
contest2.contestunlockkey = "[d3g22q]";
contest2.contestmainsiteurl = "http://a.b";

export { contest1, contest2 };
