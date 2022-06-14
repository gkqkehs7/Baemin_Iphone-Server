const Sequelize = require("sequelize");
const user = require("./user");
const menu = require("./menu");
const store = require("./store");
const review = require("./review");
const history = require("./history");
const reviewImage = require("./reviewImage");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];

const db = {};
db.User = user;
db.Store = store;
db.Menu = menu;
db.Review = review;
db.History = history;
db.ReviewImage = reviewImage;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

Object.keys(db).forEach((modelName) => {
  console.log(modelName);
  db[modelName].init(sequelize);
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
