const express = require("express");
const router = express.Router();
const {
  createBlogService,
  updateBlogService,
  getDetailBlogService,
  deleteBlogService,
  getBlogListService,
} = require("../service/blogService");
const { formatResponse } = require("../utils/tool");

router.get("/list", async function (req, res, next) {
  const result = await getBlogListService(req.body);
  res.json(formatResponse(200, "获取博客列表成功", result));
});

router.get("/detail", async function (req, res, next) {
  const result = await getDetailBlogService(req.body);
  res.json(formatResponse(200, "获取博客详情成功", result));
});

router.post("/create", async function (req, res, next) {
  const result = await createBlogService(req.body);
  res.json(formatResponse(200, "创建博客成功", result));
});

router.put("/update", async function (req, res, next) {
  const result = await updateBlogService(req.body);
  res.json(formatResponse(200, "更新博客成功", result));
});

router.delete("/delete", async function (req, res, next) {
  const result = await deleteBlogService(req.body);
  res.json(formatResponse(200, "删除博客成功", result));
});

module.exports = router;
