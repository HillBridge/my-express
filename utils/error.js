class ServiceError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }

  toResponseJson() {
    return {
      code: this.code,
      message: this.message,
    };
  }
}

// 文件上传错误
class UploadError extends ServiceError {
  constructor(message) {
    super(message, 413);
  }
}

// 禁止访问错误
class ForbiddenError extends ServiceError {
  constructor(message) {
    super(message, 403);
  }
}

// 无资源错误
class NotFoundError extends ServiceError {
  constructor() {
    super("not found", 404);
  }
}

// 验证信息错误
class ValidationError extends ServiceError {
  constructor(message) {
    super(message, 406);
  }
}

// 未知错误
class UnknownError extends ServiceError {
  constructor() {
    super("server error", 500);
  }
}

module.exports = {
  UploadError,
  ForbiddenError,
  NotFoundError,
  ValidationError,
  UnknownError,
  ServiceError,
};
