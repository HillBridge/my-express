const multer = require("multer");
const { formatResponse, upload } = require("../utils/tool");

const uploadService = async (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // 发生错误
      if (err.code === "LIMIT_FILE_SIZE") {
        res.json(formatResponse(400, "文件大小超过5MB", null));
      } else if (err.code === "LIMIT_FILE_COUNT") {
        res.json(formatResponse(400, "文件数量超过1个", null));
      } else {
        res.json(formatResponse(400, "上传失败", null));
      }
    } else {
      res.json(formatResponse(200, "上传成功", req.file.path));
    }
  });
};

module.exports = {
  uploadService,
};
