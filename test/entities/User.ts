import { User } from "../../src/entities/User";

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

export { createNewUserPass };
