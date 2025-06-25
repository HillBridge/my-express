const express = require("express");
const router = express.Router();
const { loginService, updateUserService } = require("../service/adminService");
const { formatResponse, analysisToken } = require("../utils/tool");

router.post("/login", async function (req, res, next) {
  const loginInfo = req.body;
  const result = await loginService(loginInfo);
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

router.put("/userInfo", async function (req, res, next) {
  const result = await updateUserService(req.body);
  if (result) {
    res.json(formatResponse(200, "更新用户信息成功", result));
  } else {
    res.json(formatResponse(500, "更新用户信息失败", result));
  }
});

module.exports = router;
