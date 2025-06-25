const adminModel = require("./model/adminModel");

const loginDao = async (loginInfo) => {
  // const res = await adminModel.findByPk(10);  ===> 通过主键primary key 查询
  // const res = await adminModel.findAll(); ===> 查询所有数据
  //   const { count, rows } = await adminModel.findAndCountAll({
  //     where: {
  //       loginId: loginInfo.loginId,
  //     },
  //   });  ===> 按条件查询符合条件的所有数据项以及总条数
  return await adminModel.findOne({
    where: {
      loginId: loginInfo.loginId,
      loginPwd: loginInfo.loginPwd,
    },
  });
};

const updateUserDao = async (newUserInfo) => {
  return await adminModel.update(newUserInfo, {
    where: {
      id: newUserInfo.id,
    },
  });
};

module.exports = { loginDao, updateUserDao };
