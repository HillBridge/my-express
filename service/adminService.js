const md5 = require("md5");
const { loginDao } = require("../dao/adminDao");

const adminService = async (loginInfo) => {
  loginInfo.loginPwd = md5(loginInfo.loginPwd);
  return await loginDao(loginInfo);
};

module.exports = { adminService };
