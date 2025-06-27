const express = require("express");
const router = express.Router();
const { formatResponse } = require("../utils/tool");
const {
  getBannerService,
  updateBannerService,
} = require("../service/bannerService");

router.get("/banner", async function (req, res, next) {
  const result = await getBannerService();
  res.json(formatResponse(200, "获取banner成功", result));
});

router.put("/banner", async function (req, res, next) {
  const result = await updateBannerService(req.body);
  res.json(formatResponse(200, "更新banner成功"), result);
});

module.exports = router;
