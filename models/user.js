const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        nickname: {
          type: DataTypes.STRING(30),
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(30),
          allowNull: false,
          unique: true,
        },
      },
      {
        modelName: "User",
        tableName: "Users",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.User.belongsToMany(db.Store, { through: "Follow", as: "followings" });

    db.User.belongsToMany(db.Menu, { through: "history", as: "orderHistory" });
    db.User.hasMany(db.Review);
  }
};
