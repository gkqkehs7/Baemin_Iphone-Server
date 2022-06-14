const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Review extends Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        star: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        modelName: "Review",
        tableName: "Reviews",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Review.belongsTo(db.User);
    db.Review.belongsTo(db.Store);
    db.Review.hasMany(db.ReviewImage);
  }
};
