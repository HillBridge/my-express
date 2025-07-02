const blogModel = require("./model/blogModel");
const { addBlogToTypeDao } = require("./blogTypeDao");
const { Op } = require("sequelize");

const createBlogDao = async (blogData) => {
  const { dataValues } = await blogModel.create(blogData);
  await addBlogToTypeDao(blogData.categoryId);
  return dataValues;
};

const updateBlogDao = async (blogData) => {
  return await blogModel.update(blogData, {
    where: {
      id: blogData.id,
    },
  });
};

const findOneBlogDao = async (id) => {
  return await blogModel.findOne({
    where: {
      id: id,
    },
  });
};

const deleteBlogDao = async (blogData) => {
  return await blogModel.destroy({
    where: {
      id: blogData.id,
    },
  });
};

const getBlogListDao = async (blogData) => {
  return await blogModel.findAndCountAll({
    where: {
      title: {
        [Op.like]: `%${blogData.title}%`,
      },
    },
  });
};

module.exports = {
  createBlogDao,
  updateBlogDao,
  findOneBlogDao,
  deleteBlogDao,
  getBlogListDao,
};
