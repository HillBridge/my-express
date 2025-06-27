const bannerModel = require("./model/bannerModel");

const bannerDao = async () => {
  return await bannerModel.findAll();
};

const createBannerDao = async (bannerData) => {
  return await bannerModel.create(bannerData);
};

const updateBannerDao = async (bannerData) => {
  return await bannerModel.update(bannerData, {
    where: {
      id: bannerData.id,
    },
  });
};

const deleteBannerDao = async (bannerData) => {
  return await bannerModel.destroy({
    where: {
      id: bannerData.id,
    },
  });
};

module.exports = {
  bannerDao,
  createBannerDao,
  updateBannerDao,
  deleteBannerDao,
};
