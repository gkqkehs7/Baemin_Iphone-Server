"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        id: 1,
        nickname: "관리자",
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
        foodImg: "reviewFoodImg1.png",
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
        foodImg: "reviewFoodImg2.png",
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

    await queryInterface.bulkInsert("history", [
      {
        id: 1,
        UserId: 1,
        MenuId: 1,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users");
    await queryInterface.bulkDelete("Stores");
    await queryInterface.bulkDelete("Menues");
    await queryInterface.bulkDelete("Reviews");
    await queryInterface.bulkDelete("history");
  },
};
