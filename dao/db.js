const adminModel = require("./model/adminModel");
const sequelize = require("./dbConnect");
const md5 = require("md5");

(async () => {
  // 数据模型同步
  await sequelize.sync({
    alter: true,
  });

  // 同步完成后,有一些表需要初始化数据
  // 初始化数据的条件应该检查表里是否已经存在数据, 避免重复初始化数据
  const adminCount = await adminModel.count(); //查询表中的数据数量
  if (adminCount === 0) {
    // 创建表中的数据
    await adminModel.create({
      loginId: "admin",
      name: "超级管理员",
      loginPwd: md5("123456"),
    });
    console.log("初始化超级管理员成功...");
  }

  console.log("数据库初始化完成...");
})();
