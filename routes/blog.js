const express = require("express");
const router = express.Router();
const { createBlogService } = require("../service/blogService");
const { formatResponse } = require("../utils/tool");

router.get("/getAll", async function (req, res, next) {});

router.get("/getDetail", async function (req, res, next) {});

router.post("/create", async function (req, res, next) {
  const result = await createBlogService(req.body);
  res.json(formatResponse(200, "创建博客成功", result));
});

router.put("/update", async function (req, res, next) {});

router.delete("/delete", async function (req, res, next) {});

module.exports = router;
