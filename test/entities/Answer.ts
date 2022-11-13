import { Answer } from "../../src/entities/Answer";

/** PASS */

const createAnswer0Pass = new Answer();
createAnswer0Pass.answernumber = 0;
createAnswer0Pass.runanswer = "Not answered yet";
createAnswer0Pass.yes = false;
createAnswer0Pass.fake = true;

const createAnswer1Pass = new Answer();
createAnswer1Pass.answernumber = 1;
createAnswer1Pass.runanswer = "YES";
createAnswer1Pass.yes = true;
createAnswer1Pass.fake = false;

const createAnswer2Pass = new Answer();
createAnswer2Pass.answernumber = 2;
createAnswer2Pass.runanswer = "NO - Compilation error";
createAnswer2Pass.yes = false;
createAnswer2Pass.fake = false;

const updateAnswer0Pass = { ...createAnswer0Pass };
updateAnswer0Pass.runanswer = "No answer";

const patchAnswer1Pass = new Answer();
patchAnswer1Pass.runanswer = "Yes";

/** FAIL */

const createAnswer3Fail = { ...createAnswer0Pass };
createAnswer3Fail.answernumber = 3;
createAnswer3Fail.runanswer = "NO - Runtime error";
createAnswer3Fail.yes = false;
createAnswer3Fail.fake = false;

const createAnswer4Fail = { ...createAnswer0Pass };
createAnswer4Fail.answernumber = -1;
createAnswer4Fail.runanswer = "NO - Time limit exceeded";
createAnswer4Fail.yes = false;
createAnswer4Fail.fake = false;

const updateAnswer0Fail = { ...createAnswer0Pass };
updateAnswer0Fail.runanswer = "";

const patchAnswer2Fail = new Answer();
patchAnswer2Fail.contestnumber = 3;

const patchAnswer3Fail = new Answer();
patchAnswer3Fail.yes = true;

export {
  createAnswer0Pass,
  createAnswer1Pass,
  createAnswer2Pass,
  createAnswer3Fail,
  createAnswer4Fail,
  updateAnswer0Pass,
  patchAnswer1Pass,
  updateAnswer0Fail,
  patchAnswer2Fail,
  patchAnswer3Fail,
};
