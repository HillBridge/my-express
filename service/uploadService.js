const multer = require("multer");
const { formatResponse, upload } = require("../utils/tool");
const { UploadError } = require("../utils/error");

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
      res.json(formatResponse(200, "上传成功", req.file.path));
    }
  });
};

module.exports = {
  uploadService,
};
