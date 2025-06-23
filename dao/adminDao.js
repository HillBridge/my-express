const adminModel = require("./model/adminModel");

const loginDao = async (loginInfo) => {
  const data = await adminModel.findOne({
    where: {
      loginId: loginInfo.loginId,
      loginPwd: loginInfo.loginPwd,
    },
  });
  if (data && data?.dataValues) {
    // todo处理token
  }

  return {
    data,
  };
};

module.exports = { loginDao };
