const multer = require("multer");
const path = require("path");
const { formatResponse } = require("../utils/tool");
const { UploadError } = require("../utils/error");

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

const uploadService = async (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // 发生错误
      if (err.code === "LIMIT_FILE_SIZE") {
        next(new UploadError("文件大小超过5MB"));
      } else if (err.code === "LIMIT_FILE_COUNT") {
        next(new UploadError("文件数量超过1个"));
      } else {
        next(new UploadError("上传失败"));
      }
    } else {
      res.json(formatResponse(200, "上传成功"));
    }
  });
};

module.exports = {
  uploadService,
};
