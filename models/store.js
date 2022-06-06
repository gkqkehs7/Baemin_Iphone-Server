const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Store extends Model {
  static init(sequelize) {
    return super.init(
      {
        storeName: {
          type: DataTypes.STRING(30),
          allowNull: false,
          unique: true,
        },
        storeImg: {
          type: DataTypes.STRING(200), //글자무제한
          allowNull: false,
        },
        PriceToOrder: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        orderTime: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        orderTip: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
      },
      {
        modelName: "Store",
        tableName: "Stores",
        paranoid: true,
        charset: "utf8",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Store.hasMany(db.Menu);
    db.Store.hasMany(db.Review);

    db.Store.belongsToMany(db.User, { through: "Follow", as: "followers" }); //유저는 여러 가게를 찜할 수 있고, 가게는 여러 회원에게 찜당할수잇음
  }
};
