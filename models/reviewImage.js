const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class ReviewImage extends Model {
  static init(sequelize) {
    return super.init(
      {
        src: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
      },
      {
        modelName: "ReviewImage",
        tableName: "ReviewImages",
        paranoid: true,
        charset: "utf8",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.ReviewImage.belongsTo(db.Review);
  }
};
