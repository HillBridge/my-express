const {
  createBlogDao,
  updateBlogDao,
  findOneBlogDao,
  deleteBlogDao,
  getBlogListDao,
} = require("../dao/blogDao");
const validate = require("validate.js");
const { ValidationError } = require("../utils/error");
const blogTypeModel = require("../dao/model/blogTypeModel");

validate.validators.categoryIdIsExist = async (value) => {
  const data = await blogTypeModel.findByPk(value);
  if (!data) {
    return "分类不存在";
  }
};

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
    categoryIdIsExist: true,
  },
  thumb: {
    presence: {
      message: "封面不能为空",
    },
    type: "string",
  },
  scanNumber: {
    presence: {
      allowEmpty: false,
    },
  },
  commentNumber: {
    presence: {
      allowEmpty: false,
    },
  },
};

const getBlogListService = async (blogData) => {
  const { count, rows } = await getBlogListDao(blogData);
  return {
    count,
    rows,
  };
};

const getDetailBlogService = async (blogData) => {
  const { dataValues } = await findOneBlogDao(blogData.id);
  if (!dataValues) {
    throw new ValidationError("博客不存在");
  }
  return dataValues;
};
const createBlogService = async (blogData) => {
  blogData.toc = '["a":"b"]';
  blogData.scanNumber = 0;
  blogData.commentNumber = 0;

  try {
    await validate.async(blogData, blogRules, { format: "flat" });
    return await createBlogDao(blogData);
  } catch (e) {
    const error = e.filter((item) => item !== true);
    throw new ValidationError(error[0]);
  }
};

const updateBlogService = async (blogData) => {
  const { dataValues } = await findOneBlogDao(blogData.id);
  if (!dataValues) {
    throw new ValidationError("博客不存在");
  }
  blogData.toc = '["a":"b"]';
  blogData.scanNumber = ++dataValues.scanNumber;
  blogData.commentNumber = ++dataValues.commentNumber;
  try {
    await validate.async(blogData, blogRules, { format: "flat" });
    return await updateBlogDao(blogData);
  } catch (e) {
    const error = e.filter((item) => item !== true);
    throw new ValidationError(error[0]);
  }
};

const deleteBlogService = async (blogData) => {
  const { dataValues } = await findOneBlogDao(blogData.id);
  if (!dataValues) {
    throw new ValidationError("博客不存在");
  }
  return await deleteBlogDao(blogData);
};

module.exports = {
  createBlogService,
  updateBlogService,
  getDetailBlogService,
  deleteBlogService,
  getBlogListService,
};
