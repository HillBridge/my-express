var express = require("express");
var router = express.Router();
const { adminService } = require("../service/adminService");

router.post("/login", async function (req, res, next) {
  const loginInfo = req.body;
  const result = await adminService(loginInfo);
  console.log("result", result);
});

module.exports = router;
