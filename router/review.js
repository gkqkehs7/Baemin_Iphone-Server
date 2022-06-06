const express = require("express");

const User = require("../models/user");
const Menu = require("../models/menu");
const Review = require("../models/review");
const Store = require("../models/store");

var router = express.Router();

router.get("/getReview/:storeId", async (req, res, next) => {
  try {
    const exStore = await Store.findOne({
      where: { id: parseInt(req.params.storeId, 10) },
    });

    if (!exStore) {
      return res.status(403).send("존재하지 않는 가게입니다");
    }

    const exReviewes = await exStore.getReviews();

    if (!exReviewes) {
      return res.status(403).send("존재하지 않는 리뷰입니다");
    }

    return res.status(200).send(exReviewes);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
