const md5 = require("md5");
const { bannerDao, updateBannerDao } = require("../dao/bannerDao");

const getBannerService = async () => {
  const result = await bannerDao();
  const dataArr = [];
  for (const item of result) {
    dataArr.push(item.dataValues);
  }
  return dataArr;
};

const updateBannerService = async (bannerData) => {
  return await updateBannerDao(bannerData);
};

module.exports = { getBannerService, updateBannerService };
