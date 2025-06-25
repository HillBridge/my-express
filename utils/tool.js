const jwt = require("jsonwebtoken");
const md5 = require("md5");

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

module.exports = { formatResponse, analysisToken };
