const { DataTypes } = require("sequelize");
const sequelize = require("../dbConnect");

module.exports = sequelize.define(
  "Blog",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    toc: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    htmlContent: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    thumb: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    scanNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    commentNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
  }
);
