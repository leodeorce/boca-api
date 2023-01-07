import { User } from "../../src/entities/User";

/** PASS */

const createNewUserPass = new User();
// createNewUserPass.contestnumber = "";
// createNewUserPass.usernumber = "";
// createNewUserPass.usersitenumber = "";
createNewUserPass.username = "Time 1";
createNewUserPass.userfullname = "Time 1";
// createNewUserPass.userdesc = ;
createNewUserPass.usertype = "Team";
createNewUserPass.userenabled = true;
createNewUserPass.usermultilogin = false;
createNewUserPass.userpassword = "";
createNewUserPass.userip = "";
// createNewUserPass.userlastlogin = ;
createNewUserPass.usersession = "";
createNewUserPass.usersessionextra = "";
// createNewUserPass.userlastlogout = ;
createNewUserPass.userpermitip = "";
createNewUserPass.userinfo = "";
createNewUserPass.usericpcid = "";

const createUser3Pass = { ...createNewUserPass };
createUser3Pass.usernumber = 3;
createUser3Pass.username = "Time 3";
createUser3Pass.userfullname = "Time 3";
createUser3Pass.userdesc = "Time 3";
createUser3Pass.userpassword = "cbdee56541d98fc7f8d26ee25ffde3db";

// Troca de senha
const updateUser1Pass = { ...createNewUserPass };
updateUser1Pass.userpassword = "7ab2d6e73d6ed4fb40fc1f97f051a183";

// Modifica descrição
const updateUser3Pass = { ...createUser3Pass };
updateUser3Pass.userdesc = "Escola do Time 3";

/** FAIL */

// Falha pois o site não existe
const createUser4Fail = { ...createNewUserPass };
createUser4Fail.usernumber = 4;
createUser4Fail.username = "Time 4";
createUser4Fail.userfullname = "Time 4";

// Tenta criar usuário de nome vazio
const createUser5Fail = { ...createNewUserPass };
createUser5Fail.usernumber = 5;
createUser5Fail.username = "";
createUser5Fail.userfullname = "";

// Tenta modificar a descrição do usuário para valor inválido
const updateUser3Fail = { ...createUser3Pass };
updateUser3Fail.userdesc = 2 as unknown as string;

// Tenta modificar um usuário que não existe
const updateUser4Fail = { ...createUser3Pass };
updateUser4Fail.userenabled = false;

export {
  createNewUserPass,
  createUser3Pass,
  createUser4Fail,
  createUser5Fail,
  updateUser1Pass,
  updateUser3Pass,
  updateUser3Fail,
  updateUser4Fail,
};
