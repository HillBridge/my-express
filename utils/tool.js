const jwt = require("jsonwebtoken");
const md5 = require("md5");
const multer = require("multer");
const path = require("path");

const formatResponse = (code, msg, data) => {
  return {
    code,
    msg,
    data,
  };
};

const analysisToken = (token) => {
  return jwt.verify(token.split(" ")[1], md5(process.env.JWT_SECRET));
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    const newName =
      path.basename(file.originalname, path.extname(file.originalname)) +
      Date.now() +
      path.extname(file.originalname);
    cb(null, newName);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
}).single("file");

module.exports = { formatResponse, analysisToken, upload };
