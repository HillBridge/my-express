const express = require("express");
const router = express.Router();
const { uploadService } = require("../service/uploadService");

router.post("/", async function (req, res, next) {
  await uploadService(req, res, next);
});

module.exports = router;
