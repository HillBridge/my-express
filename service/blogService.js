const { createBlogDao } = require("../dao/blogDao");
const { validate } = require("validate.js");
const { ValidationError } = require("../utils/error");
const { addBlogToTypeDao } = require("../dao/blogTypeDao");

const blogRules = {
  title: {
    presence: {
      message: "标题不能为空",
    },
    type: "string",
  },
  description: {
    presence: {
      message: "描述不能为空",
    },
    type: "string",
  },
  toc: {
    presence: {
      message: "目录不能为空",
    },
    type: "string",
  },
  htmlContent: {
    presence: {
      message: "内容不能为空",
    },
    type: "string",
  },
  categoryId: {
    presence: {
      message: "分类不能为空",
    },
    type: "number",
  },
  thumb: {
    presence: {
      message: "封面不能为空",
    },
    type: "string",
  },
  scanNumber: {
    presence: {
      allowEmpty: true,
    },
  },
  commentNumber: {
    presence: {
      allowEmpty: true,
    },
  },
};

const createBlogService = async (blogData) => {
  blogData.toc = '["a":"b"]';
  blogData.scanNumber = 0;
  blogData.commentNumber = 0;

  try {
    const result = await validate.async(blogData, blogRules);
    return await createBlogDao(blogData);
  } catch (e) {
    throw new ValidationError(Object.values(e)[0]);
  }
};

module.exports = {
  createBlogService,
};
