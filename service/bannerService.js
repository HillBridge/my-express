const {
  bannerDao,
  createBannerDao,
  updateBannerDao,
  deleteBannerDao,
} = require("../dao/bannerDao");

const getBannerService = async () => {
  const result = await bannerDao();
  const dataArr = [];
  for (const item of result) {
    dataArr.push(item.dataValues);
  }
  return dataArr;
};

const createBannerService = async (bannerData) => {
  return await createBannerDao(bannerData);
};

const updateBannerService = async (bannerData) => {
  return await updateBannerDao(bannerData);
};

const deleteBannerService = async (bannerData) => {
  return await deleteBannerDao(bannerData);
};

module.exports = {
  getBannerService,
  updateBannerService,
  deleteBannerService,
  createBannerService,
};
