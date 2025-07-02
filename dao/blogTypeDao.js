const blogTypeModel = require("./model/blogTypeModel");

const addBlogToTypeDao = async (id) => {
  const data = await blogTypeModel.findByPk(id);
  data.articleCount++;
  await data.save();
};

module.exports = {
  addBlogToTypeDao,
};
