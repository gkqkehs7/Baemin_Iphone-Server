"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("1234", 12);
    await queryInterface.bulkInsert("Users", [
      {
        id: 1,
        email: "gkqkehs10@naver.com",
        password: hashedPassword,
        nickname: "minu",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("Users", [
      {
        id: 2,
        email: "gkqkehs11@naver.com",
        password: hashedPassword,
        nickname: "minu2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("Stores", [
      {
        id: 1,
        storeName: "bbq",
        storeImg: "bbq.png",
        PriceToOrder: 10000,
        orderTime: "50~60분",
        orderTip: "3000원",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("Stores", [
      {
        id: 2,
        storeName: "bhc",
        storeImg: "bhc.png",
        PriceToOrder: 10000,
        orderTime: "50~60분",
        orderTip: "3000원",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("Reviews", [
      {
        id: 1,
        UserId: 1,
        StoreId: 1,
        content: "리뷰 예시입니다",
        star: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("Reviews", [
      {
        id: 2,
        UserId: 1,
        StoreId: 1,
        content: "리뷰 예시입니다",
        star: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("Menues", [
      {
        id: 1,
        menuName: "예시메뉴1",
        price: 12000,
        menuImg: "menuImg1.png",
        explanation: "메뉴 설명입니다.",
        orderNum: 2,
        StoreId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("Menues", [
      {
        id: 2,
        menuName: "예시메뉴2",
        price: 5000,
        menuImg: "menuImg2.png",
        explanation: "메뉴 설명입니다.",
        orderNum: 1,
        StoreId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users");
    await queryInterface.bulkDelete("Stores");
    await queryInterface.bulkDelete("Menues");
    await queryInterface.bulkDelete("Reviews");
    await queryInterface.bulkDelete("Historys");
  },
};
