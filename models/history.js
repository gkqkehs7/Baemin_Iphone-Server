const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class History extends Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        storeId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        menuIds: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        totalPrice: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        modelName: "History",
        tableName: "Historys",
        paranoid: true,
        charset: "utf8",
        sequelize,
      }
    );
  }
  static associate(db) {}
};
