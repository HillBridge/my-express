const express = require("express");
const router = express.Router();
const { adminService } = require("../service/adminService");
const { formatResponse, analysisToken } = require("../utils/tool");

router.post("/login", async function (req, res, next) {
  const loginInfo = req.body;
  const result = await adminService(loginInfo);
  if (result?.token) {
    res.setHeader("authorization", result.token);
    res.json(formatResponse(200, "登录成功", result.data));
  } else {
    res.json(formatResponse(500, "登录失败", result.data));
  }
});

router.get("/userInfo", async function (req, res, next) {
  const token = analysisToken(req.get("authorization"));
  const result = {
    loginId: token.loginId,
    name: token.name,
  };
  res.json(formatResponse(200, "获取用户信息成功", result));
});

module.exports = router;
