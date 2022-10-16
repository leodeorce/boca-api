import { Contest } from "../../src/entities/Contest";

const createContestPass1 = new Contest();

createContestPass1.contestname = "Contest Alpha";
createContestPass1.conteststartdate = Math.floor(Date.now() / 1000) + 3600;
createContestPass1.contestduration = 11_264_340;
createContestPass1.contestlastmileanswer = 11_263_440;
createContestPass1.contestlastmilescore = 11_260_740;
createContestPass1.contestlocalsite = 1;
createContestPass1.contestpenalty = 1200;
createContestPass1.contestmaxfilesize = 100_000;
createContestPass1.contestmainsite = 1;
createContestPass1.contestkeys = "[d3g22q]";
createContestPass1.contestunlockkey = "[d3g22q]";
createContestPass1.contestmainsiteurl = "http://a.b";

const createContestPass2 = new Contest();

createContestPass2.contestname = "Contest Beta";
createContestPass2.conteststartdate = Math.floor(Date.now() / 1000) - 3600;
createContestPass2.contestduration = 3600;
createContestPass2.contestlocalsite = 5;
createContestPass2.contestpenalty = 12_000;
createContestPass2.contestmaxfilesize = 1000;
createContestPass2.contestmainsite = 2;

// Nome já existe
const createContestFail1 = new Contest();

createContestFail1.contestname = "Contest Beta";
createContestFail1.conteststartdate = Math.floor(Date.now() / 1000);
createContestFail1.contestduration = 1;
createContestFail1.contestlastmileanswer = 11_263_440;
createContestFail1.contestlastmilescore = 11_260_740;
createContestFail1.contestlocalsite = 1;
createContestFail1.contestpenalty = 12_000;
createContestFail1.contestmaxfilesize = 1000;
createContestFail1.contestmainsite = 2;

// Duração inválida
const createContestFail2 = new Contest();

createContestFail2.contestname = "Contest Charlie";
createContestFail2.conteststartdate = Math.floor(Date.now() / 1000) - 300;
createContestFail2.contestduration = 0;
createContestFail2.contestlastmileanswer = 11_263_440;
createContestFail2.contestlastmilescore = 11_260_740;
createContestFail2.contestlocalsite = 1;
createContestFail2.contestpenalty = 12_000;
createContestFail2.contestmaxfilesize = 1000;
createContestFail2.contestmainsite = 2;

// Faltando data de início
const createContestFail3 = new Contest();

createContestFail3.contestname = "Contest Delta";
createContestFail3.contestduration = 3600;
createContestFail3.contestlastmileanswer = 11_263_440;
createContestFail3.contestlastmilescore = 11_260_740;
createContestFail3.contestlocalsite = 1;
createContestFail3.contestpenalty = 12_000;
createContestFail3.contestmaxfilesize = 1000;
createContestFail3.contestmainsite = 2;

// Ativa o Contest Alpha
const updateContestPass1 = new Contest();
updateContestPass1.contestactive = true;

// Aumenta a duração do Contest Beta
const updateContestPass2 = new Contest();
updateContestPass2.contestduration = 7200;

// Tenta modificar a duração do Contest Alpha com um valor inválido
const updateContestFail1 = new Contest();
updateContestFail1.contestduration = -3600;

// Tenta modificar o site principal do Contest Beta com o ID do "fake site"
const updateContestFail2 = new Contest();
updateContestFail2.contestmainsite = 0;

// Tenta realizar modificação válida em um Contest que não existe
const updateContestFail3 = new Contest();
updateContestFail3.contestlastmileanswer = 0;

export {
  createContestPass1,
  createContestPass2,
  createContestFail1,
  createContestFail2,
  createContestFail3,
  updateContestPass1,
  updateContestPass2,
  updateContestFail1,
  updateContestFail2,
  updateContestFail3,
};
