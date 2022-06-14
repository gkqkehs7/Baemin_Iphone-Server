const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");

const User = require("../models/user");
const Menu = require("../models/menu");
const Review = require("../models/review");
const Store = require("../models/store");
const History = require("../models/history");
const jwt = require("jsonwebtoken");

var router = express.Router();

const { verifyToken } = require("./middleware");

router.post("/login", async (req, res, next) => {
  passport.authenticate("signin", (err, user, info) => {
    if (err) {
      //서버 에러인 경우 next에게 넘김

      console.error(err);
      return next(err);
    }
    if (info) {
      //client에러인 경우 이유를 보내줌
      return res.status(401).json({ message: info.reason });
    }

    return req.login(user, { session: false }, async (loginError) => {
      //모두 통과했다면 passport에서 마지막 로그인
      //passport에서 로그인 에러발생했을 시 next에게 위임

      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      //req.login은 index.js의 serializeuser실행
      //이떄부터 req.user에 유저 정보가 담긴다

      const refreshToken = jwt.sign(
        {
          sub: "refresh",
          email: user.email,
        },
        "jwt-secret-key",
        { expiresIn: "24h" }
      );
      const accessToken = jwt.sign(
        { sub: "access", email: user.email },
        "jwt-secret-key",
        {
          expiresIn: "5m",
        }
      );
      return res.status(200).send({
        email: user.email,
        nickname: user.nickname,
        refreshToken,
        accessToken,
      });
    });
  })(req, res, next);
});

router.post("/refreshToken", async (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    try {
      if (err) {
        console.error(err);
        return next(err);
      }
      if (info) {
        if (info?.name === "TokenExpiredError") {
          //refresh토큰 마저 만료
          return res.status(419).send({ error: info.name });
        }
        if (info?.name === "JsonWebTokenError") {
          //refresh토큰 잘못됨
          return res.status(419).send({ error: info.name });
        }
      }
      //토큰 재발급
      const refreshToken = jwt.sign(
        {
          sub: "refresh",
          email: user.email,
        },
        "jwt-secret-key",
        { expiresIn: "24h" }
      );
      const accessToken = jwt.sign(
        { sub: "access", email: user.email },
        "jwt-secret-key",
        {
          expiresIn: "5m",
        }
      );
      return res.status(200).send({
        email: user.email,
        nickname: user.nickname,
        refreshToken,
        accessToken,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  })(req, res, next);
});

router.post("/signUp", async (req, res, next) => {
  try {
    console.log(req.body);
    const exUser = await User.findOne({
      where: { email: req.body.email },
    });

    if (exUser)
      return res.status(401).json({ message: "이미 가입한 회원입니다" });

    const exNickname = await User.findOne({
      where: { nickname: req.body.name },
    });

    if (exNickname)
      return res.status(401).json({ message: "이미 사용중인 닉네입니다" });

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    await User.create({
      email: req.body.email,
      password: hashedPassword,
      nickname: req.body.name,
    });

    return res.status(200).send("회원가입 성공");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/followStore", verifyToken, async (req, res, next) => {
  const exStore = await Store.findOne({
    where: { id: req.body.storeId },
  });

  if (!exStore) {
    return res.status(401).json({ message: "존재하지 않는 가게입니다" });
  }
  await exStore.addFollowers(req.user.id);
  res.status(200).send({ success: true });
});

router.post("/unfollowStore", verifyToken, async (req, res, next) => {
  const exStore = await Store.findOne({
    where: { id: req.body.storeId },
  });

  if (!exStore) {
    return res.status(401).json({ message: "존재하지 않는 가게입니다" });
  }
  await exStore.removeFollowers(req.user.id);
  res.status(200).send({ success: true });
});

router.post("/pay", verifyToken, async (req, res, next) => {
  console.log(req.body);
  const exStore = await Store.findOne({
    where: { id: req.body.storeId },
  });

  if (!exStore) {
    return res.status(401).json({ message: "존재하지 않는 가게입니다" });
  }

  await History.create({
    userId: req.user.id,
    storeId: req.body.storeId,
    totalPrice: req.body.totalPrice,
    menuIds: req.body.menuIds,
  });

  return res.status(200).send({ success: true });
});

router.post("/getHistories", verifyToken, async (req, res, next) => {
  const exHistories = await History.findAll({ userId: req.user.id });

  async function getHistories() {
    try {
      let datas = [];
      for (const exHistory of exHistories) {
        storeData = await Store.findOne({ id: exHistory.storeId });
        repMenu = await Menu.findOne({ id: exHistory.menuIds.split(",")[0] });
        menuIds = exHistory.menuIds;
        datas.push({
          historyId: exHistory.id,
          storeId: storeData.id,
          storeName: storeData.storeName,
          storeImg: storeData.storeImg,
          repMenuName: repMenu.menuName,
          menuIds: menuIds,
          totalPrice: exHistory.totalPrice,
          time: exHistory.createdAt,
        });
      }

      return datas;
    } catch (error) {
      console.error(error);
    }
  }

  getHistories().then((response) => {
    console.log("here");
    return res.status(200).send(response);
  });
});

router.post("/getHistory", verifyToken, async (req, res, next) => {
  const exHistory = await History.findOne({
    id: req.body.historyId,
    userId: req.user.id,
  });
  const exStore = await Store.findOne({
    where: { id: exHistory.storeId },
  });
  console.log(exHistory.menuIds.split(","));

  menuIds = exHistory.menuIds.split(",");

  async function getMenus(menuIds) {
    try {
      let datas = [];
      for (const menuId of menuIds) {
        const test = await Menu.findOne({
          where: { id: parseInt(menuId, 10), storeId: exStore.id },
        });
        datas.push(test);
      }
      return datas;
    } catch (error) {
      return error;
    }
  }
  getMenus(menuIds).then((data) => {
    return res.status(200).send({
      store: exStore,
      totalPrice: exHistory.totalPrice,
      menuData: data,
    });
  });
});
module.exports = router;
