const formatResponse = (code, msg, data) => {
  return {
    code,
    msg,
    data,
  };
};

module.exports = { formatResponse };
