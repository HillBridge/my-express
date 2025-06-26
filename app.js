const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { expressjwt: jwt } = require("express-jwt");
const md5 = require("md5");
const session = require("express-session");
const { ForbiddenError, ServiceError } = require("./utils/error");

// 加载环境变量
require("dotenv").config();
// 使用express-async-errors中间件
require("express-async-errors");

// 连接数据库
require("./dao/db");

// 加载路由页面
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
// 加载路由API
const adminRouter = require("./routes/admin");

// 创建express实例
const app = express();

// 使用express-session中间件
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 30 },
  })
);

// 使用jwt中间件
app.use(
  jwt({
    secret: md5(process.env.JWT_SECRET),
    algorithms: ["HS256"],
  }).unless({ path: ["/api/admin/login", "/api/admin/captcha"] })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// 中间件
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 使用路由
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/admin", adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.json(new ForbiddenError("token无效或者已过期").toResponseJson());
  } else if (err instanceof ServiceError) {
    res.json(err.toResponseJson());
  } else {
    next(err);
  }
});

module.exports = app;
