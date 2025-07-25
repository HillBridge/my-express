const adminModel = require("./model/adminModel");
const bannerModel = require("./model/bannerModel");
const blogTypeModel = require("./model/blogTypeModel");
const blogModel = require("./model/blogModel");
const sequelize = require("./dbConnect");
const md5 = require("md5");

(async () => {
  // 关联博客类型与博客之间的关系, 博客类型可以有多个博客, 博客属于一个博客类型
  blogTypeModel.hasMany(blogModel, {
    foreignKey: "categoryId",
    sourceKey: "id",
  });
  blogModel.belongsTo(blogTypeModel, {
    foreignKey: "categoryId",
    targetKey: "id",
    as: "category",
  });

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

  const bannerCount = await bannerModel.count();
  if (bannerCount === 0) {
    // 批量创建数据
    await bannerModel.bulkCreate([
      {
        title: "banner1",
        description: "banner1",
        link: "../public/images/banner/AR.webp",
      },
      {
        title: "banner2",
        description: "banner2",
        link: "../public/images/banner/AT.webp",
      },
      {
        title: "banner3",
        description: "banner3",
        link: "../public/images/banner/AU.webp",
      },
    ]);
    console.log("初始化banner数据成功...");
  }

  const blogTypeCount = await blogTypeModel.count();
  if (blogTypeCount === 0) {
    await blogTypeModel.bulkCreate([
      {
        name: "html",
        articleCount: 10,
        order: 1,
      },
      {
        name: "css",
        articleCount: 10,
        order: 2,
      },
      {
        name: "javascript",
        articleCount: 10,
        order: 3,
      },
    ]);
    console.log("初始化博客数据成功...");
  }

  console.log("数据库初始化完成...");
})();
