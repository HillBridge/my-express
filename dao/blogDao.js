const blogModel = require("./model/blogModel");
const { addBlogToTypeDao } = require("./blogTypeDao");

const createBlogDao = async (blogData) => {
  const { dataValues } = await blogModel.create(blogData);
  await addBlogToTypeDao(blogData.categoryId);
  return dataValues;
};

module.exports = {
  createBlogDao,
};
