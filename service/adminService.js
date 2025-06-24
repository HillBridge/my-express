const md5 = require("md5");
const { loginDao } = require("../dao/adminDao");
const jwt = require("jsonwebtoken");

const adminService = async (loginInfo) => {
  loginInfo.loginPwd = md5(loginInfo.loginPwd);
  let data = await loginDao(loginInfo);
  if (data && data?.dataValues) {
    data = {
      id: data.id,
      name: data.name,
      loginId: data.loginId,
    };
    const loginPeriod = data.remember ? data.remember : 1;
    // 生成token
    const token = jwt.sign(data, md5(process.env.JWT_SECRET), {
      expiresIn: 60 * 60 * 24 * loginPeriod,
    });
    return {
      data,
      token,
    };
  }

  return {
    data,
  };
};

module.exports = { adminService };
