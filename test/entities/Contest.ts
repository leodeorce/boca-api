import { Contest } from "../../src/entities/Contest";

// TODO Usar desestruturação para facilitar entendimento e diminuir código

const createAlphaPass = new Contest();

createAlphaPass.contestname = "Contest Alpha";
createAlphaPass.conteststartdate = Math.floor(Date.now() / 1000) + 3600;
createAlphaPass.contestduration = 11_264_340;
createAlphaPass.contestlastmileanswer = 11_263_440;
createAlphaPass.contestlastmilescore = 11_260_740;
createAlphaPass.contestlocalsite = 1;
createAlphaPass.contestpenalty = 1200;
createAlphaPass.contestmaxfilesize = 100_000;
createAlphaPass.contestmainsite = 1;
createAlphaPass.contestkeys = "[d3g22q]";
createAlphaPass.contestunlockkey = "[d3g22q]";
createAlphaPass.contestmainsiteurl = "http://a.b";

const createBetaPass = new Contest();

createBetaPass.contestname = "Contest Beta";
createBetaPass.conteststartdate = Math.floor(Date.now() / 1000) - 3600;
createBetaPass.contestduration = 3600;
createBetaPass.contestlocalsite = 5;
createBetaPass.contestpenalty = 12_000;
createBetaPass.contestmaxfilesize = 1000;
createBetaPass.contestmainsite = 2;

// Nome já existe
const createAlphaFail = new Contest();

createAlphaFail.contestname = "Contest Beta";
createAlphaFail.conteststartdate = Math.floor(Date.now() / 1000);
createAlphaFail.contestduration = 1;
createAlphaFail.contestlastmileanswer = 11_263_440;
createAlphaFail.contestlastmilescore = 11_260_740;
createAlphaFail.contestlocalsite = 1;
createAlphaFail.contestpenalty = 12_000;
createAlphaFail.contestmaxfilesize = 1000;
createAlphaFail.contestmainsite = 2;

// Duração inválida
const createCharlieFail = new Contest();

createCharlieFail.contestname = "Contest Charlie";
createCharlieFail.conteststartdate = Math.floor(Date.now() / 1000) - 300;
createCharlieFail.contestduration = 0;
createCharlieFail.contestlastmileanswer = 11_263_440;
createCharlieFail.contestlastmilescore = 11_260_740;
createCharlieFail.contestlocalsite = 1;
createCharlieFail.contestpenalty = 12_000;
createCharlieFail.contestmaxfilesize = 1000;
createCharlieFail.contestmainsite = 2;

// Faltando data de início
const createDeltaFail = new Contest();

createDeltaFail.contestname = "Contest Delta";
createDeltaFail.contestduration = 3600;
createDeltaFail.contestlastmileanswer = 11_263_440;
createDeltaFail.contestlastmilescore = 11_260_740;
createDeltaFail.contestlocalsite = 1;
createDeltaFail.contestpenalty = 12_000;
createDeltaFail.contestmaxfilesize = 1000;
createDeltaFail.contestmainsite = 2;

// Ativa o Contest Alpha
const updateAlphaPass = new Contest();
updateAlphaPass.contestactive = true;

// Modifica todas as propriedades possíveis
const updateBetaPass = new Contest();
updateBetaPass.contestname = "Contest Beta Atualizado";
updateBetaPass.conteststartdate = Math.floor(Date.now() / 1000) - 7200;
updateBetaPass.contestduration = 7200;
updateBetaPass.contestlastmileanswer = 5600;
updateBetaPass.contestlastmilescore = 5600;
updateBetaPass.contestlocalsite = 1;
updateBetaPass.contestpenalty = 48_000;
updateBetaPass.contestmaxfilesize = 100_000;
updateBetaPass.contestactive = false;
updateBetaPass.contestmainsite = 3;
updateBetaPass.contestkeys = "[d3g22q]";
updateBetaPass.contestunlockkey = "[d3g22q]";
updateBetaPass.contestmainsiteurl = "http://a.b";

// Ativa o Contest Beta
const updateBetaPass2 = new Contest();
updateBetaPass2.contestactive = true;

// Tenta modificar a duração do Contest Alpha com um valor inválido
const updateAlphaFail = new Contest();
updateAlphaFail.contestduration = -3600;

// Tenta modificar o site principal do Contest Beta com o ID do "fake site"
const updateBetaFail = new Contest();
updateBetaFail.contestname = "Contest Beta Site 0";
updateBetaFail.conteststartdate = Math.floor(Date.now() / 1000) - 7200;
updateBetaFail.contestduration = 7200;
updateBetaFail.contestlastmileanswer = 5600;
updateBetaFail.contestlastmilescore = 5600;
updateBetaFail.contestlocalsite = 1;
updateBetaFail.contestpenalty = 48_000;
updateBetaFail.contestmaxfilesize = 100_000;
updateBetaFail.contestactive = false;
updateBetaFail.contestmainsite = 0;
updateBetaFail.contestkeys = "[d3g22q]";
updateBetaFail.contestunlockkey = "[d3g22q]";
updateBetaFail.contestmainsiteurl = "http://a.b";

// Tenta realizar modificação válida em um Contest que não existe
const updateCharlieFail = new Contest();
updateCharlieFail.contestlastmileanswer = 0;


export {
  createAlphaPass,
  createBetaPass,
  createAlphaFail,
  createCharlieFail,
  createDeltaFail,
  updateAlphaPass,
  updateBetaPass,
  updateBetaPass2,
  updateAlphaFail,
  updateBetaFail,
  updateCharlieFail,
};
