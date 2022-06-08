const express = require("express");

const Sequelize = require("sequelize");
const User = require("../models/user");
const Menu = require("../models/menu");
const Review = require("../models/review");
const Store = require("../models/store");

var router = express.Router();
const { verifyToken } = require("./middleware");

router.get("/getStores", async (req, res, next) => {
  try {
    const exStore = await Store.findAll();

    if (!exStore) {
      return res.status(403).send("존재하지 않는 카테고리입니다");
    }

    return res.status(200).send(exStore);
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

    const exUser = await User.findOne({
      where: { id: req.user.id },
    });

    const isFollow = await exUser.getFollowings({
      where: { id: exStore.id },
    });

    console.log(isFollow.length);

    if (isFollow.length === 0) {
      return res
        .status(200)
        .send({ store: exStore, menu: exMenu, isFollow: false });
    }
    return res
      .status(200)
      .send({ store: exStore, menu: exMenu, isFollow: true });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
