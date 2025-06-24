var express = require("express");
var router = express.Router();
const { adminService } = require("../service/adminService");
const { formatResponse } = require("../utils/tool");

router.post("/login", async function (req, res, next) {
  const loginInfo = req.body;
  const result = await adminService(loginInfo);
  if (result?.token) {
    res.setHeader("token", result.token);
    res.json(formatResponse(200, "登录成功", result.data));
  } else {
    res.json(formatResponse(500, "登录失败", result.data));
  }
});

module.exports = router;
