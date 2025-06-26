const md5 = require("md5");
const { loginDao, updateUserDao } = require("../dao/adminDao");
const jwt = require("jsonwebtoken");
const { ValidationError } = require("../utils/error");
const svgCaptcha = require("svg-captcha");

const loginService = async (loginInfo) => {
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

const updateUserService = async (userInfo) => {
  // 先验证旧的密码是否正确
  const dataInfo = await loginDao({
    loginId: userInfo.loginId,
    loginPwd: md5(userInfo.oldPwd),
  });
  if (dataInfo && dataInfo?.dataValues) {
    const newUserInfo = {
      name: userInfo.name,
      loginId: userInfo.loginId,
      loginPwd: md5(userInfo.newPwd),
      id: dataInfo.dataValues.id,
    };
    return await updateUserDao(newUserInfo);
  } else {
    throw new ValidationError("旧密码不正确");
  }
};

const getCaptchaService = async () => {
  var captcha = svgCaptcha.create({
    size: 4,
    ignoreChars: "0o1i",
    noise: 2,
    color: true,
    background: "#cc9966",
  });
  return captcha;
};

module.exports = { loginService, updateUserService, getCaptchaService };
