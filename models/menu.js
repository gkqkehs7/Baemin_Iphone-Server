const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Menu extends Model {
  static init(sequelize) {
    return super.init(
      {
        menuName: {
          type: DataTypes.STRING(30),
          allowNull: false,
          unique: true,
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        menuImg: {
          type: DataTypes.STRING(200), //글자무제한
        },
        explanation: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        orderNum: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        modelName: "Menu",
        tableName: "Menues",
        paranoid: true,
        charset: "utf8",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Menu.belongsTo(db.Store);

    db.Menu.belongsToMany(db.User, {
      through: "history",
      as: "orderedHistory",
    });
  }
};
