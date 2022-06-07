const express = require("express");

const Sequelize = require("sequelize");
const User = require("../models/user");
const Menu = require("../models/menu");
const Review = require("../models/review");
const Store = require("../models/store");

var router = express.Router();
const { verifyToken } = require("./middleware");

router.get("/getCategory/:categoryId", async (req, res, next) => {
  try {
    const exCategory = await Store.findAll({
      where: { category: parseInt(req.params.categoryId, 10) },
    });

    if (!exCategory) {
      return res.status(403).send("존재하지 않는 카테고리입니다");
    }

    return res.status(200).send(exCategory);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/getStore/:storeId", verifyToken, async (req, res, next) => {
  try {
    const exStore = await Store.findOne({
      where: { id: parseInt(req.params.storeId, 10) },
    });

    if (!exStore) {
      return res.status(403).send("존재하지 않는 가게입니다");
    }

    const exMenu = await exStore.getMenus();

    return res.status(200).send({ store: exStore, menu: exMenu });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
