import { Lang } from "../../src/entities/Lang";

/** PASS */

const createLang1Pass = new Lang();
createLang1Pass.langname = "C";
createLang1Pass.langextension = "c";

const createLang2Pass = new Lang();
createLang2Pass.langname = "Java";
createLang2Pass.langextension = "java";

const createLang3Pass = new Lang();
createLang3Pass.langname = "PostgreSQL_v10";
createLang3Pass.langextension = "postgres";

const updateLang1Pass = { ...createLang1Pass };
updateLang1Pass.langname = "C++11";
updateLang1Pass.langextension = "cc";

const patchLang2Pass = new Lang();
patchLang2Pass.langname = "Java17";

/** FAIL */

const createLang4Fail = { ...createLang1Pass };
createLang4Fail.langname = "";
createLang4Fail.langextension = "";

const createLang5Fail = new Lang();
createLang5Fail.langname = "Python3";

const updateLang1Fail = new Lang();
updateLang1Fail.langname = "C11";

const patchLang2Fail = new Lang();
patchLang2Fail.contestnumber = 4;

const patchLang4Fail = new Lang();
patchLang4Fail.langname = true as unknown as string;

export {
  createLang1Pass,
  createLang2Pass,
  createLang3Pass,
  createLang4Fail,
  createLang5Fail,
  updateLang1Pass,
  patchLang2Pass,
  updateLang1Fail,
  patchLang2Fail,
  patchLang4Fail,
};
