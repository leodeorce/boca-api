import { Contest } from "../../src/entities/Contest";

const createContest1 = new Contest();

createContest1.contestname = "Contest 1";
createContest1.conteststartdate = Math.floor(Date.now() / 1000);
createContest1.contestduration = 11_264_340;
createContest1.contestlastmileanswer = 11_263_440;
createContest1.contestlastmilescore = 11_260_740;
createContest1.contestlocalsite = 1;
createContest1.contestpenalty = 1200;
createContest1.contestmaxfilesize = 100_000;
createContest1.contestmainsite = 1;
createContest1.contestkeys = "[d3g22q]";
createContest1.contestunlockkey = "[d3g22q]";
createContest1.contestmainsiteurl = "http://a.b";

const createContest2 = new Contest();

createContest2.contestname = "Contest 2";
createContest2.conteststartdate = Math.floor(Date.now() / 1000) + 1000;
createContest2.contestduration = 3600;
createContest2.contestlocalsite = 5;
createContest2.contestpenalty = 12_000;
createContest2.contestmaxfilesize = 1_000;
createContest2.contestmainsite = 2;

const createContest3 = new Contest();

createContest3.contestname = "Contest 3";
createContest3.conteststartdate = Math.floor(Date.now() / 1000) - 1000;
createContest3.contestduration = 1;
createContest3.contestlastmileanswer = 11_263_440;
createContest3.contestlastmilescore = 11_260_740;
createContest3.contestlocalsite = 1;
createContest3.contestpenalty = 12_000;
createContest3.contestmaxfilesize = 1_000;
createContest3.contestmainsite = 2;

const createContest4 = new Contest();

createContest4.contestname = "Contest 4";
createContest4.conteststartdate = Math.floor(Date.now() / 1000) - 300;
createContest4.contestduration = 0;
createContest4.contestlastmileanswer = 11_263_440;
createContest4.contestlastmilescore = 11_260_740;
createContest4.contestlocalsite = 1;
createContest4.contestpenalty = 12_000;
createContest4.contestmaxfilesize = 1_000;
createContest4.contestmainsite = 2;

const createContest5 = new Contest();

createContest5.contestname = "Contest 5";
createContest5.contestduration = 0;
createContest5.contestlastmileanswer = 11_263_440;
createContest5.contestlastmilescore = 11_260_740;
createContest5.contestlocalsite = 1;
createContest5.contestpenalty = 12_000;
createContest5.contestmaxfilesize = 1_000;
createContest5.contestmainsite = 2;

const updateContest1 = new Contest();

updateContest1.contestactive = true;

export {
  createContest1,
  createContest2,
  createContest3,
  createContest4,
  createContest5,
  updateContest1,
};
