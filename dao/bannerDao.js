const bannerModel = require("./model/bannerModel");

const bannerDao = async () => {
  return await bannerModel.findAll();
};

const updateBannerDao = async (bannerData) => {
  return await bannerModel.update(bannerData, {
    where: {
      id: bannerData.id,
    },
  });
};

module.exports = { bannerDao, updateBannerDao };
