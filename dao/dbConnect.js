const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("express-site", "root", "abai1234", {
  host: "localhost",
  dialect: "mysql",
});

async function bootstrap() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

bootstrap();
