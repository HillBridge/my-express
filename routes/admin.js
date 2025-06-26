const express = require("express");
const router = express.Router();
const {
  loginService,
  updateUserService,
  getCaptchaService,
} = require("../service/adminService");
const { formatResponse, analysisToken } = require("../utils/tool");

router.post("/login", async function (req, res, next) {
  const captcha = req.body.captcha?.toLowerCase();
  const sessionCaptcha = req.session.captcha?.toLowerCase();
  if (captcha !== sessionCaptcha) {
    res.json(formatResponse(500, "验证码错误"));
    return;
  }
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

router.get("/captcha", async function (req, res, next) {
  const result = await getCaptchaService();

  // 应该与uid绑定吧
  req.session.captcha = result.text;

  res.type("svg");
  res.send(result.data);
});

module.exports = router;
